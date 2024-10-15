// Importation des modules nécessaires pour les tests
import { ComponentFixture, TestBed } from '@angular/core/testing';
// Importation du composant Navbar à tester
import { NavbarComponent } from './navbar.component';

// Déclaration d'un groupe de tests pour le NavbarComponent
describe('NavbarComponent', () => {
  // Déclaration de variables pour le composant et son fixture
  let component: NavbarComponent; // Instance du composant Navbar
  let fixture: ComponentFixture<NavbarComponent>; // Fixture associée au composant Navbar

  // Configuration qui s'exécute avant chaque test
  beforeEach(() => {
    // Configuration du module de test
    TestBed.configureTestingModule({
      declarations: [NavbarComponent] // Déclaration du NavbarComponent dans le module de test
    });
    
    // Création d'une instance du NavbarComponent
    fixture = TestBed.createComponent(NavbarComponent);
    // Récupération de l'instance du composant
    component = fixture.componentInstance;
    // Déclenche la détection des changements pour initialiser le composant
    fixture.detectChanges();
  });

  // Déclaration d'un test unitaire
  it('should create', () => {
    // Vérification que le composant a été créé avec succès
    expect(component).toBeTruthy(); // L'instance du composant ne doit pas être null ou undefined
  });
});
