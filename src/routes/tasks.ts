import * as types from "express/ts4.0";
import express from "express";

import {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
} from "../controllers/tasks";

const router: types.Router = express.Router();

router.route("/").post(createTask).get(getTasks);
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

export {router};