import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'per-page',
  templateUrl: './per-page.component.html',
  styleUrls: ['./per-page.component.scss']
})
export class PerPageComponent implements OnInit, OnDestroy {
  navigationSubscription: Subscription;
  public limits: Number[] = [10, 20, 100];
  @Input() perPage?: Number = 20;

  constructor(private route: Router, private activatedRoute: ActivatedRoute) {
    this.navigationSubscription = this.route.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        if (!_.isUndefined(this.activatedRoute.snapshot.queryParams.per_page)) {
          // tslint:disable-next-line:radix
          this.perPage = parseInt(this.activatedRoute.snapshot.queryParams.per_page);
          if (!_.includes(this.limits, this.perPage)) {
            this.limits.push(this.perPage);
          } else {
            this.limits = [10, 20, 100];
          }
        }
      }
    });
  }

  ngOnInit() {}
  ngOnDestroy() {
    if (!_.isUndefined(this.navigationSubscription)) {
      this.navigationSubscription.unsubscribe();
    }
  }

  updateLimit() {
    let url = window.location.pathname;
    let queryParams = this.activatedRoute.snapshot.queryParams;
    queryParams = _.assign({}, queryParams, { per_page: this.perPage, page: 1 });
    let params = _.assign({}, this.activatedRoute.snapshot.params, { queryParams });
    this.route.navigate([url], params);
  }
}
