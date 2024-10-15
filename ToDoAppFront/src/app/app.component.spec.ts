// Importation des modules nécessaires pour les tests
import { TestBed } from '@angular/core/testing'; // Pour configurer et initialiser les tests Angular
import { RouterTestingModule } from '@angular/router/testing'; // Pour tester le routage sans dépendance réelle
import { AppComponent } from './app.component'; // Importation du composant AppComponent

// Déclaration d'un groupe de tests pour AppComponent
describe('AppComponent', () => {
  // Configuration du module de test avant chaque test
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule], // Importation du module de test pour le routage
    declarations: [AppComponent] // Déclaration du AppComponent à tester
  }));

  // Test pour vérifier que l'application est créée
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent); // Création d'une instance du AppComponent
    const app = fixture.componentInstance; // Récupération de l'instance du composant
    expect(app).toBeTruthy(); // Vérification que l'instance du composant n'est pas null ou undefined
  });

  // Test pour vérifier que le titre est correct
  it(`should have as title 'ToDoAppFront'`, () => {
    const fixture = TestBed.createComponent(AppComponent); // Création d'une nouvelle instance du composant
    const app = fixture.componentInstance; // Récupération de l'instance
    expect(app.title).toEqual('ToDoAppFront'); // Vérification que le titre est 'ToDoAppFront'
  });

  // Test pour vérifier le rendu du titre dans le template
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent); // Création d'une instance du composant
    fixture.detectChanges(); // Déclenche la détection des changements pour mettre à jour le DOM
    const compiled = fixture.nativeElement as HTMLElement; // Récupération du DOM natif du composant
    // Vérification que le texte rendu contient le message attendu
    expect(compiled.querySelector('.content span')?.textContent).toContain('ToDoAppFront app is running!');
  });
});
