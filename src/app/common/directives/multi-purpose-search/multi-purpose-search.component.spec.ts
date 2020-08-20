import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiPurposeSearchComponent } from './multi-purpose-search.component';

describe('MultiPurposeSearchComponent', () => {
  let component: MultiPurposeSearchComponent;
  let fixture: ComponentFixture<MultiPurposeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiPurposeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiPurposeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
