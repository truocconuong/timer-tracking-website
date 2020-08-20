import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { LengthAwarePaginatorComponent } from './length-aware-paginator.component';
import LengthAwarePaginator from '../../../models/LengthAwarePaginator';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from "@angular/router/testing";
import { CommonModule } from "@angular/common";
describe('LengthAwarePaginatorComponent', () => {
  let component: LengthAwarePaginatorComponent;
  let fixture: ComponentFixture<LengthAwarePaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule.withRoutes([])],
      declarations: [ LengthAwarePaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LengthAwarePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function testPage(pages, currentPage, pageInBetween, result: { pagination: Array<any>, active: Array<any>, showMore?: Array<any> }) {
    fixture.whenStable().then(() => {
      component.paginator = new LengthAwarePaginator({total_pages: pages});
      component.numberPageInBetween = pageInBetween;
      component.current_page = currentPage;
      component.alwaysDisplay = true;
      component.ngOnChanges({
        paginator: new SimpleChange(null, new LengthAwarePaginator({total_pages: 10}), false)
      });
      fixture.detectChanges();
      let as = fixture.debugElement.queryAll(By.css('a'));
      let lis = fixture.debugElement.queryAll(By.css('li'));
      expect(as.map(s => {
        return s.nativeElement.textContent;
      })).toEqual(result['pagination']);
      expect(lis.filter(s => {
        return s.classes['active'];
      }).map(s => {
        return s.query(By.css('a')).nativeElement.textContent;
      })).toEqual(result['active']);
      if (typeof result['showMore'] !== 'undefined') {
        expect(as.filter(s => s.nativeElement.textContent === '...').map(s => s.nativeElement.href.split(/\?page=(.*)/)[1])).toEqual(result['showMore']);
      }
    });
  }
  // test scenarios
  // - 10 pages, current page = 1, page in between 5 => 1->selected,2,3,4,5,6,...,10,next
  // - 10 pages, current page = 3, page in between 5 => prev,1,2,3->selected,4,5,6,...,10,next
  // - 10 pages, current page = 6, page in between 5 => prev,1,2,3,4,5,6->selected,...,10,next
  // - 10 pages, current page = 7, page in between 5 => prev,1,..,5,6,7->selected,8,9,10,next
  // - 10 pages, current page = 10, page in between 5 => prev,1,..,5,6,7,8,9,10->selected
  // - 1 page, current page = 1, page in between 5 => 1->selected
  // - 6 page, current page = 1, page in between 5 => 1->selected,2,3,4,5,6,next
  // - 5 page, current page = 1, page in between 5 => 1->selected,2,3,4,5,next
  // - 100 page, current page = 10, page in between 5 => prev,1,...,10,11,12,13,14,...,100,next
  // * click show more left should go to page 5
  // * click show more right should go to page 15
  fit('when 10 pages, current page = 1, page in between 5 should show correct result', () => {
    testPage(10, 1, 5, {pagination: ['1', '2', '3', '4', '5', '6', '...', '10', 'Next'], active: ['1']});
  });
  fit('10 pages, current page = 3, page in between 5 should show correct result', () => {
    testPage(10, 3, 5, {pagination: ['Prev', '1', '2', '3', '4', '5', '6', '...', '10', 'Next'], active: ['3']});
  });
  fit('10 pages, current page = 6, page in between 5 should show correct result', () => {
    testPage(10, 6, 5, {pagination: ['Prev', '1', '2', '3', '4', '5', '6', '...', '10', 'Next'], active: ['6']});
  });
  fit('10 pages, current page = 7, page in between 5 should show correct result', () => {
    testPage(10, 7, 5, {pagination: ['Prev', '1', '...', '5', '6', '7', '8', '9', '10', 'Next'], active: ['7']});
  });
  fit('10 pages, current page = 10, page in between 5 should show correct result', () => {
    testPage(10, 10, 5, {pagination: ['Prev', '1', '...', '5', '6', '7', '8', '9', '10'], active: ['10']});
  });
  fit('1 page, current page = 1, page in between 5 should show correct result', () => {
    testPage(1, 1, 5, {pagination: ['1'], active: ['1']});
  });
  fit('6 page, current page = 1, page in between 5 should show correct result', () => {
    testPage(6, 1, 5, {pagination: ['1', '2', '3', '4', '5', '6', 'Next'], active: ['1']});
  });
  fit('5 page, current page = 1, page in between 5 should show correct result', () => {
    testPage(5, 1, 5, {pagination: ['1', '2', '3', '4', '5', 'Next'], active: ['1']});
  });
  fit('100 page, current page = 10, page in between 5 should show correct result', () => {
    testPage(100, 10, 5, {pagination: ['Prev', '1', '...', '10', '11', '12', '13', '14', '...', '100', 'Next'], active: ['10'], showMore: ['5', '15']});
  });
  fit('100 page, current page = 6, page in between 5 should show correct result', () => {
    testPage(100, 6, 5, {pagination: ['Prev', '1', '2', '3', '4', '5', '6', '...', '100', 'Next'], active: ['6'], showMore: ['7']});
  });
  fit('100 page, current page = 100, page in between 5 should show correct result', () => {
    testPage(100, 100, 5, {pagination: ['Prev', '1', '...', '95', '96', '97', '98', '99', '100'], active: ['100'], showMore: ['90']});
  });
});
