import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanDashboardComponent } from './components/kanban-dashboard/kanban-dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { GroupsComponent } from './components/groups/groups.component';
import { LoginComponent } from './components/login/login.component';
import { adminGuard, authGuardGuard } from './guards/auth-guard.guard';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" }, 
  { path: "userdashboard", component: DashboardUserComponent, canActivate: [authGuardGuard]},
  { path: "signup", component: SignupComponent }, 
  { path: "login", component: LoginComponent }, 
  { path: "kanban/:id", component: KanbanDashboardComponent, canActivate: [authGuardGuard] }, 
  { path: "taskForm", component: TaskFormComponent, canActivate: [authGuardGuard] }, 
  { path: "groups", component: GroupsComponent, canActivate: [authGuardGuard] },
  { path: "groupForm", component: GroupFormComponent, canActivate: [adminGuard] }, 
  { path: "admin-dashboard", component: DashboardAdminComponent, canActivate: [adminGuard] }, 

  { path: "**", redirectTo: "login" } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
