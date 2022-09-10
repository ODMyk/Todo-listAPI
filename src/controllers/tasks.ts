import * as types from "express/ts4.0";

// @ts-ignore
let {tasks} = require("./localTasks");

function searchByTags(tags: string[]) {
    return (item: Task) => {
        for (let tag of item.tags) {
            if (tags.find((t: string) => t === tag)) {
                return true;
            }
        }
        return false;
    }
}

function createTask(req: types.Request, res: types.Response) {
    const {id, name, description, tags, created, limit, status} = req.body;
    if (tasks.find((t: Task) => t.id === id)) {
        return res.status(400).json({success: false, msg: `Task with id ${id} already exists`});
    }
    let newTask: Task;
    try {
        newTask = {id, name, description, tags, created, limit, status};
    } catch (e) {
        console.log(e);
        return res.status(400).json({success: false, msg: "Bad arguments"});
    }
    tasks.push(newTask);
    return res.status(201).json({success: true, newTask})
}

function getTasks(req: types.Request, res: types.Response) {
    const tags = String(req.query.tags || "").split(" ").filter((tag: string) => tag !== "");
    let responseList: Task[] = [...tasks];
    if (tags.length > 0) {
        responseList = responseList.filter(searchByTags(tags));
    }
    res.status(200).json({success: true, tasks: responseList});
}

function getTask(req: types.Request, res: types.Response) {
    const id = Number(req.params.id);
    const foundTask = tasks.find((item: Task) => item.id === id);
    if (foundTask) {
        return res.status(200).json({success: true, task: foundTask});
    } else {
        return res.status(404).json({success: false, msg: `Task with id ${id} does not exist`});
    }
}

function updateKeys(task: Task, updater: object): Task {
    const isValidKey = (value: string): value is keyof typeof updater => {
        return value in updater && value in task;
    }
    for (let field of Object.keys(updater)) {
        if (isValidKey(field)) {
            if (updater[field]) {
                task[field] = updater[field];
            }
        }
    }
    return task;
}

function updateTask(req: types.Request, res: types.Response) {
    const id = Number(req.params.id);
    const {name, description, tags, limit, status} = req.body;
    const updater: object = {name, description, tags, limit, status};
    let foundTask = tasks.find((item: Task) => item.id === id);
    if (foundTask) {
        foundTask = updateKeys(foundTask, updater);
        tasks = tasks.map((item: Task) => item.id === id ? foundTask : item);
        res.status(201).json({success: true, newTask: foundTask});
    } else {
        return res.status(404).json({success: false, msg: `Task with id ${id} does not exist`});
    }
}

function deleteTask(req: types.Request, res: types.Response) {
    const id = Number(req.params.id);
    const foundTask = tasks.find((item: Task) => item.id === id);
    if (foundTask) {
        tasks = tasks.filter((item: Task) => item.id !== id);
        return res.status(200).json({success: true, deletedTask: foundTask});
    } else {
        return res.status(404).json({success: false, msg: `Task with id ${id} does not exist`});
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
}