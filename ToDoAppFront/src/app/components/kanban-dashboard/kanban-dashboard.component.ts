import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskStatus } from 'src/app/classe/Enum/TaskStatus.enum';
import { Task } from 'src/app/classe/Task';
import { AuthService } from 'src/app/service/Auth.service';
import { taskService } from 'src/app/service/Task.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';

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
  constructor(private taskService: taskService, private router: Router,private authService: AuthService, private dialog: MatDialog, private route: ActivatedRoute) { }

  groupId!: number;
  TaskStatus = TaskStatus; // Enumération pour les statuts de tâche

  tasks: Task[] = []; // Liste complète des tâches
  todolist: Task[] = []; // Tâches à faire
  inProgressList: Task[] = []; // Tâches en cours
  doneList: Task[] = []; // Tâches terminées
  currentTask!: Task; // Tâche actuellement en cours de glisser

  ngOnInit(): void {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.groupId)
    this.loadTasks(); // Charge les tâches au démarrage du composant
  }

  loadTasks(): void {
    // Charge les tâches à partir du service
    this.taskService.getTasksByGroupId(this.groupId).subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks; // Stocke les tâches récupérées
        console.log(this.tasks)
        this.updateTaskLists(); // Met à jour les listes de tâches selon leur statut
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching tasks:', err); // Gestion des erreurs
      }
    });
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
    console.log('Dragging task: ', task); // Log pour le débogage
  }

  onDrop(event: DragEvent, status: TaskStatus): void {
    // Gère l'événement de dépôt d'une tâche
    event.preventDefault(); // Empêche le comportement par défaut du navigateur

    if (this.currentTask) {
      this.currentTask.status = status; // Met à jour le statut de la tâche
      this.currentTask.updatedAt = new Date("yyyy-MM-dd'T'HH:mm:ss");
      console.log(this.currentTask.updatedAt )
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

  openTaskDetails(task: Task) {
    this.dialog.open(TaskDetailsComponent, {
      data: { task }
    });
  }

  openAddTask() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: { group_id: this.groupId }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadTasks();
    });
  }
  
}
