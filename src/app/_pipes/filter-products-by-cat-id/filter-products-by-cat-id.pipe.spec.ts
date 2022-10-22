import { FilterProductsByCatIdPipe } from './filter-products-by-cat-id.pipe';

describe('FilterProductsByCatIdPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterProductsByCatIdPipe();
    expect(pipe).toBeTruthy();
  });
});
