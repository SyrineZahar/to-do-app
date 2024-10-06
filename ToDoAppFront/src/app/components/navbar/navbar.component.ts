import { Component } from '@angular/core'; // Importation du décorateur Component d'Angular.

@Component({
  selector: 'app-navbar', // Sélecteur utilisé pour insérer ce composant dans le HTML.
  templateUrl: './navbar.component.html', // Chemin vers le fichier HTML du template du composant.
  styleUrls: ['./navbar.component.css'] // Chemin vers le fichier CSS pour les styles du composant.
})
export class NavbarComponent { // Déclaration de la classe NavbarComponent.

  constructor() { } // Constructeur, peut être utilisé pour injecter des services si nécessaire.

  ngOnInit(): void { // Méthode exécutée lors de l'initialisation du composant.
    this.loadGoogleTranslate(); // Charge le script de Google Translate.
  }

  loadGoogleTranslate(): void { // Méthode pour charger le script de Google Translate.
    let script = document.createElement('script'); // Création d'un élément script.
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'; // Source du script.
    script.type = 'text/javascript'; // Définition du type du script.
    document.body.appendChild(script); // Ajout du script au corps du document.

    let googleTranslateInit = document.createElement('script'); // Création d'un second élément script.
    googleTranslateInit.type = 'text/javascript'; // Définition du type du script.
    googleTranslateInit.innerHTML = `
      function googleTranslateElementInit() { // Fonction d'initialisation pour Google Translate.
          new google.translate.TranslateElement( // Création d'une nouvelle instance de TranslateElement.
              {pageLanguage: 'fr'}, // Langue de la page source.
              'google_translate_element' // ID de l'élément où le widget sera inséré.
          );
      }
    `;
    document.body.appendChild(googleTranslateInit); // Ajout de la fonction d'initialisation au corps du document.
  }
}
