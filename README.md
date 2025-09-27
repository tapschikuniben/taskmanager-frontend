Angular Task Manager Frontend
🌟 Overview
This is the Single Page Application (SPA) frontend for the Single-User Task Management System. Built with Angular 17+, this application provides a secure and responsive user interface for authenticating, viewing, creating, updating, and deleting tasks via a companion Spring Boot REST API.

The application uses JWT-based authentication and robust client-side routing guards to protect user data and manage the authentication flow.

Technology Stack
Framework: Angular 17+

Language: TypeScript

Styling: (Specify your styling technology, e.g., Tailwind CSS, Angular Material, or plain CSS)

State Management: Component and Service-based local state management.

🛠️ Getting Started
Prerequisites
Node.js (LTS Version)

npm (Node Package Manager, installed with Node.js)

Angular CLI (Install globally: npm install -g @angular/cli)

Running Backend: Ensure the Spring Boot Task API is running locally (usually on http://localhost:8080).

Installation
Clone the Repository:

git clone https://github.com/tapschikuniben/taskmanager-frontend.git
cd [your-frontend-directory]

Install Dependencies:

npm install

Run the Application:
Start the Angular development server.

ng serve --open

The application will automatically open in your browser, typically at http://localhost:4200.

🔒 Authentication & Security Flow
The application handles user access using tokens retrieved from the backend.

Feature

Description

Mechanism

Login

Public route (/login) to authenticate user and store JWT.

Calls POST /auth/login. On success, JWT stored in localStorage.

Registration

Public route (/register) to create new user accounts.

Calls POST /auth/register. Redirects to /login upon success.

Token Interceptor

Automatically attaches the stored JWT to the Authorization header for all protected requests.

HttpInterceptor implementation.

Route Guard

Prevents unauthorized access to task pages.

Angular CanActivate guard protects the /tasks route.

Logout

Clears the token from localStorage and redirects to /login.

User action via a dashboard button.

📝 Task Management Features
The primary interface is the protected /tasks route, which offers full CRUD (Create, Read, Update, Delete) functionality.

1. Task List (/tasks)
Fetches and displays all tasks belonging to the logged-in user (GET /api/tasks).

Shows key details: Title, Description preview, and Status (PENDING/COMPLETED).

Includes a loading spinner during API calls.

2. Task Operations
Operation

Backend Endpoint

User Interaction

Create

POST /api/tasks

Dedicated form on the dashboard to input Title, Description, and Status.

Update

PUT /api/tasks/{id}

Edit action opens a form or modal for modification.

Delete

DELETE /api/tasks/{id}

Requires a confirmation dialog before API call; removes item instantly on success.

🎯 UX and Development Standards

Maintainability: The project is structured using dedicated Angular Modules (Core, Shared, Auth, Tasks) for clear separation of concerns.
