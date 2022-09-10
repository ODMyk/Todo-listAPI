import * as types from "express/ts4.0";

const express = require("express");
const {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
} = require("../controllers/tasks");

const router: types.Router = express.Router();

router.route("/").post(createTask).get(getTasks);
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;