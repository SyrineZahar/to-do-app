import { User } from "./User"; 
import { Task } from "./Task";

export class GroupEntity {
    constructor(
        public backgroundImage: string, 
        public profilePicture: string, 
        public nom: string, 
        public description: string,
        public id?: number, 
        public users?: User[], 
        public tasks?: Task[]
    ) {}
}
