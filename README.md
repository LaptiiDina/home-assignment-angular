Home Assignment: Vehicle Management System

📌 Project Overview

This project is a Vehicle Management System built using NestJS (backend), Angular (frontend), and PostgreSQL (database). The application is fully containerized using Docker.

📥 Cloning the Project

To download the project, run the following command in your terminal:
git clone https://github.com/LaptiiDina/home-assignment-angular.git
cd home-assignment-angular

Project Structure

home-assignment-angular/
│── client/                   # Frontend (Angular)
│   ├── src/
│   │   ├── app/
│   │   │   ├── component/   # UI components (forms, lists, etc.)
│   │   │   ├── app.component.ts
            ├── app.config.ts
│   │   │   ├── app.routes.ts
│   │   │   ├── vehicle.service.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   ├── theme.less
│   ├── angular.json          # Angular configuration
│   ├── package.json          # Dependencies
│   ├── Dockerfile            # Dockerfile for frontend
│   ├── proxy.conf.json       # API proxy configuration
│
│── server/                   # Backend (NestJS)
│   ├── src/
│   │   ├── filters/          # Exception filters
│   │   ├── vehicles/         # Vehicle module
│   │   │   ├── dto/          # Data Transfer Objects
│   │   │   ├── entities/     # Database entities
│   │   │   ├── vehicles.controller.ts
            ├── vehicles.module.ts
│   │   │   ├── vehicles.service.ts
│   │   ├── app.module.ts
│   │   ├── main.ts           # Entry point
│   ├── .env                  # Environment variables
│   ├── package.json          # Dependencies
│   ├── Dockerfile            # Dockerfile for backend
│
│── docker-compose.yml         # Docker configuration
│── README.md                  # Project documentation


🚀 Running the Project with Docker
To start all services, simply run:

cd home-assignment-angular
docker-compose up -d --build

This will spin up 3 containers:
-backend (NestJS, running on port 3000)
-frontend (Angular, running on port 4200)
-postgres (PostgreSQL, running on port 5432)

Checking if Everything Works

API (Swagger UI):
Open http://localhost:3000/api to see the API documentation.

Frontend:
Open http://localhost:4200 to access the web app.

📜 API Endpoints

GET '/vehicles' Get all vehicles. Optionally, use status query parameter to filter by status (active, inactive). Example: /vehicles?status=active will return only active vehicles.

GET '/vehicles/:id' Get  vehicle by id.

POST '/vehicles' Add a new vehicle

PATCH '/vehicles/:id' Update a vehicle

DELETE '/vehicles/:id' Remove a vehicle


📝 Additional Notes

The project is configured to automatically apply database migrations using TypeORM.

Swagger is set up to document API endpoints (http://localhost:3000/api).

Ant Design is used for frontend styling.