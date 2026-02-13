package com.autoflex.resource;

import java.util.List;

import com.autoflex.dto.ProductionPlanDTO;
import com.autoflex.model.Product;
import com.autoflex.service.ProductionService;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @Inject
    ProductionService productionService;

    // Listar todos
    @GET
    public List<Product> list() {
        return Product.listAll();
    }

    // NOVO: Buscar apenas um produto (Para o formulário de edição)
    @GET
    @Path("/{id}")
    public Product get(@PathParam("id") Long id) {
        Product product = Product.findById(id);
        if (product == null) {
            throw new WebApplicationException("Product with id of " + id + " does not exist.", 404);
        }
        return product;
    }

    // Criar novo
    @POST
    @Transactional
    public Response create(Product product) {
        if (product.composition != null) {
            product.composition.forEach(comp -> comp.product = product);
        }
        product.persist();
        return Response.status(Response.Status.CREATED).entity(product).build();
    }

    // NOVO: Atualizar produto existente (Para salvar a edição)
    @PUT
    @Path("/{id}")
    @Transactional
    public Product update(@PathParam("id") Long id, Product product) {
        Product entity = Product.findById(id);
        if(entity == null) {
            throw new WebApplicationException("Product with id of " + id + " does not exist.", 404);
        }
        
        // Atualiza os campos
        entity.name = product.name;
        entity.sellingPrice = product.sellingPrice;
        
        return entity;
    }

    // Deletar
    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        boolean deleted = Product.deleteById(id);
        if (!deleted) {
             throw new WebApplicationException("Product with id of " + id + " does not exist.", 404);
        }
    }

    // Endpoint do cálculo de produção
    @GET
    @Path("/planning")
    public List<ProductionPlanDTO> getProductionPlan() {
        return productionService.calculateProduction();
    }
}