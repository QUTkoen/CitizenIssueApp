# CitizenIssueApp – Issue Reporting & Park Reservation Management

## **JIRA Board URL**

[https://connect-team-b90nktqj.atlassian.net/jira/software/projects/CIA/boards/34?atlOrigin=eyJpIjoiMmM5MDJhZmEzODlkNGEyNjgxOTc2ODYyOGVmNjQzNjEiLCJwIjoiaiJ9](https://connect-team-b90nktqj.atlassian.net/jira/software/projects/CIA/boards/34?atlOrigin=eyJpIjoiMmM5MDJhZmEzODlkNGEyNjgxOTc2ODYyOGVmNjQzNjEiLCJwIjoiaiJ9)

---

## **CI/CD Workflow**

My CI/CD pipeline is implemented using **GitHub Actions**, deploying to a self-hosted AWS EC2 runner.

### Workflow Steps:

1. Triggered **only on push to the `main` branch**.
2. Runs on a self-hosted AWS EC2 instance.
3. Checks out the latest code.
4. Sets up Node.js 22 environment.
5. Stops PM2 services for the app.
6. Installs backend dependencies.
7. Installs frontend dependencies and builds the React frontend.
8. Runs backend tests covering Issue Reporting and Park Reservation features.
9. Creates/updates `.env` files for backend.
10. Uses PM2 to serve the frontend and run the backend.

---

## **Project Setup Instructions (Local Development)**

```bash
# Clone the repository
git clone https://github.com/QUTkoen/CitizenIssueApp

# Navigate to project root
cd CitizenIssueApp

# Install dependencies for both backend and frontend
npm run install-all

# Start backend and frontend concurrently for development
npm run
```

---

## **Objective**

CitizenIssueApp is a full-stack web application designed to help citizens **report issues or incidents** to local authorities and **reserve public park spaces**. It combines user authentication with two main modules:

* **Issue Reporting** – Users can submit, view, update, and delete reports about civic issues.
* **Park Reservation Management** – Users can book parks for events or activities and manage their reservations.

---

## **Application Overview**

CitizenIssueApp empowers users to stay engaged and organized with the following core features:

* **User Authentication**: Secure signup, login, logout, and profile management.
* **Issue Reporting**:

  * Submit new reports (issues) with title, description, status, deadline, and address.
  * View all submitted reports.
  * Edit or delete reports.
* **Park Reservations**:

  * Book parks by selecting a park, date, and reservation reasons.
  * View all reservations or filter by park.
  * Cancel reservations.

**Key Features Include:**

* Signup, Login, Logout, and Profile Update.
* Add, View, Update, Delete Reports.
* Make, View, Filter, Cancel Park Reservations.
* JWT-based authentication securing all operations.

---

## **Backend API Overview**

* `/api/auth` – User authentication endpoints (signup, login, profile).
* `/api/reports` – CRUD operations for issue reports (protected routes).
* `/api/park-reservations` – CRUD operations for park reservations (protected routes).

---

## **Frontend Components**

* **Authentication pages:** Login, Register, Profile.
* **Issue Reporting:**

  * `ReportForm` — Add and update reports.
  * `ReportList` — Display all user reports with edit/delete options.
* **Park Reservation:**

  * `ParkReservationForm` — Create new park reservations.
  * `ParkReservationList` — View and manage reservations filtered by park.

---

## **Authentication & Authorization**

* JWT tokens protect all API routes for reports and reservations.
* Only authenticated users can perform CRUD operations.

---

## **Version Control & Branching Strategy**

* `main` branch holds stable, production-ready code.
* Commits follow descriptive messaging from JIRA and pull requests via GitHub.

---

## **Prerequisites**

Please ensure you have installed and set up the following tools before starting development:

* **Node.js**: [https://nodejs.org/en](https://nodejs.org/en)
* **Git**: [https://git-scm.com/](https://git-scm.com/)
* **VS Code**: [https://code.visualstudio.com/](https://code.visualstudio.com/)
* **MongoDB Account**: [https://account.mongodb.com/account/login](https://account.mongodb.com/account/login)
* **GitHub Account**: [https://github.com/signup?source=login](https://github.com/signup?source=login)

---

## **Submission Requirements for University**

* JIRA Project Board URL with user stories and sprint planning.
* Requirements diagram illustrating application features.
* GitHub repository with separate `/backend` and `/frontend` folders.
* README.md including:

  * Setup instructions.
  * CI/CD workflow details.
  * Overview of both Issue Reporting and Park Reservation modules.

---
