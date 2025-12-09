import UsersDao from "./dao.js";
import { enrollments } from "../Database/index.js";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);

  // --- Get Users for a Course ---
  app.get("/api/courses/:cid/users", (req, res) => {
    const { cid } = req.params;
    const enrolledUserIds = enrollments
      .filter((e) => e.course === cid)
      .map((e) => e.user);
    const allUsers = dao.findAllUsers();
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
    // Update session if it's the current user
    if (req.session["currentUser"]?._id === userId) {
      req.session["currentUser"] = updatedUser;
    }
    res.json(updatedUser);
  };

  // --- Session Routes ---
  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const newUser = dao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const signin = (req, res) => {
    const { username, password } = req.body;
    const user = dao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
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
  app.post("/api/users/profile", profile);
}