const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const app = express();

/* =====================
   MIDDLEWARE
===================== */
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

/* =====================
   DATABASE
===================== */
mongoose
  .connect("mongodb://127.0.0.1:27017/taskmanager")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const Task = require("./models/Task");

/* =====================
   ROUTES
===================== */

/* GET – Dashboard */
app.get("/", async (req, res) => {
  const tasks = await Task.find().sort({ updatedAt: -1 });
  res.render("index", { tasks });
});

/* POST – Add task */
app.post("/tasks", async (req, res) => {
  await Task.create({ name: req.body.name });
  res.redirect("/");
});

/* PUT – Edit task */
app.put("/tasks/:id", async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  });
  res.redirect("/");
});

/* PUT – Toggle completed */
app.put("/tasks/:id/toggle", async (req, res) => {
  const task = await Task.findById(req.params.id);
  await Task.findByIdAndUpdate(req.params.id, {
    completed: !task.completed
  });
  res.redirect("/");
});

/* DELETE – Delete task */
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

/* =====================
   SERVER
===================== */
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});