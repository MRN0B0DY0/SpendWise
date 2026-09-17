# SpendWise 💰

SpendWise is a full-stack personal finance management web application designed to help users manage, track, and analyze their finances in one place.

The application allows authenticated users to record income and expenses, search and filter transactions, create and manage category-based budgets, monitor spending, analyze financial data through interactive reports, view financial insights, and manage their profile.

SpendWise was built to explore and practice full-stack web development by connecting a React.js frontend with a Node.js and Express.js backend and a MySQL database.

## 🚀 Features

- 🔐 User authentication with JWT
- 👤 User-specific financial data
- 📊 Financial dashboard with dynamic statistics
- 💳 Income and expense transaction management
- 🔎 Transaction search and filtering
- ➕ Add new transactions
- 🗑️ Delete transactions
- 💰 Category-based budget planning
- 📅 Monthly and yearly budget tracking
- 📈 Budget vs actual spending analysis
- ⚠️ Overspending detection
- 📊 Interactive financial reports
- 📉 Income vs expense visualization
- 🏷️ Expense analysis by category
- 💡 Smart financial insights
- 👤 Profile management
- 🚪 Secure logout and JWT expiration handling
- 📱 Responsive design across different screen sizes

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript
- React Router
- Fetch API
- Recharts
- CSS
- HTML / JSX

### Backend
- Node.js
- Express.js

### Database
- MySQL
- SQL

### Authentication & Security
- JSON Web Token (JWT)
- bcrypt
- dotenv

### Other
- web-vitals
- npm
- Git

## 🏗️ Application Structure

SpendWise consists of the following main pages:

- **Welcome / Login** – User authentication and demo login
- **Dashboard** – Overview of income, expenses, balance, savings, and spending patterns
- **Transactions** – View, search, filter, and delete transactions
- **Add Transaction** – Add new income or expense records
- **Budget Planner** – Create and manage category-based budgets
- **Reports** – Analyze financial data using interactive charts and insights
- **Profile** – Manage personal information and view financial statistics

## 🔄 Full-Stack Architecture

```text
React.js Frontend
       ↓
    Fetch API
       ↓
Express.js / Node.js Backend
       ↓
JWT Authentication
       ↓
     MySQL