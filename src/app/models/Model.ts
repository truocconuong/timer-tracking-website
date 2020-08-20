import * as _ from 'lodash';
import * as moment from 'moment';

export interface ModelInterface {
  _backup(fields: String[]);
  _isChanged(): Boolean;
  getCreated(): moment.Moment;
  getUpdated(): moment.Moment;
}

class Model implements ModelInterface {
  bind(options = {}, keep_function = false) {
    // tslint:disable-next-line:forin
    for (const k in options) {
      let v = options[k];
      if (typeof v === 'function') {
        if (keep_function === true) {
          this[k] = v;
        }
        continue;
      }

      if (v !== null && v !== undefined) {
        if (typeof this[k] === 'function') {
          this[k] = this[k](v);
        } else {
          this[k] = v;
        }
      }
      Object.getOwnPropertyNames(this).forEach(property => {
        if (options[property] === null || options[property] === undefined) {
          delete this[property];
        } else {
          const proto = Object.getPrototypeOf(this);
          // tslint:disable-next-line:prefer-const
          let method = this.camelCase('get_' + property);
          proto[method] = function() {
            return this[property];
          };
        }
      });
    }
  }

  _backup(fields: any[]) {
    let data = _.pick(this, fields);
    (this as any)._origin = { fields, data };
    return this;
  }

  _isChanged(): Boolean {
    let data = _.pick(this, (this as any)._origin.fields);
    return !_.isEqual(data, (this as any)._origin.data);
  }

  getCreated(): moment.Moment {
    let m = moment(this['created_at']);
    return m;
  }

  getUpdated(): moment.Moment {
    let m = moment(this['updated_at']);
    return m;
  }

  camelCase(string): any {
    string = string.toLowerCase();
    string = string.replace(/[^a-z0-9]/g, ' ');
    string = string.replace(/\s{2}/g, '');
    string = string.replace(/\w+/g, function(match) {
      return match.replace(/\b./, item => item.toUpperCase());
    });
    string = string.replace(/\s/g, '');
    string = string.replace(/\b./, item => item.toLowerCase());
    return string;
  }
}

export default Model;
