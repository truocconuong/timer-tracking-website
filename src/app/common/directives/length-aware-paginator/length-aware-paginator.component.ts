import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';
import LengthAwarePaginator from '../../../models/LengthAwarePaginator';
import { Exception } from '../../exceptions/exception';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'length-aware-paginator',
  templateUrl: './length-aware-paginator.component.html',
  styleUrls: ['./length-aware-paginator.component.scss']
})
export class LengthAwarePaginatorComponent implements OnInit, OnChanges, OnDestroy {
  navigationSubscription: Subscription;
  router: Router;
  @Input()
  alwaysDisplay?: Boolean;
  @Input()
  paginator: LengthAwarePaginator;
  activeRoute: ActivatedRoute;
  public current_page = 1;
  public pages = [];
  public numberPageInBetween = 5;
  public pagesInBetween = [];
  constructor(router: Router, activeRoute: ActivatedRoute) {
    this.router = router;
    this.activeRoute = activeRoute;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        if (!_.isUndefined(this.activeRoute.snapshot.queryParams.page)) {
          // tslint:disable-next-line:radix
          this.current_page = parseInt(this.activeRoute.snapshot.queryParams.page);
        }
      }
    });
  }
  ngOnInit() {
    if (!_.isUndefined(this.activeRoute.snapshot.queryParams.page)) {
      // tslint:disable-next-line:radix
      this.current_page = parseInt(this.activeRoute.snapshot.queryParams.page);
    }
  }
  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!_.isUndefined(this.paginator)) {
      let pages = [];
      let length = this.paginator.getTotalPages();
      for (let k = 1; k <= length; k++) {
        pages.push(k);
      }
      this.pages = pages;
      let newPagesInBetween = [];
      if (length - 2 > this.numberPageInBetween) {
        if (this.isHideLeftShowMore(this.current_page)) {
          for (let k = 2; k <= this.numberPageInBetween + 1; k++) {
            newPagesInBetween.push(k);
          }
        } else if (this.isHideRightShowMore(this.current_page)) {
          for (let k = length - this.numberPageInBetween; k <= length - 1; k++) {
            newPagesInBetween.push(k);
          }
        } else {
          if (this.pagesInBetween.indexOf(this.current_page) > -1) {
            newPagesInBetween = this.pagesInBetween;
          } else {
            for (let k = this.current_page; k <= this.current_page + this.numberPageInBetween - 1; k++) {
              newPagesInBetween.push(k);
            }
          }
        }
      } else {
        for (let k = 2; k <= length - 1; k++) {
          newPagesInBetween.push(k);
        }
      }
      this.pagesInBetween = newPagesInBetween;
    }
  }

  resolveParams(page, action?) {
    if (!_.isUndefined(action)) {
      if (action === 'prev') {
        let prevPage = page - 1;
        return _.assign({}, this.activeRoute.snapshot.queryParams, { page: prevPage });
      } else if (action === 'next') {
        let nextPage = page + 1;
        return _.assign({}, this.activeRoute.snapshot.queryParams, { page: nextPage });
      } else {
        throw new Exception("only 'prev' or 'next' action are allowed");
      }
    } else {
      return _.assign({}, this.activeRoute.snapshot.queryParams, { page: page });
    }
  }

  getCurrentPage() {
    return this.current_page;
  }

  isCurrentPage(page) {
    return page === this.current_page;
  }

  shouldActivePrev() {
    return this.current_page > 1;
  }

  shouldActiveNext() {
    return this.current_page < this.paginator.getTotalPages();
  }

  getCurrentUrl() {
    let segments = ['/'];
    this.activeRoute.snapshot.pathFromRoot.forEach(item => {
      if (Array.isArray(item.url) && item.url.length > 0) {
        segments = [...segments, ...item.url.map(i => i.path)];
      }
    });
    return segments;
  }

  isHideLeftShowMore(page) {
    if (this.pages.length - 2 < this.numberPageInBetween || page <= this.numberPageInBetween + 1) {
      return true;
    } else {
      return false;
    }
  }

  isHideRightShowMore(page) {
    // if left hide means we know that the left over pages is not more than this.numberPageInBetween
    if (!this.isHideLeftShowMore(page)) {
      if (this.pages.length - 2 < this.numberPageInBetween || page > this.pages.length - this.numberPageInBetween) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.pages.length - 2 < this.numberPageInBetween || page > this.numberPageInBetween + 1) {
        return true;
      } else {
        return false;
      }
    }
  }
}
