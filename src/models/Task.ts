class Task {
    id: number;
    name: string;
    created: string;
    limit: TaskTimeLimit;
    status: number;
    tags: string[];
    description: string;

    constructor(id: number, name: string, description: string, tags: string[], created: string, limit: TaskTimeLimit, status: number) {
        this.id = id;
        this.created = created;
        this.description = description;
        this.name = name;
        this.limit = limit;
        this.status = status;
        this.tags = tags;
    }
}

class TaskTimeLimit {
    expires: boolean;
    endDate: Date | null;

    constructor(expires: boolean, endDate: Date | null) {
        this.expires = expires;
        this.endDate = endDate;
    }
}