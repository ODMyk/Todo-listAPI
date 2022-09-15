import {Task, TaskTimeLimit} from "../models/Task";
import * as local from "./localTasks";

let tasks = local.tasks;

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

function newTask(id: number, name: string, description: string, tags: string[], limit: TaskTimeLimit) {
    if (tasks.find((t: Task) => t.getID() === id)) {
        return {statusCode: 400, response: {success: false, msg: `Task with id ${id} already exists`}};
    }
    let newTask: Task;
    try {
        newTask = new Task(id, name, description, tags, new Date().toUTCString(), limit, 1);
    } catch (e) {
        console.log(e);
        return {statusCode: 400, response: {success: false, msg: "Bad arguments"}};
    }
    tasks.push(newTask);
    return {statusCode: 201, response: {success: true, newTask}};
}

function getTasks(tags: string[]) {
    let responseList: Task[] = [...tasks];
    if (tags.length > 0) {
        responseList = responseList.filter(searchByTags(tags));
    }
    return {statusCode: 200, response: {success: true, tasks: responseList}};
}

function getTask(id: number) {
    const foundTask = tasks.find((item: Task) => item.getID() === id);
    if (foundTask) {
        return {statusCode: 200, response: {success: true, task: foundTask}};
    }
    return {statusCode: 404, response: {success: false, msg: `Task with id ${id} does not exist`}};
}

function updateTask(id: number, name: string, description: string, tags: string[], limit: TaskTimeLimit, statusCode: number) {
    const foundTask = tasks.find((item: Task) => item.getID() === id);
    if (foundTask) {
        foundTask.update({name, description, tags, limit, statusCode});
        tasks = tasks.map((item: Task): Task => item.getID() === id ? foundTask : item);
        return {statusCode: 201, response: {success: true, foundTask}};
    }
    return {statusCode: 404, response: {success: false, msg: `Task with id ${id} does not exist`}};
}

function deleteTask(id: number) {
    const foundTask = tasks.find((item: Task) => item.getID() === id);
    if (foundTask) {
        tasks = tasks.filter((item: Task) => item.getID() !== id);
        return {statusCode: 200, response: {success: true, deletedTask: foundTask}};
    }
    return {statusCode: 404, response: {success: false, msg: `Task with id ${id} does not exist`}};
}

export {
    newTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
}