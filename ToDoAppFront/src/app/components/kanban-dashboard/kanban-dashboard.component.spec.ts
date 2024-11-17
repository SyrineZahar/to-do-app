import { ComponentFixture, TestBed } from '@angular/core/testing';
// Importation du composant à tester
import { KanbanDashboardComponent } from './kanban-dashboard.component';

describe('KanbanDashboardComponent', () => {
  let component: KanbanDashboardComponent; 
  let fixture: ComponentFixture<KanbanDashboardComponent>; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KanbanDashboardComponent] 
    });
    
    fixture = TestBed.createComponent(KanbanDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
});
