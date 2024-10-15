import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskStatus } from 'src/app/classe/Enum/TaskStatus.enum';
import { Task } from 'src/app/classe/Task';
import { taskService } from 'src/app/service/Task.service';

/**
 * Composant pour le formulaire de création/modification de tâche.
 * 
 * Ce composant permet à l'utilisateur de créer une nouvelle tâche
 * ou de modifier une tâche existante à l'aide d'un formulaire.
 * 
 * Les champs du formulaire incluent :
 * - Titre de la tâche
 * - Description de la tâche
 * - Statut de la tâche (à partir d'une énumération)
 * - Date limite de la tâche
 * - État de désactivation (par défaut à false)
 */
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task!: Task; // Tâche à créer ou modifier
  taskForm!: FormGroup; // Formulaire réactif pour la tâche
  taskStatuses = Object.values(TaskStatus); // Liste des statuts de tâche

  /**
   * Constructeur du composant.
   * 
   * @param fb - FormBuilder pour créer des formulaires réactifs.
   * @param taskService - Service pour gérer les tâches.
   * @param router - Router pour la navigation entre les pages.
   */
  constructor(
    private fb: FormBuilder,
    private taskService: taskService, 
    private router: Router
  ) {}

  /**
   * Méthode appelée lors de l'initialisation du composant.
   * Crée un formulaire vide à l'aide de la méthode createEmptyForm.
   */
  ngOnInit(): void {
    this.createEmptyForm();
  }

  /**
   * Crée un formulaire réactif vide avec des contrôles pour
   * le titre, la description, le statut, la date limite
   * et l'état de désactivation.
   */
  private createEmptyForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required], // Champ titre obligatoire
      description: ['', Validators.required], // Champ description obligatoire
      status: [TaskStatus.todo, Validators.required], // Statut par défaut à "todo"
      deadline: ['', Validators.required], // Date limite obligatoire
      isDesactivated: [false] // État de désactivation par défaut
    });
  }

  /**
   * Méthode appelée lors de la soumission du formulaire.
   * Vérifie si le formulaire est valide et, si oui, crée une nouvelle tâche
   * avec les données du formulaire et appelle le service pour l'ajouter.
   */
  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = new Task(
        this.taskForm.value.title,
        this.taskForm.value.description,
        this.taskForm.value.status,
        new Date(this.taskForm.value.deadline), // Conversion de la date
        this.taskForm.value.isDesactivated
      );
  
      // Appel du service pour ajouter la tâche
      this.taskService.addTask(taskData).subscribe(() => {
        this.router.navigate([""]); // Redirection vers la liste des tâches
      });
    }
  }

  /**
   * Méthode pour naviguer vers la liste des tâches.
   * Cette méthode est appelée lors de l'annulation.
   */
  navigateToTasks(): void {
    this.router.navigate([""]); // Redirection vers la liste des tâches
  }
}
