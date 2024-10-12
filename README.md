## Getting Started

To set up this project locally, follow these steps for both the frontend and backend.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-name>
```

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install the frontend dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend should now be running on [http://localhost:5173](http://localhost:5173).

### Backend Setup

1. Open a new terminal window and navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Create a `.env` file in the `backend` directory and add the following environment variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=<your_mongodb_connection_string>
   ```

   Make sure to replace `<your_mongodb_connection_string>` with your actual MongoDB connection string.

3. Install the backend dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The backend should now be running on [http://localhost:3000](http://localhost:3000).

### Accessing the Application

Once both the frontend and backend are running, you can access the application by navigating to [http://localhost:5173](http://localhost:5173) in your web browser.
