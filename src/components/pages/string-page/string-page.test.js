import {reverseString} from "../../utils/algorithms";
import {getSymbolArray} from "../../utils/utils";

describe('String reverse', () => {
  it("String reversing is working fine with even number of symbols", async () => {
    // arrange
    const arr = getSymbolArray(['a', 'b']);

    // act
    const result = await reverseString(arr);

    // assert
    expect(result).toEqual(getSymbolArray(['b', 'a']))
  });

  it("String reversing is working fine with uneven number of symbols", async () => {
    // arrange
    const arr = getSymbolArray(['a', 'b', 'c']);

    // act
    const result = await reverseString(arr);

    // assert
    expect(result).toEqual(getSymbolArray(['c', 'b', 'a']))
  });

  it("String reversing is working fine with the single symbol", async () => {
    // arrange
    const arr = getSymbolArray(['a']);

    // act
    const result = await reverseString(arr);

    // assert
    expect(result).toEqual(getSymbolArray(['a']))
  });

  it("String reversing is working fine with the empty string", async () => {
    // arrange
    const arr = []

    // act
    const result = await reverseString(arr);

    // assert
    expect(result).toEqual([])
  });
})