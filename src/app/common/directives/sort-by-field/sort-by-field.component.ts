import { ActivatedRoute, Router, NavigationExtras, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';

const ASC = 'asc';
const DESC = 'desc';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sort-by-field',
  templateUrl: './sort-by-field.component.html',
  styleUrls: ['./sort-by-field.component.scss']
})
export class SortByFieldComponent implements OnInit, OnDestroy {
  navigationSubscription: Subscription;
  activatedRoute: ActivatedRoute;
  route: Router;
  @Input() field: String;
  @Input() allowMulti?: Boolean = false;
  @Input() default?: String;
  @Input() options?: NavigationExtras;
  @Input() callback?: Function;

  public direction: String;

  constructor(route: Router, activatedRoute: ActivatedRoute) {
    this.route = route;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {
    if (!_.isUndefined(this.default)) {
      if (this.default.toLowerCase() === 'asc') {
        this.direction = ASC;
      }
      if (this.default.toLowerCase() === 'desc') {
        this.direction = DESC;
      }
    }
    if (!_.isUndefined(this.activatedRoute.snapshot.queryParams.sort)) {
      let fields = this.activatedRoute.snapshot.queryParams.sort.split(',');
      if (_.includes(fields, this.field) || _.includes(fields, `+${this.field}`)) {
        this.direction = ASC;
      } else if (_.includes(fields, `-${this.field}`)) {
        this.direction = DESC;
      }
    }

    this.navigationSubscription = this.route.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        if (!_.isUndefined(this.default)) {
          if (this.default.toLowerCase() === 'asc') {
            this.direction = ASC;
          }
          if (this.default.toLowerCase() === 'desc') {
            this.direction = DESC;
          }
        }
        if (!_.isUndefined(this.activatedRoute.snapshot.queryParams.sort)) {
          let fields = this.activatedRoute.snapshot.queryParams.sort.split(',');
          if (_.includes(fields, this.field) || _.includes(fields, `+${this.field}`)) {
            this.direction = ASC;
          } else if (_.includes(fields, `-${this.field}`)) {
            this.direction = DESC;
          } else {
            // tslint:disable-next-line:no-unused-expression
            this.direction = undefined;
          }
        } else {
          // tslint:disable-next-line:no-unused-expression
          this.direction = undefined;
        }
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  getDirection() {
    return this.direction;
  }

  getRouterDirection() {
    if (this.direction === ASC) {
      return '';
    } else if (this.direction === DESC) {
      return '-';
    } else {
      return undefined;
    }
  }
  sort() {
    if (this.direction === ASC) {
      this.direction = DESC;
    } else if (this.direction === DESC) {
      this.direction = undefined;
    } else {
      this.direction = ASC;
    }
    let url = this.activatedRoute.snapshot.url;
    let queryParams = this.activatedRoute.snapshot.queryParams;
    let fields = [];
    if (this.allowMulti === true) {
      if (!_.isUndefined(queryParams.sort)) {
        fields = queryParams.sort.split(',');
        if (_.includes(fields, this.field) || _.includes(fields, `+${this.field}`) || _.includes(fields, `-${this.field}`)) {
          if (this.getRouterDirection() === undefined) {
            _.remove(fields, item => item === this.field || item === `+${this.field}` || item === `-${this.field}`);
          } else {
            fields = _.map(fields, item => {
              if (item === this.field || item === `+${this.field}` || item === `-${this.field}`) {
                item = `${this.getRouterDirection()}${this.field}`;
              }
              return item;
            });
          }
        } else {
          if (this.getRouterDirection() !== undefined) {
            fields.push(`${this.getRouterDirection()}${this.field}`);
          }
        }
      } else {
        if (this.getRouterDirection() !== undefined) {
          fields.push(`${this.getRouterDirection()}${this.field}`);
        }
      }
    } else {
      if (this.getRouterDirection() !== undefined) {
        fields.push(`${this.getRouterDirection()}${this.field}`);
      }
    }
    _.remove(fields, item => _.isNil(item) || item === '');
    let extras = { queryParams: { sort: fields.join(','), page: 1 } };
    if (!_.isUndefined(this.options)) {
      extras = _.assign(this.options, extras);
    }
    if (_.isUndefined(this.callback)) {
      this.route.navigate([document.location.pathname], _.assign(extras, { queryParamsHandling: 'merge' }));
    } else {
      this.callback(this.field, this.direction, extras);
    }
  }
}
