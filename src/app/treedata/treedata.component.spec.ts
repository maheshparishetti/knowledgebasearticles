import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreedataComponent } from './treedata.component';

describe('TreedataComponent', () => {
  let component: TreedataComponent;
  let fixture: ComponentFixture<TreedataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreedataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
