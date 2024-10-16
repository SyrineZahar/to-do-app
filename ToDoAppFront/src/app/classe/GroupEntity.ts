// Importation de l'énumération User qui définit les différents utilisateurs
import { User } from "./User"; // Assuming you have a User class defined
import { Task } from "./Task"; // Importing the Task class

// Déclaration de la classe Group
export class GroupEntity {
    // Constructeur de la classe, définissant les propriétés d'un groupe
    constructor(
        public backgroundImage: string, // Image de fond du groupe (optionnel)
        public profilePicture: string, // Photo de profil du groupe (optionnel)
        public nom: string, // Nom du groupe (optionnel)
        public description: string, // Description du groupe (optionnel)
        public id?: number, // Identifiant unique du groupe (optionnel)
        public users?: User[], // Liste des utilisateurs du groupe (optionnel)
        public tasks?: Task[] // Liste des tâches associées au groupe (optionnel)
    ) {}
}
