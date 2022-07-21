import {generateRandomArray, getSymbolArray, setRenderingTimer, swap} from "./utils";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";

describe('Utility functions', () => {
  it("Swap function works correctly", () => {
    // arrange
    const arr = getSymbolArray([1, 2, 3, 4, 5]);

    // act
    const result = swap(arr, 1, 3);

    // assert
    expect(result).toEqual(getSymbolArray([1, 4, 3, 2, 5]))
  });

  it("Getting symbol array works correctly", () => {
    // arrange
    const arr = [1, 2, 3, 4, 5];

    // act
    const result = getSymbolArray(arr);

    // assert
    expect(result).toEqual([
      {symbol: 1, status: ElementStates.Default},
      {symbol: 2, status: ElementStates.Default},
      {symbol: 3, status: ElementStates.Default},
      {symbol: 4, status: ElementStates.Default},
      {symbol: 5, status: ElementStates.Default},
    ])
  });

  it("Setting of timer works correctly", async () => {
    // arrange
   // jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    // act
    await setRenderingTimer(DELAY_IN_MS);

    // assert
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), DELAY_IN_MS);
  });

  it("Random array generation function works correctly", () => {
    // arrange
    const maxLength = 8;
    const minLength = 1;
    const maxValue = 10;
    const minValue = 1;

    // act
    const result = generateRandomArray(maxLength, minLength, maxValue, minValue);
    const resultLength = result.length;

    // assert
    expect(resultLength).toBeGreaterThanOrEqual(1);
    expect(resultLength).toBeLessThanOrEqual(8);
    result.forEach(value => {
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(10);
    })
  });
});