import { UserRole } from "./Enum/UserRole.enum";

export class User{
    constructor(
        public name:String,
        public id: number,
        public role: UserRole,
        public email: String,
        public password: String
    ){}
}