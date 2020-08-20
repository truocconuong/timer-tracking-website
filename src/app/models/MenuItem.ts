import Model from './Model';
import * as _ from 'lodash';

class Item extends Model {
  constructor(options) {
    super();

    this.bind(options);
  }
}

class SubMenuItem extends Item {
  getPermissions() {
    if (!_.isArray((this as any).permissions)) {
      return [];
    } else {
      return (this as any).permissions;
    }
  }
}

class MenuItem extends Item {
  constructor(options) {
    super(options);
    (this as any).children = d => {
      return _.map(d, item => new SubMenuItem(item));
    };
    this.bind(options);
  }

  getPermissions() {
    let permissions = [];
    if (_.isArray((this as any).parent_permissions)) {
      permissions = (this as any).parent_permissions;
    }
    if (_.isArray((this as any).children)) {
      _.forEach((this as any).children, item => {
        if (_.isArray(item.permissions)) {
          permissions = [...permissions, ...item.permissions];
        }
      });
    }
    return permissions;
  }
}

export default MenuItem;
