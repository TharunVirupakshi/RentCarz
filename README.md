

# RentCarz

RentCarz is a comprehensive car rental system designed to streamline the process of renting vehicles. It offers a robust set of features, including user registration, vehicle inventory management, booking and reservation, demand prediction, and a user-friendly interface. The system is built using MySQL for data storage, Node.js for the server-side application, and React for the frontend.

## Features

### User Registration and Authentication
<img width="1280" alt="352716863-9085dab0-482a-4146-9ca8-72fbdc64af66" src="https://github.com/user-attachments/assets/5ea12b9f-035e-4ebe-aee1-b59d57841fa0">

- Users can create a new account by providing necessary details.
- Users can log in using their credentials.

### Vehicle Inventory Management
<img width="1280" alt="352716981-c9c0ead4-8469-4f18-8a66-40dbab7da334" src="https://github.com/user-attachments/assets/979b95a9-e3fb-4200-91c8-c51c756bbc3c">

- Admins can add, edit, or remove vehicles.
- Vehicles are categorized and listed with details like type, availability, and price.
- Vehicle availability is automatically updated post-booking or return.

### Booking and Reservation System
<img width="420" alt="352717070-bc4bb43b-36cf-4d69-88ea-7584d1d0988e" src="https://github.com/user-attachments/assets/f725a031-4e88-46d6-ab62-867e10746444">

<img width="420" alt="352717097-eba69790-e5b5-4982-a2ce-5cd9ef712010" src="https://github.com/user-attachments/assets/8cf4158d-546d-4cdf-a9ff-dffa52d41ebc">


- Users can specify rental dates and hours to find available vehicles.
- Real-time availability and pricing predictions are provided.
- Handles concurrent user booking requests using pessimistic locking technique at the DB level and transaction level

### Demand Prediction
- Machine learning algorithms predict future demand based on historical data.
- Predictions account for external factors like holidays and weather.

### User Interface and Experience
<img width="1280" alt="352717207-ab3a9282-562b-44c5-a20c-cd9d0daa01ad" src="https://github.com/user-attachments/assets/79e4d43f-fb1f-4e36-a294-f1ccfab13bb7">


- The system offers a user-friendly interface for easy navigation and booking.
- Detailed vehicle information and photos are provided.

### Payment and Transactions
<img width="1280" alt="352717236-60eacab1-69b4-4627-bfdc-3c2343e6aba0" src="https://github.com/user-attachments/assets/b1f48a2f-3516-4cdc-aa55-0e174c35adeb">


- Users can complete payments using various methods (credit/debit cards, online wallets, etc.).
- Users receive transaction receipts and rental agreement details.

### Discounts and Promotions
- The system allows for the application of discount codes during the booking process.
- Admins can create and manage promotions and discounts.
- Users can claim applicable discounts and promotions during vehicle selection.

## Built With
- **MySQL**: A reliable relational database management system for structured data storage.
- **Node.js**: A JavaScript runtime environment for building scalable server-side applications.
- **React**: A JavaScript library for building user interfaces.

## Getting Started

### Prerequisites
- Node.js
- MySQL
- A package manager like npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/car-rental-system.git
   cd car-rental-system
   ```

2. **Install server dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up MySQL database:**
   - Create a new database in MySQL using the file `backend/files/DB_SCHEMA.sql`.
   - Update the database configuration with your MySQL credentials.

5. **Run the server:**
   ```bash
   cd ../backend
   npm start
   ```

6. **Run the client:**
   ```bash
   cd ../frontend
   npm run dev
   ```

### Usage

1. **Navigate to the client:**
   Open your web browser and go to `http://localhost:5173`.
   
2. **Register and log in:**
   Create a new user account or log in with existing credentials.

3. **Manage vehicles:**
   Admins can add, edit, or remove vehicles from the inventory.

4. **Book a vehicle:**
   Specify rental dates and hours, view available vehicles, and make a booking.

5. **Apply discounts:**
   Use discount codes during the booking process to avail promotions.

## Contributing

We welcome contributions to enhance the RentCarz project. To contribute, please fork the repository, create a new branch, and submit a pull request with your changes.

## License

This project is licensed under the MIT License.

