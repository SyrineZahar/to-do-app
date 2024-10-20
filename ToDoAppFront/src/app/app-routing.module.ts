import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanDashboardComponent } from './components/kanban-dashboard/kanban-dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { GroupsComponent } from './components/groups/groups.component';
import { LoginComponent } from './components/login/login.component';

// Définition des routes de l'application
const routes: Routes = [
  { path: "", redirectTo: "signup", pathMatch: "full" }, // Redirection vers SignupComponent par défaut
  { path: "signup", component: SignupComponent }, // Route pour le composant d'inscription
  { path: "login", component: LoginComponent }, // Route pour le composant de Login
  { path: "kanban", component: KanbanDashboardComponent }, // Route vers KanbanDashboardComponent
  { path: "taskForm", component: TaskFormComponent }, // Route pour TaskFormComponent
  { path: "groups" , component: GroupsComponent },
  { path: "groupForm", component: GroupFormComponent }, // Route pour GroupFormComponent
  { path: "**", redirectTo: "signup" } // Redirection pour les routes non trouvées
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
