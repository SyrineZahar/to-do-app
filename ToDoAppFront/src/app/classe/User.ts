import { UserRole } from "./Enum/UserRole.enum";
import { Task } from "./Task";

export class User{
    constructor(
        public name:String,
        public id: number,
        public role: UserRole,
        public email: String,
        public password: String,
        public tasks?: Task[]
    ){}
}