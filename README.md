## Install dependencies:
```
npm i
```
## Build to JS
```
tsc
```
## Usage
```
GET /api/tasks?tags=
```
Returns json with all existing tasks that have given tags(separated with %44).

<hr>

```
POST /api/tasks
```
Creates new task. Request's body have to contain json representation of Task.

Returns json representation of created task

<hr>

```
GET /api/tasks/:id
```
Return json representation of task with given id.

<hr>

```
PUT /api/tasks/:id
```
Updates task with given id. Request's body have to contain json object({fieldName: newValue, fieldName: newValue ...})

Returns json representation of updated task

<hr>

```
DELETE /api/tasks/:id
```
Deletes task with given id.

Returns json representation of deleted task.

<hr>

## Future of the project

I am moving to NestJS framework, so this project is actually frozen. It is completed in it's own style and could be marked as done in specific case. Of course, it needs a database, but due to my choice, it won't get this update. Anyone could use it as reference or as part of his own non-commercial project.