import * as dao from "./dao.js";
import * as attemptsDao from "./attemptsDao.js"; // Import the new DAO

export default function QuizRoutes(app) {
  // --- EXISTING QUIZ ROUTES ---
  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    const quizzes = await dao.findQuizzesForCourse(cid);
    res.json(quizzes);
  });

  app.post("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    const newQuiz = { ...req.body, course: cid };
    const actualQuiz = await dao.createQuiz(newQuiz);
    res.json(actualQuiz);
  });

  app.get("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const quiz = await dao.findQuizById(qid);
    if (!quiz) {
      res.status(404).send("Quiz not found");
      return;
    }
    res.json(quiz);
  });

  app.put("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const status = await dao.updateQuiz(qid, req.body);
    res.json(status);
  });

  app.delete("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const status = await dao.deleteQuiz(qid);
    res.json(status);
  });

  // --- NEW ATTEMPTS ROUTES ---
  
  // Submit a new attempt
  app.post("/api/quizzes/:qid/attempts", async (req, res) => {
    const { qid } = req.params;
    const attempt = { ...req.body, quiz: qid };
    const newAttempt = await attemptsDao.createAttempt(attempt);
    res.json(newAttempt);
  });

  // Get attempts for a specific quiz and user
  app.get("/api/quizzes/:qid/attempts/:uid", async (req, res) => {
    const { qid, uid } = req.params;
    const attempts = await attemptsDao.findAttemptsForQuiz(qid, uid);
    res.json(attempts);
  });
}