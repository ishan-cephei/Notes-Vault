const express = require("express");
const userRouter = require("./routes/users.routes");
const loginRouter = require("./routes/login.routes");
const noteRouter = require("./routes/notes.routes");

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);

app.use("/api/login", loginRouter);

app.use("/api/notes", noteRouter);

module.exports = app;
