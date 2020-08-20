import Model from './Model';

class LengthAwarePaginator extends Model {
  getTotalPages(): any {
    throw new Error("Method not implemented.");
  }
  getTotal(): any {
    throw new Error("Method not implemented.");
  }
  constructor(options) {
    super();
    this.bind(options);
  }
}

export default LengthAwarePaginator;
