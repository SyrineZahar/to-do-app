import { TaskStatus } from "./Enum/TaskStatus.enum";

export class Task {
    constructor(
        public title: string, 
        public description: string,
        public status: TaskStatus, 
        public deadline: Date, 
        public group_id: number,
        public user_id: number,
        public id?: number, 
        public createdAt?: Date, 
        public updatedAt?: Date 
    ) {}

}
