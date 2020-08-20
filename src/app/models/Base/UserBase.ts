import Model from '../Model';
import * as _ from 'lodash';

interface UserInterface {
  first_name: String;
  last_name: String;
  images: String[];
  roles?: any[];
  hasProfileImage(): Boolean;
  getProfileImage(): String;
  getRoles(): any[];
}

export default class UserBase extends Model implements UserInterface {
  first_name: String;
  last_name: String;
  images: String[];
  roles: any[];
  constructor(options) {
    super();

    this.bind(options);
  }

  getRoles(): any[] {
    if (_.isArray(this.roles) && this.roles.length > 0) {
      return this.roles;
    } else {
      return [];
    }
  }

  displayRoles() {
    return this.getRoles()
      .map(item => item.name)
      .join(',');
  }

  hasProfileImage(): Boolean {
    return !_.isUndefined(_.find(this.images, (item: any) => item.type === 'avatar'));
  }

  getProfileImage(): String {
    if (this.hasProfileImage()) {
      const image = _.find(this.images, (item: any) => item.type === 'avatar');
      return image.url;
    } else {
      return '';
    }
  }

  getFullName() {
    if (this.first_name !== undefined && this.last_name !== undefined) {
      return this.first_name + ' ' + this.last_name;
    } else if (this.first_name !== undefined) {
      return this.first_name;
    } else if (this.last_name !== undefined) {
      return this.last_name;
    } else {
      return '';
    }
  }

  getGenderContent() {
    switch ((this as any).gender) {
      case 'male':
        return 'Nam';
      case 'female':
        return 'Nữ';
    }
  }
}
