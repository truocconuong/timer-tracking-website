import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PipesModule } from '../../pipes/pipes.module';
import { CommonModule } from "@angular/common";
import { RouterTestingModule } from "@angular/router/testing";
import { OptionsTreeComponent } from './options-tree.component';
const data = [
  {
    id: 1,
    name: "women",
    parent_id: 0,
    children: [
      {
        id: 2,
        name: "bag",
        parent_id: 1,
        children: [
          {
            id: 5,
            name: "shoulder bag",
            parent_id: 2,
            children: []
          }
        ]
      },
      {
        id: 3,
        name: "cloth",
        parent_id: 1,
        children: [
          {
            id: 4,
            name: "dress",
            parent_id: 3,
            children: []
          }
        ]
      }
    ]
  }
];
describe('OptionsTreeComponent', () => {
  let component: OptionsTreeComponent;
  let fixture: ComponentFixture<OptionsTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PipesModule, CommonModule, RouterTestingModule.withRoutes([])],
      declarations: [ OptionsTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // fit('should create a select box with tree layout', () => {
  //   fixture.whenStable().then(() => {
  //     component.trees = data;
  //     fixture.detectChanges();
  //     let optgroups = fixture.debugElement.queryAll(By.css('optgroup'));
  //     let options = fixture.debugElement.queryAll(By.css('option'));
  //     expect(optgroups.length).toEqual(3);
  //     expect(options.length).toEqual(2);
  //   });
  // });
});
