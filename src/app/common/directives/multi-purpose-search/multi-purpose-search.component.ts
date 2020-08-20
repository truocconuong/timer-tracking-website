import { Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { MultiSearchAction } from '../../../models/MultiSearchAction';

@Component({
  selector: 'app-multi-purpose-search',
  templateUrl: './multi-purpose-search.component.html',
  styleUrls: ['./multi-purpose-search.component.scss']
})
export class MultiPurposeSearchComponent implements OnInit, OnDestroy {
  navigationSubscription: any;
  public keyword = '';
  @Input() submitText?: String = 'Search';
  @Input() queryParamKey?: any = 'search';
  @Input() placeholder?: String = '';
  @Input() actions?: MultiSearchAction[];
  public current_action;

  constructor(private route: Router, private activatedRoute: ActivatedRoute) {
    if (_.isUndefined(this.navigationSubscription)) {
      this.navigationSubscription = this.route.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          if (!_.isUndefined(this.activatedRoute.snapshot.queryParams[this.getQueryParamKey()])) {
            this.keyword = this.activatedRoute.snapshot.queryParams[this.getQueryParamKey()];
          } else {
            this.keyword = '';
          }
        }
      });
    }
  }

  ngOnInit() {
    if (!_.isUndefined(this.activatedRoute.snapshot.queryParams[this.getQueryParamKey()])) {
      this.keyword = this.activatedRoute.snapshot.queryParams[this.getQueryParamKey()];
    }
    if (!_.isUndefined(this.activatedRoute.snapshot.queryParams.mltsa)) {
      this.current_action = _.find(this.actions, (item: any) => {
        return _.snakeCase(item.getLabel()) === this.activatedRoute.snapshot.queryParams.mltsa;
      });
    }
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  getCurrentAction() {
    if (_.isUndefined(this.current_action)) {
      this.current_action = _.head(this.actions);
    }
    return this.current_action;
  }

  setAction(action) {
    this.current_action = action;
    let url = window.location.pathname;
    let queryParams = this.activatedRoute.snapshot.queryParams;

    _.forEach(this.actions, (item: any) => {
      if (!_.isUndefined(item.queryParamKey)) {
        queryParams = _.omit(queryParams, item.queryParamKey);
      } else {
        queryParams = _.omit(queryParams, this.queryParamKey);
      }
    });

    queryParams = _.assign({}, queryParams, { mltsa: _.snakeCase(action.getLabel()) });
    let params = _.assign({}, this.activatedRoute.snapshot.params, { queryParams });
    this.route.navigate([url], params);
  }

  getQueryParamKey() {
    let key = this.queryParamKey;
    if (!_.isUndefined(this.getCurrentAction()) && !_.isUndefined(this.getCurrentAction().queryParamKey)) {
      key = this.getCurrentAction().queryParamKey;
    }
    return key;
  }

  getPlaceHolder() {
    let placeholder = this.placeholder;
    if (!_.isUndefined(this.getCurrentAction()) && !_.isUndefined(this.getCurrentAction().placeholder)) {
      placeholder = this.getCurrentAction().placeholder;
    }
    return placeholder;
  }

  onSubmit(): void {
    if (!_.isFunction(this.getCurrentAction().handle)) {
      let queryParamKey = this.getQueryParamKey();
      let url = window.location.pathname;
      let queryParams = this.activatedRoute.snapshot.queryParams;

      _.forEach(this.actions, (item: any) => {
        if (!_.isUndefined(item.queryParamKey)) {
          queryParams = _.omit(queryParams, item.queryParamKey);
        } else {
          queryParams = _.omit(queryParams, this.queryParamKey);
        }
      });

      queryParams = _.assign({}, queryParams, { [queryParamKey]: this.keyword });
      let params = _.assign({}, this.activatedRoute.snapshot.params, { queryParams });
      this.route.navigate([url], params);
    } else {
      this.getCurrentAction().handle.apply(null, [this.keyword, this]);
    }
  }
}
