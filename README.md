## Frontend Repository
🔗 https://github.com/Vasundhara-02/primetrade-frontend# Primetrade Backend API

A scalable REST API with Authentication & Role-Based Access Control built with Node.js, Express, PostgreSQL & Sequelize.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL + Sequelize ORM
- **Auth:** JWT + bcryptjs
- **Validation:** express-validator
- **Frontend:** React.js

## Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL

### Installation

Clone the repo:
\`\`\`bash
git clone https://github.com/Vasundhara-02/primetrade-backend.git
cd primetrade-backend
npm install
\`\`\`

### Setup .env file
\`\`\`env
PORT=5000
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_PORT=5432
DB_NAME=primetrade_db
DB_USER=postgres
DB_PASSWORD=yourpassword
\`\`\`

### Run the server
\`\`\`bash
npm run dev
\`\`\`

## API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/v1/auth/register | No | Register user |
| POST | /api/v1/auth/login | No | Login |
| GET | /api/v1/auth/profile | Yes | Get profile |

### Tasks
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/v1/tasks | Yes | Create task |
| GET | /api/v1/tasks | Yes | Get all tasks |
| GET | /api/v1/tasks/:id | Yes | Get one task |
| PUT | /api/v1/tasks/:id | Yes | Update task |
| DELETE | /api/v1/tasks/:id | Yes | Delete task |

## Role Based Access
- **user** — can only see and manage their own tasks
- **admin** — can see and manage all tasks

## Security
- Passwords hashed with bcryptjs
- JWT tokens expire in 24 hours
- Input validation on all routes
- Protected routes require Bearer token

## Scalability Notes
- Stateless JWT enables horizontal scaling
- PostgreSQL supports read replicas for high traffic
- Redis can be added for token caching
- Docker-ready modular structure
- Easy migration to microservices architecture
