import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importation des modules nécessaires pour effectuer des tests unitaires.
import { KanbanDashboardComponent } from './kanban-dashboard.component'; // Importation du composant KanbanDashboard à tester.

describe('KanbanDashboardComponent', () => { // Début du bloc de tests pour le KanbanDashboardComponent.
  let component: KanbanDashboardComponent; // Variable pour stocker l'instance du composant.
  let fixture: ComponentFixture<KanbanDashboardComponent>; // Variable pour stocker le fixture du composant.

  beforeEach(() => { // Fonction exécutée avant chaque test.
    TestBed.configureTestingModule({ // Configuration du module de test.
      declarations: [KanbanDashboardComponent] // Déclaration du KanbanDashboardComponent dans le module de test.
    });
    fixture = TestBed.createComponent(KanbanDashboardComponent); // Création d'une instance du composant dans le fixture.
    component = fixture.componentInstance; // Récupération de l'instance du composant.
    fixture.detectChanges(); // Détection des changements pour initialiser le composant.
  });

  it('should create', () => { // Test pour vérifier si le composant est créé avec succès.
    expect(component).toBeTruthy(); // Assertion pour s'assurer que le composant existe.
  });
});
