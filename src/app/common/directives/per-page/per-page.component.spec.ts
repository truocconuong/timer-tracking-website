import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerPageComponent } from './per-page.component';

describe('PerPageComponent', () => {
  let component: PerPageComponent;
  let fixture: ComponentFixture<PerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
