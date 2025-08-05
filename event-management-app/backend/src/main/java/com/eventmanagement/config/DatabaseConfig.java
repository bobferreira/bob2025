package com.eventmanagement.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(basePackages = "com.eventmanagement.repository")
@EnableTransactionManagement
public class DatabaseConfig {
    
    // This configuration enables JPA repositories and transaction management
    // The actual database configuration is handled by application properties
    // based on the active profile (dev, prod, docker)
} 