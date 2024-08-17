YNV is a full-stack web application built using NestJS for the backend and React for the frontend. This project demonstrates a simple and powerful architecture to manage and deliver data-driven web applications.

Table of Contents
Features
Getting Started
Prerequisites
Installation
Running the Application
Project Structure
Contributing
License
Features
NestJS Backend: A robust and scalable backend built with NestJS, following best practices for API development.
React Frontend: A dynamic and responsive frontend built with React, offering an interactive user experience.
Easy Setup: Simple commands to get both the backend and frontend running quickly.
Getting Started
Prerequisites
Ensure you have the following installed on your machine:

Node.js (v14.x or later)
npm (v6.x or later)
Git
Installation
Clone the repository:

bash
Copier le code
git clone https://github.com/AchrefAwaissi/YNV.git
cd YNV
Running the Application
This project is divided into two main parts: the backend (NestJS) and the frontend (React). Both can be started with simple commands.

Backend (NestJS)
Navigate to the backend directory and install the dependencies:

bash
Copier le code
cd backend
npm install
Start the backend server:

bash
Copier le code
npm start
The backend will be running at http://localhost:3000.

Frontend (React)
Navigate to the frontend directory and install the dependencies:

bash
Copier le code
cd ../frontend
npm install
Start the frontend development server:

bash
Copier le code
npm start
The frontend will be running at http://localhost:3001.

Project Structure
bash
Copier le code
YNV/
│
├── backend/            # NestJS backend
│   ├── src/
│   ├── test/
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/           # React frontend
    ├── public/
    ├── src/
    ├── .env
    ├── package.json
    └── tsconfig.json
Backend: Contains all the NestJS application code, including controllers, services, and entities.
Frontend: Contains the React application code, including components, styles, and assets.
Contributing
Contributions are welcome! If you wish to contribute:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -m 'Add a new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
Please follow the project's coding style and ensure that your code passes all tests before submitting a pull request.

