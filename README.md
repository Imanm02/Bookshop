# Online Bookstore Project

The Online Bookstore project is a web application developed as part of the practical project for the System Analysis and Design course. It allows users to browse and purchase books online.
The project consists of two main components: a front-end web application for user interaction and a back-end API that handles order processing and other business logic.

## Getting Started

Follow these steps to set up and run the project locally:

1. **Backend Environment Setup:**
   - Open a terminal or command prompt.
   - Navigate to the `Backend` folder of the project.
   - Activate the virtual environment by running the following command:
     ```
     .venv\scripts\activate
     ```

2. **Run the Backend Server:**
   - Change directory to `bookshop/bookshop`.
   - Start the Django development server by running:
     ```
     python manage.py runserver
     ```
   - The backend server will be running on port 8000.


3. **Set up node and NPM:**
    - To install Node, visit the official Node.js website and download the latest version for your operating system. Npm will also be installed as the default package manager during the installation process. Verify the installation by running the following commands in your terminal:
    ```
    node --version
    npm --version
    ```

4. **Run the Frontend Server:**
    - Change directory to `Frontend`.
    - Start the development server by running:
    ```
    npm start
    ```
    - Once the development server runs, your default browser should automatically open and display your React app. If it doesn't, you can manually access the app by entering `http://localhost:3000/` in your browser's address bar. Now you are ready to test and view the app.


## Features

- Browse books by category.
- View book details (title, author, description, price).
- Add books to the cart.
- Place orders

## Technologies Used

- Django (Python web framework)
- React
