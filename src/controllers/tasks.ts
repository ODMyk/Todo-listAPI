import * as types from "express/ts4.0";
import * as tasks from "../Service/tasks";

function createTask(req: types.Request, res: types.Response) {
    const {id, name, description, tags, limit} = req.body;
    const {statusCode, response} = tasks.newTask(id, name, description, tags, limit);
    res.status(statusCode).json(response);
}

function getTasks(req: types.Request, res: types.Response) {
    const tags = String(req.query.tags || "").split(",").filter((tag: string) => tag !== "");
    const {statusCode, response} = tasks.getTasks(tags);
    res.status(statusCode).json(response);
}

function getTask(req: types.Request, res: types.Response) {
    const id = Number(req.params.id);
    const {statusCode, response} = tasks.getTask(id);
    res.status(statusCode).json(response);
}

function updateTask(req: types.Request, res: types.Response) {
    const id = Number(req.params.id);
    const {name, description, tags, limit, status} = req.body;
    const {statusCode, response} = tasks.updateTask(id, name, description, tags, limit, status);
    res.status(statusCode).json(response);
}

function deleteTask(req: types.Request, res: types.Response) {
    const id = Number(req.params.id);
    const {statusCode, response} = tasks.deleteTask(id);
    res.status(statusCode).json(response);
}

export {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
};