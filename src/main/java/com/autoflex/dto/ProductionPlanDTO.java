package com.autoflex.dto;

public class ProductionPlanDTO {
    public String productName;
    public Integer quantity; 
    public Double totalValue;

    public ProductionPlanDTO(String productName, Integer quantity, Double totalValue) {
        this.productName = productName;
        this.quantity = quantity;
        this.totalValue = totalValue;
    }
}