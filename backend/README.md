# Mind Power Car Rental Backend

Spring Boot backend application for the Car Rental Management System.

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+

## Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE car_rental_db;
```

2. Update database credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Build and run:
```bash
mvn clean install
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

## API Endpoints

### Income
- `GET /api/incomes` - Get all income entries
- `POST /api/incomes` - Create new income entry
- `GET /api/incomes/{id}` - Get income by ID
- `PUT /api/incomes/{id}` - Update income
- `DELETE /api/incomes/{id}` - Delete income

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Create new vehicle
- `GET /api/vehicles/{id}` - Get vehicle by ID
- `PUT /api/vehicles/{id}` - Update vehicle
- `DELETE /api/vehicles/{id}` - Delete vehicle

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create or update expense
- `GET /api/expenses/month/{month}` - Get expense by month
- `DELETE /api/expenses/{id}` - Delete expense

## Database Schema

The application will automatically create the following tables:
- `income` - Income entries
- `vehicles` - Vehicle fleet
- `expenses` - Monthly expenses
