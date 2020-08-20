import * as _ from 'lodash';
import Role from './Role';
import UserBase from './Base/UserBase';

class User extends UserBase {
  constructor(options) {
    super(options);
    (this as any).roles = d => {
      return _.map(d.data, item => new Role(item));
    };
    this.bind(options);
  }

  getName() {
    return (this as any).customer ? (this as any).customer.getFullName() : '';
  }

  getFirstName() {
    return (this as any).customer ? (this as any).customer.getFirstName() : '';
  }

  getLastName() {
    return (this as any).customer ? (this as any).customer.getLastName() : '';
  }

  getGender() {
    return (this as any).customer ? (this as any).customer.getGender() : '';
  }

  getRoleName() {
    if (_.isArray((this as any).roles) && (this as any).roles.length > 0) {
      return _.map((this as any).roles, role => role.getName()).join(',');
    } else {
      return '';
    }
  }

  getMainAddress() {
    return (this as any).customer ? (this as any).customer.getMainAddress() : '';
  }

  getPermissions() {
    if (!_.isArray((this as any).roles)) {
      return [];
    } else {
      let permissions = [];
      _.forEach((this as any).roles, role => {
        permissions = [...permissions, ...(role as any).getAllPermissions()];
      });
      return permissions;
    }
  }

  isRole(role) {
    if (!_.isArray((this as any).roles)) {
      return false;
    } else {
      let isRole = false;
      _.forEach((this as any).roles, item => {
        if (item.getSlug() === role) {
          isRole = true;
        }
      });
      return isRole;
    }
  }

  isSuperAdmin() {
    return this.isRole('superadmin');
  }

  hasOneOf(permissions: String[]) {
    return this.isSuperAdmin() || _.intersection(permissions, this.getPermissions()).length > 0;
  }
}

export default User;
