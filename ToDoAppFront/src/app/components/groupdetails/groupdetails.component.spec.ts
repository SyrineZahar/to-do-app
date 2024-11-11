import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupdetailsComponent } from './groupdetails.component';

describe('GroupdetailsComponent', () => {
  let component: GroupdetailsComponent;
  let fixture: ComponentFixture<GroupdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupdetailsComponent]
    });
    fixture = TestBed.createComponent(GroupdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
