import { Task } from "./Task";
import { User } from "./User";

export class Comment {
    constructor(
        public description: string,
        public user: User,
        public task: Task,
        public id?: number){}
  }