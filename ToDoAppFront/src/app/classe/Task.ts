// Importation de l'énumération TaskStatus qui définit les différents états d'une tâche
import { TaskStatus } from "./Enum/TaskStatus.enum";

// Déclaration de la classe Task
export class Task {
    constructor(
        public title: string, // Titre de la tâche
        public description: string, // Description détaillée de la tâche
        public status: TaskStatus, // Statut de la tâche
        public deadline: Date, // Date limite pour compléter la tâche
        public group_id: number,
        public user_id: number,
        public isDestactive?: boolean, // Indique si la tâche est désactivée (optionnel)
        public id?: number, // Identifiant unique de la tâche (optionnel)
        public createdAt?: Date, // Date de création de la tâche (optionnel)
        public updatedAt?: Date // Date de la dernière mise à jour de la tâche (optionnel)
    ) {}

}
