// Importation des modules nécessaires pour les tests
import { ComponentFixture, TestBed } from '@angular/core/testing';
// Importation du composant TaskForm à tester
import { TaskFormComponent } from './task-form.component';

// Déclaration d'un groupe de tests pour le TaskFormComponent
describe('TaskFormComponent', () => {
  // Déclaration de variables pour le composant et son fixture
  let component: TaskFormComponent; // Instance du composant TaskForm
  let fixture: ComponentFixture<TaskFormComponent>; // Fixture associée au composant TaskForm

  // Configuration qui s'exécute avant chaque test
  beforeEach(() => {
    // Configuration du module de test
    TestBed.configureTestingModule({
      declarations: [TaskFormComponent] // Déclaration du TaskFormComponent dans le module de test
    });
    
    // Création d'une instance du TaskFormComponent
    fixture = TestBed.createComponent(TaskFormComponent);
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
