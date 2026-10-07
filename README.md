# Kambaz Node Server

This is the backend for Kambaz, a Canvas-style course-management app I built for my Web Development course at Northeastern. It's the part that stores and serves the data: users and their logins, courses, course modules, assignments, and which students are enrolled in which courses. The website talks to it over HTTP.

It's a class project, so there's no real database yet. Data is loaded from sample JavaScript files in `Kambaz/Database/` and kept in memory, so changes are lost when the server restarts. The matching frontend ([kambaz_next_js](https://github.com/NithishBhat/kambaz_next_js)) doesn't call this API yet.

## How it works

It's an Express 5 server (Node, ES modules). Sign-in uses cookie-based sessions through `express-session`, and CORS allows credentials from the frontend's origin. With `NODE_ENV=production` the session cookie switches to `SameSite=None; Secure` so it still works when the frontend and backend are on different domains.

`Lab5/` holds the Express practice routes from the course labs (path and query parameters, working with objects and arrays).

## API

| Resource | Endpoints |
|---|---|
| Users | `GET/POST /api/users`, `GET/PUT/DELETE /api/users/:userId`, `POST /api/users/signup`, `/signin`, `/signout`, `/profile` |
| Courses | `GET/POST /api/courses`, `GET/PUT/DELETE /api/courses/:courseId`, `GET /api/courses/:cid/users` (roster) |
| Modules | `GET /api/modules`, `GET/PUT/DELETE /api/modules/:moduleId`, `GET/POST /api/courses/:courseId/modules` |
| Assignments | `GET/POST /api/courses/:cid/assignments`, `PUT/DELETE /api/assignments/:aid` |
| Enrollments | `GET /api/users/:uid/enrollments`, `POST/DELETE /api/enrollments` |

## Running it

```bash
npm install
npm start        # listens on PORT, default 4000
```

Optional environment variables:

- `PORT`: default `4000`
- `FRONTEND_URL`: allowed CORS origin, default `http://localhost:3000`
- `SESSION_SECRET`: session signing secret
- `NODE_ENV`: set to `production` for cross-site cookies
- `NODE_SERVER_DOMAIN`: cookie domain in production

## Layout

```
index.js         CORS, sessions, route setup
Hello.js         welcome routes
Kambaz/
  Users/         dao.js + router.js
  Courses/ Modules/ Assignments/ Enrollments/
  Database/      in-memory seed data
Lab5/            Express practice routes
```
