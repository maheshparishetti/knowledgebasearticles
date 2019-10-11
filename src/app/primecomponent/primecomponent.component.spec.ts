import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimecomponentComponent } from './primecomponent.component';

describe('PrimecomponentComponent', () => {
  let component: PrimecomponentComponent;
  let fixture: ComponentFixture<PrimecomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimecomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
