// @ts-ignore
const tasks: Task[] = [];

const exampleTask: Task = {id: 0, name: "Example", description: "Just for your reference", status: 1, created: new Date().toDateString(), tags: ["Practice"], limit: {expires: false, endDate: null}}

tasks.push(exampleTask);

export {tasks};