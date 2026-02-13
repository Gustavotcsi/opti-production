package com.autoflex.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.autoflex.dto.ProductionPlanDTO;
import com.autoflex.model.Product;
import com.autoflex.model.ProductComposition;
import com.autoflex.model.RawMaterial;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class ProductionService {

    @Transactional 
    public List<ProductionPlanDTO> calculateProduction() {
        
        List<Product> allProducts = Product.listAll();
        
       
        Map<Long, Integer> virtualStock = RawMaterial.<RawMaterial>listAll().stream()
                .collect(Collectors.toMap(r -> r.id, r -> r.stockQuantity));

      
        allProducts.sort((p1, p2) -> p2.sellingPrice.compareTo(p1.sellingPrice));

        List<ProductionPlanDTO> plan = new ArrayList<>();

        for (Product product : allProducts) {
            if (product.composition.isEmpty()) continue;

            int maxProducible = Integer.MAX_VALUE;

           
            for (ProductComposition comp : product.composition) {
                Integer currentStock = virtualStock.getOrDefault(comp.rawMaterial.id, 0);
                if (comp.requiredQuantity > 0) {
                    int possible = currentStock / comp.requiredQuantity;
                    maxProducible = Math.min(maxProducible, possible);
                } else {
                     maxProducible = 0;
                }
            }

           
            if (maxProducible > 0 && maxProducible != Integer.MAX_VALUE) {
                double totalValue = maxProducible * product.sellingPrice;
                plan.add(new ProductionPlanDTO(product.name, maxProducible, totalValue));

                for (ProductComposition comp : product.composition) {
                    Long matId = comp.rawMaterial.id;
                    int consumed = maxProducible * comp.requiredQuantity;
                    virtualStock.put(matId, virtualStock.get(matId) - consumed);
                }
            }
        }
        return plan;
    }
}