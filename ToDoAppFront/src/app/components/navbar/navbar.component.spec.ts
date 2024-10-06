import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importation des modules nécessaires pour effectuer des tests unitaires.
import { NavbarComponent } from './navbar.component'; // Importation du composant Navbar à tester.

describe('NavbarComponent', () => { // Début du bloc de tests pour le NavbarComponent.
  let component: NavbarComponent; // Déclaration de la variable pour l'instance du composant.
  let fixture: ComponentFixture<NavbarComponent>; // Déclaration de la variable pour le fixture du composant.

  beforeEach(() => { // Fonction exécutée avant chaque test.
    TestBed.configureTestingModule({ // Configuration du module de test.
      declarations: [NavbarComponent] // Déclaration du NavbarComponent dans le module de test.
    });
    fixture = TestBed.createComponent(NavbarComponent); // Création d'une instance du composant dans le fixture.
    component = fixture.componentInstance; // Récupération de l'instance du composant.
    fixture.detectChanges(); // Détection des changements pour initialiser le composant.
  });

  it('should create', () => { // Test pour vérifier si le composant est créé avec succès.
    expect(component).toBeTruthy(); // Assertion pour s'assurer que le composant existe.
  });
});
