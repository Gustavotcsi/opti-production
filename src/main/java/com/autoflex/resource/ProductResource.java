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
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @Inject
    ProductionService productionService;

    @GET
    public List<Product> list() {
        return Product.listAll();
    }

    @POST
    @Transactional
    public Response create(Product product) {
        if (product.composition != null) {
            product.composition.forEach(comp -> comp.product = product);
        }
        product.persist();
        return Response.status(Response.Status.CREATED).entity(product).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        Product.deleteById(id);
    }

    // Endpoint do cálculo de produção
    @GET
    @Path("/planning")
    public List<ProductionPlanDTO> getProductionPlan() {
        return productionService.calculateProduction();
    }
}