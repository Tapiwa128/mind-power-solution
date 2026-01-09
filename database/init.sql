-- Mind Power Car Rental Database Schema
-- PostgreSQL Database Initialization Script

-- Create database (run this manually)
-- CREATE DATABASE car_rental_db;

-- Connect to the database
-- \c car_rental_db;

-- Income table
CREATE TABLE IF NOT EXISTS income (
    id BIGSERIAL PRIMARY KEY,
    date DATE NOT NULL,
    vehicle VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    plate VARCHAR(50) NOT NULL UNIQUE,
    mileage BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
    id BIGSERIAL PRIMARY KEY,
    month DATE NOT NULL UNIQUE,
    fuel DECIMAL(10, 2) NOT NULL DEFAULT 0,
    service DECIMAL(10, 2) NOT NULL DEFAULT 0,
    insurance DECIMAL(10, 2) NOT NULL DEFAULT 0,
    tolls DECIMAL(10, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_income_date ON income(date);
CREATE INDEX IF NOT EXISTS idx_income_vehicle ON income(vehicle);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_expenses_month ON expenses(month);

-- Sample data (optional)
-- INSERT INTO vehicles (name, plate, mileage, status) VALUES
-- ('SUV-01', 'ABC-123', 50000, 'ACTIVE'),
-- ('SUV-02', 'DEF-456', 45000, 'ACTIVE');
