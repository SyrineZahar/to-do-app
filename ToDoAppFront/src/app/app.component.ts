import { Component } from '@angular/core';

/**
 * Composant principal de l'application.
 * 
 * Ce composant sert de conteneur pour l'ensemble de l'application
 * ToDoAppFront et gère le titre affiché.
 */
@Component({
  selector: 'app-root', // Sélecteur utilisé pour intégrer ce composant dans le template
  templateUrl: './app.component.html', // Chemin vers le template HTML associé
  styleUrls: ['./app.component.css'] // Chemin vers les styles CSS associés
})
export class AppComponent {
  title = 'ToDoAppFront'; // Titre de l'application, affiché dans le template
}
