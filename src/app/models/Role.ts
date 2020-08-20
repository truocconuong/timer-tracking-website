import Model from './Model';
import * as _ from 'lodash';
import Permission from './Permission';

class Role extends Model {
  constructor(options) {
    super();
    (this as any).permissions = d => {
      return _.map(d.data, item => new Permission(item));
    };
    this.bind(options);
  }

  getAllPermissions() {
    if (!_.isArray((this as any).permissions)) {
      return [];
    } else {
      return _.map((this as any).permissions, item => item.slug);
    }
  }
}

export default Role;
