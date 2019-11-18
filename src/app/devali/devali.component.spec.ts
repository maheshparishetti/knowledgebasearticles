import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevaliComponent } from './devali.component';

describe('DevaliComponent', () => {
  let component: DevaliComponent;
  let fixture: ComponentFixture<DevaliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevaliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
