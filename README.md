Here's a README template for your e-commerce website project:

---

# Evergreen Mobile Shop - E-commerce Website

An online store for **Evergreen Mobile Shop**, the largest wholesaler of mobiles and accessories in the region. This full-stack MERN e-commerce website provides an easy-to-use online shopping platform for customers and a comprehensive admin panel for the store to manage products, orders, and user interactions.

## Project Links

- **User Website**: [Evergreen Shop](https://evergreen-hpwm.onrender.com)
- **Admin Panel**: [Evergreen Admin Panel](https://evergreen-admin.onrender.com)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Admin Panel Functionalities](#admin-panel-functionalities)
- [User Functionalities](#user-functionalities)
- [Future Enhancements](#future-enhancements)

## Features

### User Side
- **Product Display**: Users can view the latest products, bestsellers, accessories, and mobile sections with various filtering and sorting options.
- **Product Search**: Allows users to search by product name or type.
- **Product Details**: Displays multiple images, color options, and a review feature for each product.
- **Shopping Cart**: Users can add items to the cart, update quantities, view the total price (including delivery), and proceed to checkout.
- **Checkout Process**: Users can choose from EasyPaisa, JazzCash, and Cash on Delivery (only COD is enabled currently).
- **Order Tracking**: Displays detailed status updates for each order as it progresses (e.g., placed, shipped, out for delivery).
  
### Admin Panel
- **Product Management**: Admins can add, view, and delete products.
- **Order Management**: Admins can view and update order statuses.
  
## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js, JSON Web Tokens for authentication
- **Database**: MongoDB with Mongoose
- **Payment Integration**: EasyPaisa, JazzCash (Cash on Delivery enabled only)
- **Deployment**: [Render.com](https://render.com) for both frontend and backend

## Setup and Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JaiLohana16/Evergreen/
   cd <repository-directory>
   ```

2. **Install dependencies** for both client and server:
   ```bash
   # In root directory
   npm install

   # In client directory
   cd client
   npm install

   # In server directory
   cd ../server
   npm install
   ```

3. **Set up environment variables** in `.env` files for backend and frontend.

4. **API Call Adjustments**:
   - Modify API endpoints in the frontend files to point to your local backend server (if running locally) instead of the deployed URL.

5. **Run the Application**:
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend client:
     ```bash
     cd client
     npm start
     ```

6. Access the user site on `http://localhost:<frontend-port>` and the admin panel on `http://localhost:<admin-panel-port>`.

## Usage

### Admin Panel Functionalities

1. **Login**: The admin logs in with credentials secured by JSON Web Tokens.
2. **Product Management**: Admins can:
   - Add new products with details such as name, price, category, and images.
   - View and delete products from the catalog.
3. **Order Management**: Admins can:
   - View all placed orders.
   - Update order statuses as they progress through the shipping stages.

### User Functionalities

1. **Browse Products**: Users can view products by category or through bestsellers and latest products.
2. **Filtering and Sorting**: Users can filter by brand, category, and price.
3. **Product Details**: Each product page shows images, description, available colors, and reviews.
4. **Shopping Cart**: 
   - Add, update quantity, and remove items.
   - See cart total and delivery charges.
5. **Checkout**:
   - Fill in address, contact details, and select a payment method.
   - Cash on Delivery is available; EasyPaisa and JazzCash are currently disabled.
6. **Order Tracking**:
   - Track the order status from placed to delivery as updated by the admin.

### Note

For any issues while running locally, ensure the API endpoints and configurations match the local server settings.

## Future Enhancements

- Enable online payments with EasyPaisa and JazzCash.
- Add real-time order updates using WebSockets or a similar technology.
- Enhance the admin panel for better analytics and insights.

---

