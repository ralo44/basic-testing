import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const arrayOne = [1];
  const arrayTwo = [1, 2];
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList(arrayOne);
    expect(linkedList).toStrictEqual({
      value: 1,
      next: { value: null, next: null },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList(arrayTwo);
    expect(linkedList).toMatchSnapshot({
      value: 1,
      next: { value: 2, next: { value: null, next: null } },
    });
  });
});
