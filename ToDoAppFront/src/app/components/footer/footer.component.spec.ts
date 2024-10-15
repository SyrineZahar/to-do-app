// Importation des modules nécessaires pour les tests
import { ComponentFixture, TestBed } from '@angular/core/testing';
// Importation du composant à tester
import { FooterComponent } from './footer.component';

// Déclaration d'un groupe de tests pour le FooterComponent
describe('FooterComponent', () => {
  // Déclaration de variables pour le composant et son fixture
  let component: FooterComponent; // Instance du composant
  let fixture: ComponentFixture<FooterComponent>; // Fixture associée au composant

  // Configuration qui s'exécute avant chaque test
  beforeEach(() => {
    // Configuration du module de test
    TestBed.configureTestingModule({
      declarations: [FooterComponent] // Déclaration du FooterComponent dans le module de test
    });
    
    // Création d'une instance du FooterComponent
    fixture = TestBed.createComponent(FooterComponent);
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
