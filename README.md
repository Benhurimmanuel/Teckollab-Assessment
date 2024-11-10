# Transactions - teckollab assessment

## Overview

The **Teckollab-Assessment** is a full-stack application built with **React** for the frontend and **Node.js** with **Sequelize ORM** for the backend. This system allows users to view transaction data, including functionality such as search, pagination, and sorting.

### Features:
- **Transaction Table**: Displays transaction details such as tracking ID, product, customer, date, amount, payment mode, and status.
- **Search Functionality**: Allows searching transactions by product or customer with partial and case-insensitive matching.
- **Pagination**: Supports pagination for easy navigation of large datasets.
- **Sorting**: Sort transactions by columns like tracking ID, amount, or date.
- **Responsive Design**: Works across devices, including mobile and desktop.

---

## Technologies Used

- **Frontend**:
  - React
  - Material-UI (for UI components)
  - Axios (for API requests)
  - FontAwesome (for icons)
  - CSS Modules (for scoped styling)

- **Backend**:
  - Node.js
  - Express.js
  - Sequelize ORM (for interacting with the database)
  - PostgreSQL (or MySQL)

- **Database**:
  - MSSQL (Azure SQL Server)

---

## Setup and Installation

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/Teckollab-Assessment.git
cd transactions-management 
```

### 2. Frontend Setup

To set up and run the frontend application locally, follow these steps:

1. **Navigate to the `frontend` directory:**

   First, navigate into the `frontend` folder of the project:

```bash
   cd FE
```
2. **Running the Development Server**
Start the React development server with:

```bash
npm install
npm run dev  
npm run build
```

Your frontend will be available at http://localhost:5173.

3. **Available Scripts**
- npm dev: Runs the app in development mode.
- npm run build: Builds the app for production


### 3. Backend Setup
Go to the backend directory and install the necessary dependencies:
1. **Install Dependencies**

```bash
cd BE
```
2. **Set up Environment Variables**
Create a .env file in the root of the backend folder and add your environment variables (e.g., database credentials, BE port Details etc):
- DB_HOST
- DB_PORT
- DB_DATABASE_NAME
- DB_USERNAME
- DB_PASSWORD
- NODE_ENVIRONMENT
- SERVER_PORT
- CORS_FE
3. **Running the Backend Server**
Start the backend server with:

```bash
npm install
npm start
```

Your backend API will be available at http://localhost:5000.


