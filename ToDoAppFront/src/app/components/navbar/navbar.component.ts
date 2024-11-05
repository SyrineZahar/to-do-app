import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/Auth.service';

/**
 * Composant de la barre de navigation.
 * -------------------------------------
 * Ce composant gère l'affichage de la barre de navigation
 * et intègre le module de traduction de Google.
 */
@Component({
  selector: 'app-navbar', // Sélecteur du composant
  templateUrl: './navbar.component.html', // Chemin vers le template HTML
  styleUrls: ['./navbar.component.css'] // Chemin vers le fichier CSS du composant
})
export class NavbarComponent {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Méthode appelée lors de l'initialisation du composant
    this.loadGoogleTranslate(); // Charge le module de traduction de Google
  }

  loadGoogleTranslate(): void {
    // Méthode pour charger le module de traduction de Google
    let script = document.createElement('script'); // Crée un élément <script>
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'; // URL du script de traduction
    script.type = 'text/javascript'; // Type du script
    document.body.appendChild(script); // Ajoute le script au corps du document
    
    let googleTranslateInit = document.createElement('script'); // Crée un autre élément <script>
    googleTranslateInit.type = 'text/javascript'; // Type du script
    googleTranslateInit.innerHTML = `
      function googleTranslateElementInit() {
          new google.translate.TranslateElement(
              {pageLanguage: 'fr'},
              'google_translate_element'
          );
      }
    `; // Fonction d'initialisation pour le module de traduction
    document.body.appendChild(googleTranslateInit); // Ajoute le script d'initialisation au corps du document
  }


  onLogout() {
    this.authService.logout();
  }
}
