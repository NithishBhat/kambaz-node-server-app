import Hello from "./Hello.js";
import express from 'express';
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import session from "express-session";
import * as db from "./Kambaz/Database/index.js";

import UserRoutes from "./Kambaz/Users/router.js";
import AssignmentRoutes from "./Kambaz/Assignments/router.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/router.js";
import CourseRoutes from "./Kambaz/Courses/router.js";
import ModuleRoutes from "./Kambaz/Modules/router.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);

app.set("trust proxy", 1);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "lax",
    secure: false,
    httpOnly: true,
  },
};

if (process.env.NODE_ENV === "production") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
    httpOnly: true,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app, db);
AssignmentRoutes(app);
EnrollmentRoutes(app);
CourseRoutes(app, db);
ModuleRoutes(app, db);

Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);