import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskStatus } from 'src/app/classe/Enum/TaskStatus.enum';
import { Task } from 'src/app/classe/Task';
import { AuthService } from 'src/app/service/Auth.service';
import { taskService } from 'src/app/service/Task.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Composant pour le tableau de bord Kanban.
 * -------------------------------------------
 * Ce composant gère l'affichage et l'interaction avec les tâches
 * dans un tableau Kanban, permettant de glisser et déposer
 * des tâches entre différents statuts.
 */
@Component({
  selector: 'app-kanban-dashboard', // Sélecteur du composant
  templateUrl: './kanban-dashboard.component.html', // Chemin vers le template HTML
  styleUrls: ['./kanban-dashboard.component.css'] // Chemin vers le fichier CSS du composant
})
export class KanbanDashboardComponent implements OnInit {
  userName: String | undefined;
  constructor(private taskService: taskService, private router: Router,private authService: AuthService, private dialog: MatDialog) { }

  TaskStatus = TaskStatus; // Enumération pour les statuts de tâche

  tasks: Task[] = []; // Liste complète des tâches
  todolist: Task[] = []; // Tâches à faire
  inProgressList: Task[] = []; // Tâches en cours
  doneList: Task[] = []; // Tâches terminées
  currentTask!: Task; // Tâche actuellement en cours de glisser

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.userName = user.name;
      this.tasks = user.tasks || [];
    }
    
    this.loadTasks(); // Charge les tâches au démarrage du composant
  }


  loadTasks(): void {
    // Charge les tâches à partir du service
    
     // Stocke les tâches récupérées
    this.updateTaskLists(); // Met à jour les listes de tâches selon leur statut
    
  }

  updateTaskLists(): void {
    // Met à jour les listes de tâches selon leur statut
    this.todolist = this.tasks.filter(task => task.status === TaskStatus.todo);
    this.inProgressList = this.tasks.filter(task => task.status === TaskStatus.inprogress);
    this.doneList = this.tasks.filter(task => task.status === TaskStatus.done);
  }

  onDragStart(task: Task): void {
    // Gère l'événement de début de glisser d'une tâche
    this.currentTask = task; // Stocke la tâche actuelle
    //console.log('Dragging task: ', task); // Log pour le débogage
  }

  onDrop(event: DragEvent, status: TaskStatus): void {
    // Gère l'événement de dépôt d'une tâche
    event.preventDefault(); // Empêche le comportement par défaut du navigateur
    
    if (this.currentTask) {

      this.currentTask.status = status; // Met à jour le statut de la tâche
      this.taskService.editTask(this.currentTask).subscribe({
        next: () => {
          this.loadTasks(); // Recharge les tâches pour refléter les changements
          console.log('Task dropped and updated'); // Log pour le débogage
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error updating task: ', err.message); // Gestion des erreurs
        }
      });
    }
  }

  onDragOver(event: DragEvent): void {
    // Gère l'événement de glisser sur une zone de dépôt
    event.preventDefault(); // Permet le dépôt
  }

  navigateToFormTask(): void {
    // Navigue vers le formulaire d'ajout de tâche
    this.router.navigate(['/taskForm']);
  }

  openTaskDetails(task: Task) {
    this.dialog.open(TaskDetailsComponent, {
      data: { task }
    });
  }

}
