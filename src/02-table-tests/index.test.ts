import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 6, b: 8, action: Action.Subtract, expected: -2 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 25, b: 5, action: Action.Divide, expected: 5 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 6, b: 3, action: 'invalid', expected: null },
  { a: '6', b: 1, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('calculates', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
