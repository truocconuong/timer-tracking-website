import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import initSubscriber from 'redux-subscriber';
import { Store } from '../store/store.module';
import { QueryParser } from '../common/util/query-parser';
import { AppInjector } from '../app-injector';

@Component({
  selector: 'app-base-component',
  template: `<h1>Base Component</h1>`
})
export class BaseComponent implements OnDestroy {
  public store;
  public queryParser;
  public payload;
  public unsubscribe;
  public reducer;
  public dispatch: Function;
  public navigationSubscription;

  constructor() {
    this.store = AppInjector.get(Store).getInstance();
    this.queryParser = AppInjector.get(QueryParser);
    this.map(this.mapDispatchToProps(this.store.dispatch));
    let data = this.mapStateToProps(this.store.getState());
    this.map(data);
  }

  init(): void {
    const subscribe = initSubscriber(this.store);
    this.unsubscribe = subscribe(this.reducer, state => {
      this.map(this.mapStateToProps(state));
    });
  }

  map(data) {
    const keys = Object.keys(data);
    _.forEach(keys, key => (this[key] = data[key]));
  }

  mapStateToProps(arg0: any): any {
    throw new Error('Method not implemented.');
  }

  mapDispatchToProps(store: any): any {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy() {
    if (!_.isUndefined(this.navigationSubscription)) {
      this.navigationSubscription.unsubscribe();
    }
    this.unsubscribe();
  }
}
