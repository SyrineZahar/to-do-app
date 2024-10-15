// Importation de l'énumération TaskStatus qui définit les différents états d'une tâche
import { TaskStatus } from "./Enum/TaskStatus.enum";

// Déclaration de la classe Task
export class Task {
    // Constructeur de la classe, définissant les propriétés d'une tâche
    constructor(
        public title: String, // Titre de la tâche
        public description: String, // Description détaillée de la tâche
        public status: TaskStatus, // Statut de la tâche, défini par l'énumération TaskStatus
        public deadline: Date, // Date limite pour compléter la tâche
        public isDestactive?: boolean, // Indique si la tâche est désactivée (optionnel)
        public id?: number, // Identifiant unique de la tâche (optionnel)
        public createdAt?: Date,  // Date de création de la tâche (optionnel)
        public updatedAt?: Date,  // Date de la dernière mise à jour de la tâche (optionnel)
    ) {}
}
