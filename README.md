# Uber Clone

This project is an Uber clone application built with a modern tech stack. The frontend is developed using React and Tailwind CSS, while the backend is powered by Node.js, Express, and MongoDB. The application is designed with a microservices architecture, utilizing RabbitMQ for inter-service communication and WebSockets for real-time communication between the server and clients.

## Frontend

### Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

### Key Features
- **Captain Home Page**: Displays captain details and ride information.
- **Real-time Updates**: Uses WebSockets to receive real-time ride requests and location updates.
- **Animations**: Utilizes GSAP for smooth animations and transitions.

## Backend

### Technologies Used
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing application data.
- **RabbitMQ**: A message broker for communication between microservices.
- **WebSockets**: Enables real-time, bidirectional communication between the server and clients.

### Key Features
- **Microservices Architecture**: The backend is divided into multiple microservices, each responsible for a specific functionality.
- **Real-time Communication**: WebSockets are used to send and receive real-time updates between the server and clients.
- **Inter-service Communication**: RabbitMQ is used to facilitate communication between different microservices.

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- RabbitMQ

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/uber-clone.git
   ```

2. Navigate to the project directory:
   ```bash
   cd uber-clone
   ```

3. Install dependencies for the frontend:
   ```bash
   cd Frontend
   npm install
   ```

4. Install dependencies for the backend:
   ```bash
   cd ../Backend
   npm install
   ```

### Running the Application

1. Start MongoDB and RabbitMQ services.

2. Start the backend server:
   ```bash
   cd Backend
   npm start
   ```

3. Start the frontend development server:
   ```bash
   cd ../Frontend
   npm start
   ```

4. Open your browser and navigate to `http://localhost:5173` to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

<!-- ## License

This project is licensed under the MIT License. -->
