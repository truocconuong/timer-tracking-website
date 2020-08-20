import * as _ from 'lodash';
import { AppInjector } from '../../app-injector';
import { ActivatedRoute } from '@angular/router';

export class QueryParser {
  parse(supportedParams: string[], activatedRoute: ActivatedRoute): object {
    activatedRoute = activatedRoute || AppInjector.get(ActivatedRoute);
    let queryParams = { page: 1 };
    if (_.keys(activatedRoute.snapshot.queryParams).length > 0) {
      queryParams = _.assign(queryParams, activatedRoute.snapshot.queryParams);
    }
    return _.pick(queryParams, supportedParams);
  }

  get(key, activatedRoute: ActivatedRoute): String {
    activatedRoute = activatedRoute || AppInjector.get(ActivatedRoute);
    return activatedRoute.snapshot.params[key];
  }
}
