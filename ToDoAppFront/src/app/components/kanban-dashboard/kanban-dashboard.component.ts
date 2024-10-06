import { HttpErrorResponse } from '@angular/common/http'; // Importation pour gérer les erreurs HTTP.
import { Component, OnInit } from '@angular/core'; // Importation des décorateurs et interfaces nécessaires.
import { Router } from '@angular/router'; // Importation du routeur pour naviguer entre les pages.
import { TaskStatus } from 'src/app/classe/Enum/TaskStatus.enum'; // Importation de l'énumération des statuts de tâche.
import { Task } from 'src/app/classe/Task'; // Importation de la classe Task.
import { taskService } from 'src/app/service/Task.service'; // Importation du service de gestion des tâches.

@Component({
  selector: 'app-kanban-dashboard', // Sélecteur pour utiliser ce composant dans le template.
  templateUrl: './kanban-dashboard.component.html', // Chemin vers le fichier HTML du composant.
  styleUrls: ['./kanban-dashboard.component.css'] // Chemin vers le fichier CSS du composant.
})
export class KanbanDashboardComponent implements OnInit { // Déclaration du composant avec l'interface OnInit.

  constructor(private taskService: taskService, private router: Router) {} // Injection des services nécessaires.

  TaskStatus = TaskStatus; // Exposition de l'énumération TaskStatus pour l'utiliser dans le template.

  tasks!: Task[]; // Déclaration de la liste des tâches, initialisée à undefined.

  todolist!: Task[]; // Liste des tâches à faire.
  inProgressList!: Task[]; // Liste des tâches en cours.
  doneList!: Task[]; // Liste des tâches terminées.

  currentTask!: Task; // Tâche actuellement en cours de glisser-déposer.

  ngOnInit(): void { // Méthode exécutée lors de l'initialisation du composant.
    this.loadTasks(); // Charge les tâches lors de l'initialisation.
  }

  loadTasks() { // Méthode pour charger les tâches à partir du service.
    this.taskService.getTasks().subscribe({ // Abonnement au service pour récupérer les tâches.
      next: (tasks: Task[]) => { // Fonction appelée si la récupération est réussie.
        this.todolist = tasks.filter(task => task.status === TaskStatus.todo); // Filtre les tâches à faire.
        this.inProgressList = tasks.filter(task => task.status === TaskStatus.inprogress); // Filtre les tâches en cours.
        this.doneList = tasks.filter(task => task.status === TaskStatus.done); // Filtre les tâches terminées.
      },
      error: (err) => { // Fonction appelée en cas d'erreur.
        console.error('Error fetching tasks:', err); // Affiche une erreur dans la console.
      }
    });
  }

  onDragStart(task: Task) { // Méthode appelée lorsque le glissement d'une tâche commence.
    this.currentTask = task; // Stocke la tâche actuellement glissée.
    console.log('Dragging task: ', task); // Affiche la tâche en cours de glissement dans la console.
  }

  onDrop(event: DragEvent, status: TaskStatus) { // Méthode appelée lorsque la tâche est lâchée.
    event.preventDefault(); // Empêche le comportement par défaut.

    let droppedTask = this.tasks.find(t => t.id === this.currentTask!.id); // Recherche la tâche glissée.
    if (droppedTask) { // Si la tâche existe, met à jour son statut.
      droppedTask.status = status; // Change le statut de la tâche.
      console.log(`kbal edit task`); // Log d'information pour débogage.

      this.taskService.editTask(droppedTask).subscribe({ // Appelle le service pour mettre à jour la tâche.
        next: () => { // Fonction appelée si la mise à jour est réussie.
          this.loadTasks(); // Recharge les tâches.
          console.log('Task dropped'); // Affiche un message de confirmation dans la console.
        },
        error: (err: HttpErrorResponse) => { // Fonction appelée en cas d'erreur.
          console.error('Error updating task: ', err.message); // Affiche une erreur de mise à jour dans la console.
        }
      });
    }
  }

  onDragOver(event: DragEvent) { // Méthode appelée lorsque la tâche est survolée.
    event.preventDefault(); // Empêche le comportement par défaut.
  }

  navigateToFormTask(): void { // Méthode pour naviguer vers le formulaire de tâche.
    this.router.navigate(['/taskForm']); // Utilise le routeur pour naviguer vers le chemin spécifié.
  }
}
