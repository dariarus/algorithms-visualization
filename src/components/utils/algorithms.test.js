import {fib} from "./algorithms";

describe('Fibonacci consistency', () => {
  it("Count of n-th member of Fibonacci consistency works correctly", async () => {
    // arrange
    const n = 5;

    // act
    const result = fib(n);

    // assert
    expect(result).toEqual([1, 1, 2, 3, 5, 8])
  });
});