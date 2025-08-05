package com.eventmanagement.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class EventResponse {
    
    private Long id;
    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private BigDecimal price;
    private String status;
    
    // Default constructor
    public EventResponse() {}
    
    // Constructor with all fields
    public EventResponse(Long id, String title, LocalDateTime startDate, LocalDateTime endDate, BigDecimal price, String status) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.status = status;
    }
    
    // Static factory method from Event entity
    public static EventResponse fromEvent(com.eventmanagement.model.Event event) {
        return new EventResponse(
            event.getId(),
            event.getTitle(),
            event.getStartDate(),
            event.getEndDate(),
            event.getPrice(),
            event.getStatus().name()
        );
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public LocalDateTime getStartDate() {
        return startDate;
    }
    
    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }
    
    public LocalDateTime getEndDate() {
        return endDate;
    }
    
    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
} 