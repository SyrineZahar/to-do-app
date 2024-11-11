import { Task } from "./Task";
import { User } from "./User";

export class Comment {
    constructor(
        public description: string,
        public user: User, // Remplacez "any" par le type `User` si disponible
        public task: Task, // Remplacez "any" par le type `Task` si disponible
        public id?: number){}
  }