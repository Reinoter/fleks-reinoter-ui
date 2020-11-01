import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTypesComponent } from './car-types.component';

describe('CarTypesComponent', () => {
  let component: CarTypesComponent;
  let fixture: ComponentFixture<CarTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
