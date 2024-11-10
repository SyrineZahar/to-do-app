import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Importation des modules et composants nécessaires
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KanbanDashboardComponent } from './components/kanban-dashboard/kanban-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { GroupsComponent } from './components/groups/groups.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { MatIconModule } from '@angular/material/icon';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';  // Import du module MatIconModule
import { TaskDetailsComponent } from './components/task-details/task-details.component';


/**
 * Module principal de l'application Angular.
 * 
 * Ce module regroupe tous les composants et modules nécessaires au fonctionnement de l'application.
 */
@NgModule({
  declarations: [
    AppComponent,          // Composant racine de l'application
    KanbanDashboardComponent, // Composant pour le tableau Kanban
    FooterComponent,       // Composant pour le pied de page
    NavbarComponent,       // Composant pour la barre de navigation
    TaskFormComponent, 
    SignupComponent, 
    GroupFormComponent, 
    GroupsComponent, 
    LoginComponent,  
    TaskDetailsComponent,
    TaskFormComponent, DashboardUserComponent, DashboardAdminComponent    // Composant pour le formulaire de tâche
  ],
  imports: [
    BrowserModule,         // Module essentiel pour les applications Angular
    MatIconModule,
    AppRoutingModule,      // Module de routage pour gérer la navigation
    HttpClientModule,      // Module pour effectuer des requêtes HTTP
    ReactiveFormsModule, BrowserAnimationsModule,     MatDialogModule,  

    // Module pour utiliser les formulaires réactifs
  ],
  providers: [],           // Services disponibles dans le module (vide pour le moment)
  bootstrap: [AppComponent] // Composant à démarrer lors du lancement de l'application
})
export class AppModule { }
