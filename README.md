# Mind Power Car Rental Management System

A modern, full-stack car rental management system with a beautiful React frontend and Spring Boot backend.

## Features

- 🎨 **Modern UI** - Beautiful, responsive dashboard with dark/light theme toggle
- 📊 **Analytics Dashboard** - Real-time KPIs, charts, and financial insights
- 🚗 **Fleet Management** - Track vehicles, mileage, and status
- 💰 **Income Tracking** - Record and monitor daily rental income
- 💸 **Expense Management** - Track fuel, service, insurance, and toll costs
- 📈 **Profit Analysis** - Automatic profit calculation and distribution
- 📋 **Financial Reports** - Comprehensive monthly financial reports
- 🌙 **Dark/Light Theme** - Toggle between themes with smooth transitions

## Tech Stack

### Frontend
- React 19
- React Router
- Axios
- Vite
- Modern CSS with CSS Variables

### Backend
- Spring Boot 3.2
- PostgreSQL
- JPA/Hibernate
- RESTful API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Java 17+
- Maven 3.6+
- PostgreSQL 12+

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:8080/api
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Create PostgreSQL database:
```sql
CREATE DATABASE car_rental_db;
```

2. Update database credentials in `backend/src/main/resources/application.properties`

3. Navigate to backend directory:
```bash
cd backend
```

4. Build and run:
```bash
mvn clean install
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

### Database Setup

You can use the provided SQL script to initialize the database:

```bash
psql -U postgres -d car_rental_db -f database/init.sql
```

## Project Structure

```
mind-power-solution/
├── src/                    # React frontend
│   ├── components/        # Reusable components
│   ├── pages/             # Page components
│   ├── context/           # React contexts (Theme, Auth)
│   ├── services/          # API services
│   └── utils/             # Utility functions
├── backend/               # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/mindpower/carrental/
│   │       ├── controller/  # REST controllers
│   │       ├── service/      # Business logic
│   │       ├── repository/   # Data access
│   │       ├── entity/       # JPA entities
│   │       └── dto/          # Data transfer objects
│   └── src/main/resources/  # Configuration files
└── database/              # Database scripts
```

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

## Features in Detail

### Dashboard
- Real-time KPIs (Total Income, Rides, Vehicles, Status)
- Income trend line chart
- Distribution pie chart
- Income by vehicle bar chart
- Recent income table

### Theme Toggle
- Smooth transitions between dark and light themes
- Persistent theme preference (localStorage)
- System preference detection

### Responsive Design
- Mobile-friendly layout
- Adaptive grid systems
- Touch-friendly interactions

## Development

### Frontend Development
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Development
```bash
cd backend
mvn spring-boot:run  # Run Spring Boot app
mvn test             # Run tests
```

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
