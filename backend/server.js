const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/add", (req, res) => {
  const todo = {
    id: Date.now().toString(),
    text: req.body.text || "",
    completed: req.body.completed || false
  };
  todos.push(todo);
  res.json(todo);
});

app.get("/get", (req, res) => {
  res.json(todos);
});

app.put("/update/:id", (req, res) => {
  todos = todos.map((t) =>
    t.id === req.params.id ? { ...t, ...req.body } : t
  );
  res.json({ message: "Updated" });
});

app.delete("/delete/:id", (req, res) => {
  todos = todos.filter((t) => t.id !== req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});