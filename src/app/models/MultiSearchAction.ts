import Model from './Model';

export class MultiSearchAction extends Model {
  constructor(options) {
    super();
    this.bind(options, true);
  }
}
