import * as types from "express/ts4.0";

const express = require("express");
const tasks = require("./routes/tasks");
const app: types.Application = express();

//set-ups
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/api/tasks", tasks);

app.listen(5000, () => console.log("Server listening on port 5000 ..."))