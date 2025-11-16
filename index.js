import Hello from "./Hello.js";
import express from 'express';
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import * as db from "./Kambaz/Database/index.js";

import UserRoutes from "./Kambaz/Users/router.js";
import AssignmentRoutes from "./Kambaz/Assignments/router.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/router.js"; // 1. Import new router

const app = express();

app.use(cors());
app.use(express.json());

UserRoutes(app, db);
AssignmentRoutes(app);
EnrollmentRoutes(app); // 2. Register the new routes

Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);