# Setup Guide

## Quick Start

### 1. Database Setup

First, create the PostgreSQL database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE car_rental_db;

# Exit psql
\q
```

Or use the provided SQL script:
```bash
psql -U postgres -d car_rental_db -f database/init.sql
```

### 2. Backend Setup

1. Navigate to backend directory:
```bash
cd backend
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

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (optional, defaults to localhost:8080):
```env
VITE_API_URL=http://localhost:8080/api
```

3. Start development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify database credentials
- Ensure port 8080 is available

### Frontend can't connect to backend
- Verify backend is running on port 8080
- Check CORS settings (already configured)
- Verify API URL in `.env` file

### Database connection errors
- Ensure PostgreSQL is installed and running
- Check database name matches `car_rental_db`
- Verify username and password in `application.properties`

## Production Build

### Frontend
```bash
npm run build
```
Output will be in `dist/` directory

### Backend
```bash
cd backend
mvn clean package
```
JAR file will be in `backend/target/` directory

Run with:
```bash
java -jar target/car-rental-backend-1.0.0.jar
```
