import { ConvertToTree } from './convert-to-tree.pipe';
const data = [
  {
    id: 1,
    name: "women",
    parent_id: 0
  },
  {
    id: 2,
    name: "bag",
    parent_id: 1
  },
  {
    id: 3,
    name: "cloth",
    parent_id: 1
  },
  {
    id: 4,
    name: "dress",
    parent_id: 3
  },
  {
    id: 5,
    name: "shoulder bag",
    parent_id: 2
  }
];
describe('ConvertToTree', () => {
  it('create an instance', () => {
    const pipe = new ConvertToTree();
    expect(pipe).toBeTruthy();
  });
  fit('can transform array to tree', () => {
    const pipe = new ConvertToTree();
    let transformed = pipe.transform(data, []);
    expect(transformed).toEqual(jasmine.arrayContaining([
      jasmine.objectContaining({
        id: 1,
        name: "women",
        children: jasmine.arrayContaining([
          jasmine.objectContaining({
            id: 3,
            name: "cloth",
            children: jasmine.arrayContaining([
              jasmine.objectContaining({
                id: 4,
                name: "dress",
                children: jasmine.anything()
              })
            ])
          }),
          jasmine.objectContaining({
            id: 2,
            name: "bag",
            children: jasmine.arrayContaining([
              jasmine.objectContaining({
                id: 5,
                name: "shoulder bag",
                children: jasmine.anything()
              })
            ])
          })
        ])
      })
    ]));
  });
});
