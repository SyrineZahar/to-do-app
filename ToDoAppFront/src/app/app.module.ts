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
    TaskFormComponent      // Composant pour le formulaire de tâche
  ],
  imports: [
    BrowserModule,         // Module essentiel pour les applications Angular
    AppRoutingModule,      // Module de routage pour gérer la navigation
    HttpClientModule,      // Module pour effectuer des requêtes HTTP
    ReactiveFormsModule     // Module pour utiliser les formulaires réactifs
  ],
  providers: [],           // Services disponibles dans le module (vide pour le moment)
  bootstrap: [AppComponent] // Composant à démarrer lors du lancement de l'application
})
export class AppModule { }
