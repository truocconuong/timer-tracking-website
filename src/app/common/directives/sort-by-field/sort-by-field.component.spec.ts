import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortByFieldComponent } from './sort-by-field.component';

describe('SortByFieldComponent', () => {
  let component: SortByFieldComponent;
  let fixture: ComponentFixture<SortByFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortByFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortByFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
