import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importation des modules nécessaires pour les tests unitaires.
import { FooterComponent } from './footer.component'; // Importation du composant Footer à tester.

describe('FooterComponent', () => { // Début du bloc de tests pour le FooterComponent.
  let component: FooterComponent; // Déclaration de la variable pour le composant.
  let fixture: ComponentFixture<FooterComponent>; // Déclaration de la variable pour le fixture.

  beforeEach(() => { // Fonction exécutée avant chaque test.
    TestBed.configureTestingModule({ // Configuration du module de test.
      declarations: [FooterComponent] // Déclaration du FooterComponent dans le module de test.
    });
    fixture = TestBed.createComponent(FooterComponent); // Création d'une instance du composant dans le fixture.
    component = fixture.componentInstance; // Récupération de l'instance du composant.
    fixture.detectChanges(); // Détection des changements pour initialiser le composant.
  });

  it('should create', () => { // Test pour vérifier si le composant est créé avec succès.
    expect(component).toBeTruthy(); // Assertion pour s'assurer que le composant existe.
  });
});
