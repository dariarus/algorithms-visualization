import {doSelectionSort} from "../../utils/algorithms";
import {getSymbolArray} from "../../utils/utils";

describe('Selection sort', () => {
  it("Selection sort is working fine with empty array, ascending sort", async () => {
    // arrange
    const arr = [];

    // act
    const result = await doSelectionSort('ascending', arr);

    // assert
    expect(result).toEqual([])
  });

  it("Selection sort is working fine with single symbol array, ascending sort", async () => {
    // arrange
    const arr = getSymbolArray([5]);

    // act
    const result = await doSelectionSort('ascending', arr);

    // assert
    expect(result).toEqual(getSymbolArray([5]))
  });

  it("Selection sort is working fine with multiple symbols array, ascending sort", async () => {
    // arrange
    const arr = getSymbolArray([18, 4, 7, 13, 78]);

    // act
    const result = await doSelectionSort('ascending', arr);

    // assert
    expect(result).toEqual(getSymbolArray([4, 7, 13, 18, 78]))
  });

  it("Selection sort is working fine with empty array, descending sort", async () => {
    // arrange
    const arr = [];

    // act
    const result = await doSelectionSort('descending', arr);

    // assert
    expect(result).toEqual([])
  });

  it("Selection sort is working fine with single symbol array, descending sort", async () => {
    // arrange
    const arr = getSymbolArray([5]);

    // act
    const result = await doSelectionSort('descending', arr);

    // assert
    expect(result).toEqual(getSymbolArray([5]))
  });

  it("Selection sort is working fine with multiple symbols array, descending sort", async () => {
    // arrange
    const arr = getSymbolArray([18, 4, 7, 13, 78]);

    // act
    const result = await doSelectionSort('descending', arr);

    // assert
    expect(result).toEqual(getSymbolArray([78, 18, 13, 7, 4]))
  });
})