import { Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {
  navigationSubscription: any;
  public keyword = '';

  // @Output() searching: EventEmitter<string> = new EventEmitter<string>();
  @Input() placeHolder: String = 'Search';

  constructor(private route: Router, private activatedRoute: ActivatedRoute) {
    if (_.isUndefined(this.navigationSubscription)) {
      this.navigationSubscription = this.route.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          if (!_.isUndefined(this.activatedRoute.snapshot.queryParams.search)) {
            this.keyword = this.activatedRoute.snapshot.queryParams.search;
          } else {
            this.keyword = '';
          }
        }
      });
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  onSubmit(): void {
    let url = window.location.pathname;
    let queryParams = this.activatedRoute.snapshot.queryParams;
    queryParams = _.assign({}, queryParams, { search: this.keyword });
    let params = _.assign({}, this.activatedRoute.snapshot.params, { queryParams });
    this.route.navigate([url], params);
  }
}
