import { TaskStatus } from "./Enum/TaskStatus.enum";
/**
 * Représente une tâche dans l'application.
 */
export class Task {
  //Crée une instance de la classe Task.
    constructor(
        public id: number,// Identifiant unique
        public title: String,// Titre de la tâche
        public description: String, // Description de la tâche
        public status:TaskStatus,// Statut de la tâche (enum)
        public deadline: Date,// Date limite
        public isDestactive?: boolean,// Indicateur de désactivation (facultatif)
        public createdAt?: Date, // Date de création (facultatif)
        public updatedAt?: Date,// Date de mise à jour (facultatif)
     ) {}
    
    }
