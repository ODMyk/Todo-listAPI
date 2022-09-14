import {Task, TaskTimeLimit} from "../models/Task";

const tasks: Task[] = [];
const exampleTask: Task = new Task(0, "Example", "Just for your reference", ["Practice"], new Date().toUTCString(), new TaskTimeLimit(false, null), 1);
tasks.push(exampleTask);

export {tasks};