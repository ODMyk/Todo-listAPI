class Task {
    private readonly id: number;
    private readonly createdOn: string;
    private limit: TaskTimeLimit;
    private tags: string[];
    private name: string;
    private updatedOn: string | null;
    private status: number;
    private description: string;

    constructor(id: number, name: string, description: string, tags: string[], createdOn: string, limit: TaskTimeLimit, status: number) {
        this.id = id;
        this.createdOn = createdOn;
        this.description = description;
        this.name = name;
        this.limit = limit;
        this.status = status;
        this.tags = tags;
        this.updatedOn = null;
    }

    public getID(): number {
        return this.id;
    }

    public getCreatedOn(): string {
        return this.createdOn;
    }

    public getLimit(): TaskTimeLimit {
        return this.limit;
    }

    public setLimit(limit: TaskTimeLimit) {
        this.limit = limit;
    }

    public getTags(): string[] {
        return this.tags;
    }

    public setTags(tags: string[]): void {
        this.tags = tags;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getUpdatedOn(): string | null {
        return this.updatedOn;
    }

    public setUpdatedOn(updatedOn: string) {
        this.updatedOn = updatedOn;
    }

    public getStatus(): number {
        return this.status;
    }

    public setStatus(status: number) {
        this.status = status;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string) {
        this.description = description;
    }

    public update(updater: object): void {
        const isValidKey = (value: string): value is keyof typeof updater => {
            return value in updater && value in this;
        }

        let updated: boolean = false;
        for (let field of Object.keys(updater)) {
            if (isValidKey(field)) {
                if (updater[field]) {
                    this[field] = updater[field];
                    updated = true;
                }
            }
        }
        if (updated) {
            this.setUpdatedOn(new Date().toUTCString())
        }
    }
}

class TaskTimeLimit {
    expires: boolean;
    endDate: string | null;

    constructor(expires: boolean, endDate: string | null) {
        this.expires = expires;
        this.endDate = endDate;
    }
}

export {Task, TaskTimeLimit};