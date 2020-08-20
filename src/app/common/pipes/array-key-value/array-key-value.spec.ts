import { ArrayKeyValue } from './array-key-value.pipe';

describe('SumByPipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayKeyValue();
    expect(pipe).toBeTruthy();
  });
  fit('tranforms to aray containing key value', () => {
    const pipe = new ArrayKeyValue();
    let transformed = pipe.transform(['abc', 'def'], []);
    expect(transformed).toEqual(jasmine.arrayContaining([
      jasmine.objectContaining({
        key: jasmine.anything(),
        val: jasmine.anything()
      })
    ]));
  });
});
