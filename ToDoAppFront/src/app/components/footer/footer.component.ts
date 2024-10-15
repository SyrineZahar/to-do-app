import { Component } from '@angular/core';

/**
 * Composant pour le pied de page de l'application.
 * -----------------------------------------------
 * Ce composant représente la section du pied de page, 
 * qui inclut des informations telles que les droits d'auteur 
 * et des liens vers la politique de confidentialité et 
 * les conditions de service.
 */
@Component({
  selector: 'app-footer', // Sélecteur du composant, utilisé pour l'inclure dans d'autres templates
  templateUrl: './footer.component.html', // Chemin vers le fichier HTML du template
  styleUrls: ['./footer.component.css'] // Chemin vers le fichier CSS pour le style du composant
})
export class FooterComponent {
  // Classe du composant Footer
  // Actuellement, elle ne contient pas de logique spécifique,
  // mais peut être étendue pour inclure des fonctionnalités futures.
}
