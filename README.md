# YNV - Full-Stack Web Application

![YNV Logo](https://via.placeholder.com/150?text=YNV+Logo)

YNV is a full-stack web application built using NestJS for the backend and React for the frontend. This project demonstrates a simple and powerful architecture to manage and deliver data-driven web applications.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Backend (NestJS)](#backend-nestjs)
  - [Frontend (React)](#frontend-react)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **NestJS Backend**: A robust and scalable backend built with NestJS, following best practices for API development.
- **React Frontend**: A dynamic and responsive frontend built with React, offering an interactive user experience.
- **Easy Setup**: Simple commands to get both the backend and frontend running quickly.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v14.x or later)
- npm (v6.x or later)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AchrefAwaissi/YNV.git
   cd YNV
   ```

## Running the Application

This project is divided into two main parts: the backend (NestJS) and the frontend (React). Both can be started with simple commands.

### Backend (NestJS)

1. Navigate to the backend directory and install the dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Start the backend server:

   ```bash
   npm start
   ```

   The backend will be running at `http://localhost:3000`.

### Frontend (React)

1. Navigate to the frontend directory and install the dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

2. Start the frontend development server:

   ```bash
   npm start
   ```

   The frontend will be running at `http://localhost:3001`.

## Project Structure

```
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
```

- **Backend**: Contains all the NestJS application code, including controllers, services, and entities.
- **Frontend**: Contains the React application code, including components, styles, and assets.

## Contributing

Contributions are welcome! If you wish to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add a new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

Please follow the project's coding style and ensure that your code passes all tests before submitting a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

Made with ❤️ by [Your Name/Team Name]
