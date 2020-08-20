import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MutipleCheckboxComponent } from './mutiple-checkbox.component';

describe('MutipleCheckboxComponent', () => {
  let component: MutipleCheckboxComponent;
  let fixture: ComponentFixture<MutipleCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MutipleCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MutipleCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
