
  // Importation de la fonction pour démarrer l'application Angular sur le navigateur
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// Importation du module racine de l'application
import { AppModule } from './app/app.module';

// Démarrage de l'application Angular en bootstrapant le module racine
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err)); // Gestion des erreurs lors du démarrage
