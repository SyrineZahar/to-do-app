// Importation des modules nécessaires pour la configuration du routage
import { NgModule } from '@angular/core'; // Importation de la classe NgModule pour créer un module Angular
import { RouterModule, Routes } from '@angular/router'; // Importation des modules de routage
import { KanbanDashboardComponent } from './components/kanban-dashboard/kanban-dashboard.component'; // Importation du composant du tableau de bord Kanban
import { TaskFormComponent } from './components/task-form/task-form.component'; // Importation du composant du formulaire de tâche
import { SignupComponent } from './components/signup/signup.component';

// Définition des routes de l'application
const routes: Routes = [
  { path: "kanban", component: KanbanDashboardComponent }, // Route par défaut : redirige vers KanbanDashboardComponent
  { path: "", component: SignupComponent }, // Route par défaut : redirige vers KanbanDashboardComponent
  { path: "taskForm", component: TaskFormComponent }, // Route pour accéder au TaskFormComponent
];

// Déclaration du module de routage
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuration des routes dans le module racine
  exports: [RouterModule] // Exportation de RouterModule pour l'utiliser dans d'autres parties de l'application
})
export class AppRoutingModule {
  // Ce module ne contient pas de logique supplémentaire
}
