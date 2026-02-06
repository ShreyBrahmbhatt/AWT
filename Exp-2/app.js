const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
let tasks = [];

// Home page
app.get("/", (req, res) => {
  res.render("index", { tasks });
});

// Add task
app.post("/add", (req, res) => {
  const task = req.body.task;
  if (task) tasks.push(task);
  res.redirect("/");
});

// Delete task
app.post("/delete", (req, res) => {
  const index = req.body.index;
  tasks.splice(index, 1);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Task Manager running on http://localhost:3000");
});
