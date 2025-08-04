-- H2 Schema for Event Management System

CREATE TABLE events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    status VARCHAR(20) NOT NULL CHECK (status IN ('STARTED', 'COMPLETED', 'PAUSED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices (sem IF NOT EXISTS, pois H2 não suporta)
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_status ON events(status);

-- Trigger para atualizar o campo updated_at antes de UPDATE

-- CREATE TRIGGER update_events_updated_at
-- BEFORE UPDATE ON events
-- FOR EACH ROW
-- CALL "org.h2.api.TriggerAdapter";

-- Implementação da trigger em Java

-- Você precisa criar uma classe Java que estenda org.h2.api.Trigger
-- com o método fire(...) atualizando o campo 'updated_at'.

-- Alternativamente, se estiver usando H2 embutido com JPA ou frameworks,
-- atualize o campo updated_at na aplicação ou via uma query "ON UPDATE"

-- Exemplo em SQL (H2 não suporta diretamente funções SQL customizadas como o PostgreSQL)
-- Então você pode usar um approach alternativo se estiver testando interativamente:
-- Use triggers em linguagem Java ou lógica integrada na aplicação.
