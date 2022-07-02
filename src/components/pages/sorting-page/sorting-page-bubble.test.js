import {doBubbleSort} from "../../utils/algorithms";
import {getSymbolArray} from "../../utils/utils";

describe('Bubble sort', () => {
  it("Bubble sort is working fine with empty array, ascending sort", async () => {
    // arrange
    const arr = [];

    // act
    const result = await doBubbleSort('ascending', arr);

    // assert
    expect(result).toEqual([])
  });

  it("Bubble sort is working fine with single symbol array, ascending sort", async () => {
    // arrange
    const arr = getSymbolArray([5]);

    // act
    const result = await doBubbleSort('ascending', arr);

    // assert
    expect(result).toEqual(getSymbolArray([5]))
  });

  it("Bubble sort is working fine with multiple symbols array, ascending sort", async () => {
    // arrange
    const arr = getSymbolArray([18, 4, 7, 13, 78]);

    // act
    const result = await doBubbleSort('ascending', arr);

    // assert
    expect(result).toEqual(getSymbolArray([4, 7, 13, 18, 78]))
  });

  it("Bubble sort is working fine with empty array, descending sort", async () => {
    // arrange
    const arr = [];

    // act
    const result = await doBubbleSort('descending', arr);

    // assert
    expect(result).toEqual([])
  });

  it("Bubble sort is working fine with single symbol array, descending sort", async () => {
    // arrange
    const arr = getSymbolArray([5]);

    // act
    const result = await doBubbleSort('descending', arr);

    // assert
    expect(result).toEqual(getSymbolArray([5]))
  });

  it("Bubble sort is working fine with multiple symbols array, descending sort", async () => {
    // arrange
    const arr = getSymbolArray([18, 4, 7, 13, 78]);

    // act
    const result = await doBubbleSort('descending', arr);

    // assert
    expect(result).toEqual(getSymbolArray([78, 18, 13, 7, 4]))
  });
})