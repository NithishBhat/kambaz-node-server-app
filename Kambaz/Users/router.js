import UsersDao from "./dao.js";
import { enrollments } from "../Database/index.js"; // Import enrollments

let currentUser = null; // Session management (as in your original)

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);

  // --- New Route: Get Users for a Course ---
  app.get("/api/courses/:cid/users", (req, res) => {
    const { cid } = req.params;
    
    // 1. Get all user IDs enrolled in this course
    const enrolledUserIds = enrollments
      .filter((e) => e.course === cid)
      .map((e) => e.user);
    
    // 2. Get all users
    const allUsers = dao.findAllUsers();

    // 3. Filter all users to find the ones who are enrolled
    const courseUsers = allUsers.filter((user) => 
      enrolledUserIds.includes(user._id)
    );
    
    res.json(courseUsers);
  });

  // --- Full CRUD Routes ---
  const createUser = (req, res) => {
    const user = dao.createUser(req.body);
    res.json(user);
  };
  
  const deleteUser = (req, res) => {
    dao.deleteUser(req.params.userId);
    res.sendStatus(200);
  };
  
  const findAllUsers = (req, res) => {
    res.json(dao.findAllUsers());
  };
  
  const findUserById = (req, res) => {
    const user = dao.findUserById(req.params.userId);
    res.json(user);
  };
  
  const updateUser = (req, res) => {
    const { userId } = req.params;
    const updatedUser = dao.updateUser(userId, req.body);
    if (currentUser?._id === userId) {
      currentUser = updatedUser; // Update session if it's the current user
    }
    res.json(updatedUser);
  };

  // --- Session Routes (from your original) ---
  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    currentUser = dao.createUser(req.body);
    res.json(currentUser);
  };

  const signin = (req, res) => {
    const { username, password } = req.body;
    currentUser = dao.findUserByCredentials(username, password);
    res.json(currentUser);
  };

  const signout = (req, res) => {
    currentUser = null;
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    if (!currentUser) {
      res.sendStatus(401); // Not authorized
      return;
    }
    res.json(currentUser);
  };

  // --- Register Routes ---
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile); // Using POST for profile is common
}