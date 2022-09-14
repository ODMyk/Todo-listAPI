import * as types from "express/ts4.0";
import * as local from "./localTasks";
import {Task} from "../models/Task";

let tasks: Task[] = local.tasks;

function searchByTags(tags: string[]) {
    return (item: Task) => {
        for (let tag of item.getTags()) {
            if (tags.find((t: string) => t === tag)) {
                return true;
            }
        }
        return false;
    }
}

function createTask(req: types.Request, res: types.Response) {
    const {id, name, description, tags, limit} = req.body;
    if (tasks.find((t: Task) => t.getID() === id)) {
        return res.status(400).json({success: false, msg: `Task with id ${id} already exists`});
    }
    let newTask: Task;
    try {
        newTask = new Task(id, name, description, tags, new Date().toUTCString(), limit, 1);
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

    return res.status(200).json({success: true, tasks: responseList});
}

function getTask(req: types.Request, res: types.Response) {
    const id = Number(req.params.id);
    const foundTask = tasks.find((item: Task) => item.getID() === id);
    if (foundTask) {
        return res.status(200).json({success: true, task: foundTask});
    }

    return res.status(404).json({success: false, msg: `Task with id ${id} does not exist`});
}

function updateTask(req: types.Request, res: types.Response) {
    const id = Number(req.params.id);
    const {name, description, tags, limit, status} = req.body;
    const foundTask = tasks.find((item: Task) => item.getID() === id);
    if (foundTask) {
        foundTask.update({name, description, tags, limit, status});
        tasks = tasks.map((item: Task): Task => item.getID() === id ? foundTask : item);
        return res.status(201).json({success: true, foundTask});
    }

    return res.status(404).json({success: false, msg: `Task with id ${id} does not exist`});
}

function deleteTask(req: types.Request, res: types.Response) {
    const id = Number(req.params.id);
    const foundTask = tasks.find((item: Task) => item.getID() === id);
    if (foundTask) {
        tasks = tasks.filter((item: Task) => item.getID() !== id);
        return res.status(200).json({success: true, deletedTask: foundTask});
    }

    return res.status(404).json({success: false, msg: `Task with id ${id} does not exist`});
}

export {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
};