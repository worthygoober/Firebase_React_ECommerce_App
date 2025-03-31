# E-Commerce Web App

## Project Overview

The **E-Commerce Web App** is a modern shopping platform built with React and TypeScript. It leverages Redux Toolkit for state management and Firebase Firestore for product and order data. Users can browse products, manage their shopping cart, and complete a simulated checkout process. Authentication is handled through Firebase Authentication.

## Project Structure
```
/src
│── components/         # Reusable UI components
│   ├── Cart.tsx         # Shopping cart component
│   ├── ProductCard.tsx  # Displays individual product details
│── redux/              # Redux slices and store setup
│   ├── cartSlice.ts     # Manages cart state
│   ├── productSlice.ts  # Manages product state
│── pages/              # App pages
│   ├── Home.tsx         # Homepage displaying products
│   ├── Cart.tsx         # Shopping cart page
│   ├── Login.tsx        # Secure login page
|   ├── Profile.tsx      # View/change user info, as well as order history
│   ├── Register.tsx     # Register new users
│── hooks/              # Custom React hooks
│── services/           # Firebase Firestore API functions
│── types/              # TypeScript interfaces
│── App.tsx             # Main application component
│── main.tsx           # Application entry point
```

## Features

- **User Authentication:** Secure login and registration via Firebase Authentication.

- **Product Management:** Fetches product data from Firebase Firestore.

- **Shopping Cart:** Users can add, update, and remove items with session storage persistence.

- **Order Management:** Orders are stored in Firestore.

- **Category Filtering:** Users can filter products by category.

- **Checkout Simulation:** Clears the cart state and saves orders.

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later)

- **npm** (or yarn)
  
- **Vite** (if not already installed)

### 1. Clone the Repository
```sh
git clone <repository-url>
cd e-commerce-app
```

### 2. Install Dependencies
```bash
npm install
npm install react-router-dom
npm install @auth0/auth0-react
```

### 3. Start the Development Server
```
npm run dev
```

Your app will be accessible at http://localhost:5173/.

## Usage

### 1. Register / Login

Visit the register page to create an account or sign in on the login page using Firebase Authentication.

## 2. Browsing Products

Explore the homepage to view available products, filter by category, and add products to the shop catalogue.

## 3. Shopping Cart

Add Items: Click the "Add to Cart" button.

Modify Quantity: Adjust the quantity from the cart page.

Remove Items: Click the remove button.

## 4. Checkout Simulation

Click the "Checkout" button to place a simulated order and clear your cart.

## 5. Order History

View past orders stored in Firestore on the profile page.

## Built With

React + TypeScript: Modern frontend development

Redux Toolkit: Efficient state management

Firebase Firestore: Real-time database for products and orders

Firebase Authentication: Secure user authentication

## Future Improvements

🔹 Implement a real checkout process with a payment gateway.
🔹 Add user profile management and order history tracking.
🔹 Enhance product search and filtering options.

## License

This project is licensed under the MIT License.

## Author

Developed by Evan S Jones.

