package com.autoflex.resource;

import java.util.List;

import com.autoflex.model.RawMaterial;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialResource {

    @GET
    public List<RawMaterial> list() {
        return RawMaterial.listAll();
    }

    // NOVO: Método necessário para o formulário de edição carregar os dados
    @GET
    @Path("/{id}")
    public RawMaterial get(@PathParam("id") Long id) {
        RawMaterial entity = RawMaterial.findById(id);
        if (entity == null) {
            throw new WebApplicationException("Material with id " + id + " does not exist.", 404);
        }
        return entity;
    }

    @POST
    @Transactional
    public Response create(RawMaterial material) {
        material.persist();
        return Response.status(Response.Status.CREATED).entity(material).build();
    }
    
    @PUT
    @Path("/{id}")
    @Transactional
    public RawMaterial update(@PathParam("id") Long id, RawMaterial material) {
        RawMaterial entity = RawMaterial.findById(id);
        if(entity == null) {
            throw new NotFoundException();
        }
        entity.name = material.name;
        entity.stockQuantity = material.stockQuantity;
        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        boolean deleted = RawMaterial.deleteById(id);
        if (!deleted) {
            throw new WebApplicationException("Material with id " + id + " does not exist.", 404);
        }
    }
}