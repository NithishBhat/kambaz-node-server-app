# Kambaz Node Server

REST API backend for **Kambaz**, a Canvas-style course management app built for Northeastern's Web Development course. It is an Express 5 server that handles courses, modules, assignments, enrollments, and users, with session-based sign-in.

## Tech stack

- Node.js (ES modules)
- Express 5
- express-session (cookie-based sessions)
- cors
- uuid

Data is held in memory, seeded from JavaScript files in `Kambaz/Database/`. Changes last only while the server is running.

## Features

- **Users:** full CRUD, plus sign up, sign in, sign out, and profile, all backed by the session
- **Courses:** list, fetch by ID, create, update, and delete
- **Modules:** list all or by course, create, update, and delete
- **Assignments:** list by course, create, update, and delete
- **Enrollments:** list a user's enrollments, enroll, and unenroll
- **Course roster:** list the users enrolled in a course
- **CORS with credentials**, plus production cookie settings (`SameSite=None`, `Secure`) for deployments where the frontend and backend run on different domains
- `Lab5/`: practice routes for path and query parameters and for working with objects and arrays

## API overview

| Resource | Endpoints |
|---|---|
| Users | `GET/POST /api/users`, `GET/PUT/DELETE /api/users/:userId`, `POST /api/users/signup`, `POST /api/users/signin`, `POST /api/users/signout`, `POST /api/users/profile` |
| Courses | `GET/POST /api/courses`, `GET/PUT/DELETE /api/courses/:courseId`, `GET /api/courses/:cid/users` |
| Modules | `GET /api/modules`, `GET/PUT/DELETE /api/modules/:moduleId`, `GET/POST /api/courses/:courseId/modules` |
| Assignments | `GET/POST /api/courses/:cid/assignments`, `PUT/DELETE /api/assignments/:aid` |
| Enrollments | `GET /api/users/:uid/enrollments`, `POST/DELETE /api/enrollments` |

## Running locally

```bash
npm install
npm start        # node index.js, listens on PORT or 4000
```

### Environment variables (all optional)

| Variable | Purpose |
|---|---|
| `PORT` | Port to listen on (default `4000`) |
| `FRONTEND_URL` | Allowed CORS origin (default `http://localhost:3000`) |
| `SESSION_SECRET` | Session signing secret |
| `NODE_ENV` | Set to `production` to turn on secure cross-site cookies |
| `NODE_SERVER_DOMAIN` | Cookie domain in production |

## Project structure

```
index.js              # App setup: CORS, sessions, route registration
Hello.js              # Simple health/welcome routes
Kambaz/
  Users/              # dao.js (data access) + router.js
  Courses/            # router.js
  Modules/            # router.js
  Assignments/        # router.js
  Enrollments/        # router.js
  Database/           # In-memory seed data
Lab5/                 # Express practice routes
```

## Related

- Frontend: [kambaz_next_js](https://github.com/NithishBhat/kambaz_next_js) (Next.js + React Bootstrap)
