import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importation des utilitaires pour les tests unitaires.
import { TaskFormComponent } from './task-form.component'; // Importation du composant TaskForm à tester.

describe('TaskFormComponent', () => { // Début du bloc de tests pour le TaskFormComponent.
  let component: TaskFormComponent; // Déclaration de la variable pour l'instance du composant.
  let fixture: ComponentFixture<TaskFormComponent>; // Déclaration de la variable pour le fixture du composant.

  beforeEach(() => { // Fonction exécutée avant chaque test.
    TestBed.configureTestingModule({ // Configuration du module de test.
      declarations: [TaskFormComponent] // Déclaration du TaskFormComponent dans le module de test.
    });
    fixture = TestBed.createComponent(TaskFormComponent); // Création d'une instance du composant dans le fixture.
    component = fixture.componentInstance; // Récupération de l'instance du composant.
    fixture.detectChanges(); // Détection des changements pour initialiser le composant.
  });

  it('should create', () => { // Test pour vérifier si le composant est créé avec succès.
    expect(component).toBeTruthy(); // Assertion pour s'assurer que le composant existe.
  });
});
