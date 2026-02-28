# QuickHire — Job Board Application

A full-stack job board application built with **React**, **Express.js**, **PostgreSQL**, and **Prisma ORM**. Users can browse job listings, filter by category or location, view job details, and submit applications. Admins can post and delete job listings via a simple admin panel.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT + bcryptjs |
| Validation | Zod |

---

## Project Structure

```
quickhire/
├── client/               # React frontend
│   ├── src/
│   │   ├── pages/        # Home, JobsPage, JobDetail, AdminPanel
│   │   ├── components/   # Navbar, Footer, JobCard (reusable)
│   │   ├── services/     # Axios API instance
│   │   └── App.jsx       # Routes
│   ├── .env
│   └── package.json
│
├── server/               # Express backend
│   ├── prisma/
│   │   └── schema.prisma # DB models
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic + Prisma queries
│   │   ├── middlewares/  # Auth, error handling, validation
│   │   ├── validators/   # Zod schemas
│   │   └── app.js        # Express setup
│   ├── server.js         # Entry point
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) (local install or via pgAdmin)
- npm or yarn

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/quickhire.git
cd quickhire
```

---

### 2. Setup the Backend (server/)

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
# Server
PORT=5000
NODE_ENV=development

# PostgreSQL Database
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/quick_hire_db"

# Client origin (for CORS)
CLIENT_URL=http://localhost:5173

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
```

> Replace `yourpassword` with your actual PostgreSQL password.  
> If you have no password set, use: `postgresql://postgres@localhost:5432/quick_hire_db`

**Create the database** (if not already created):

```bash
psql -U postgres -h localhost
```
```sql
CREATE DATABASE quick_hire_db;
\q
```

**Run Prisma migrations:**

```bash
npx prisma generate
npx prisma migrate dev --name init
```

**Start the backend server:**

```bash
npm run dev
```

Server runs at: `http://localhost:5000`

---

### 3. Setup the Frontend (client/)

```bash
cd ../client
npm install
```

Create a `.env` file inside the `client/` folder:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

**Start the frontend:**

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## Environment Variables

### Server (`server/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server runs on | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:pass@localhost:5432/quick_hire_db` |
| `CLIENT_URL` | Frontend URL (for CORS) | `http://localhost:5173` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `some_random_secret` |
| `JWT_EXPIRES_IN` | JWT token expiry duration | `7d` |

### Client (`client/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API | `http://localhost:5000/api/v1` |

> ⚠️ After updating `.env` in the client, restart Vite (`npm run dev`) — Vite does not hot-reload environment variables.

---

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Public | Register a new user |
| POST | `/api/v1/auth/login` | Public | Login and receive JWT token |
| GET | `/api/v1/auth/me` | User | Get current logged-in user |

### Jobs
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/v1/jobs` | Public | Get all jobs (supports `?search=`, `?category=`, `?location=`) |
| GET | `/api/v1/jobs/:id` | Public | Get a single job by ID |
| POST | `/api/v1/jobs` | Admin | Create a new job listing |
| DELETE | `/api/v1/jobs/:id` | Admin | Delete a job listing |

### Applications
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/v1/jobs/:jobId/applications` | Public | Submit a job application |
| GET | `/api/v1/jobs/:jobId/applications` | Admin | Get all applications for a job |
| GET | `/api/v1/applications` | Admin | Get all applications |
| GET | `/api/v1/applications/me` | User | Get my submitted applications |
| PATCH | `/api/v1/applications/:id/status` | Admin | Update application status |
| DELETE | `/api/v1/applications/:id` | Admin | Delete an application |

---

## Database Models

### User
| Field | Type | Description |
|---|---|---|
| id | Int | Auto-increment primary key |
| name | String | Full name |
| email | String | Unique email address |
| password | String | Hashed password |
| role | Enum | `ADMIN`, `USER`, `EMPLOYER` |
| createdAt | DateTime | Timestamp |

### Job
| Field | Type | Description |
|---|---|---|
| id | Int | Auto-increment primary key |
| title | String | Job title |
| company | String | Company name |
| location | String? | Job location |
| category | String? | Job category |
| description | String | Full job description |
| salary | Float? | Annual salary |
| employmentType | String? | FULL_TIME, PART_TIME, etc. |
| experienceLevel | String? | ENTRY, MID, SENIOR, LEAD |
| remote | Boolean | Remote available |
| skills | String[] | Array of required skills |
| createdAt | DateTime | Timestamp |

### Application
| Field | Type | Description |
|---|---|---|
| id | Int | Auto-increment primary key |
| jobId | Int | FK → Job |
| userId | Int? | FK → User (optional) |
| name | String | Applicant name |
| email | String | Applicant email |
| resumeLink | String | URL to resume |
| coverNote | String? | Optional cover note |
| status | Enum | `PENDING`, `REVIEWED`, `ACCEPTED`, `REJECTED` |
| createdAt | DateTime | Timestamp |

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page with hero, categories, CTA |
| `/jobs` | Jobs Listing | Browse, search, and filter all jobs |
| `/jobs/:id` | Job Detail | Full job info + Apply Now modal |
| `/admin` | Admin Panel | Post new jobs, view and delete listings |

---

## Features

- **Job Listings** — Browse all jobs with grid/list view toggle
- **Search & Filter** — Filter by title/keyword, location, category, and employment type
- **Job Detail** — Full description, company info, required skills
- **Apply Now** — Modal form with name, email, resume URL, and cover note + validation
- **Admin Panel** — Create job listings, view all jobs in a table, delete with confirmation
- **JWT Auth** — Register/login with role-based access (`ADMIN` / `USER`)
- **Responsive UI** — Fully responsive across desktop, tablet, and mobile
- **Figma-accurate Design** — Matches the provided QuickHire Figma template

---

## Running Prisma Studio (Database GUI)

```bash
cd server
npx prisma studio
```

Opens at `http://localhost:5555` — lets you view and edit your database tables visually.

---

## Useful Scripts

### Backend (`server/`)
```bash
npm run dev          # Start server with nodemon (auto-restart)
npm run start        # Start server (production)
npm run db:migrate   # Run Prisma migrations
npm run db:generate  # Regenerate Prisma client
npm run db:seed      # Seed the database with sample data
npm run db:studio    # Open Prisma Studio
```

### Frontend (`client/`)
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## Author

Built as part of the QuickHire technical assessment for Associate Software Engineer.