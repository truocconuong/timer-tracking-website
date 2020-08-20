import Model from './Model';

class ArrayList<T extends Model> {
  private data: Array<any>;
  private type: any;
  // because T will be erased during compilation so T will be useless, keep it here in case next time it can be treated as real class
  constructor(private _type: any, _data: Array<any>) {
    this.data = _data;
    this.type = _type;
  }
  public getContent() {
    return this.data.map(s => new this.type(s));
  }
  public getName() {
    return this.data.map(s => s.name).join(", ");
  }
  public getId() {
    if (this.data) {
      return this.data.map(s => s.id);
    } else {
      return [];
    }
  }
  public isEmpty() {
    if (this.data) {
      return this.data.length === 0;
    }
    return false;
  }
  // @param sortBy => only take when filter is true
  // @param key => return key of it
  public getFirst(sortBy, key = 'name') {
    if (this.data.length > 0) {
      if (sortBy) {
        let first = this.data.find(s => s[sortBy]);
        return first ? first[key] : '';
      } else {
        return this.data[0][key];
      }
    } else {
      return "";
    }
  }
  public push(_datum: T) {
    this.data.push(new this.type(_datum));
  }
}

export default ArrayList;
