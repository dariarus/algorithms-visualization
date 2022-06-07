// export const swap = (arr: Array<string>, firstIndex: number, secondIndex: number): void => {
//     const temp = arr[firstIndex];
//     arr[firstIndex] = arr[secondIndex];
//     arr[secondIndex] = temp;
// }
import {TSymbolArray} from "../../types";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";

export const swap = (arr: TSymbolArray, firstIndex: number, secondIndex: number): void => {
  if (firstIndex === secondIndex) {
    return;
  }
  let temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}

export const setRenderingTimer = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getArray = (arr: Array<string | number>) => {
  return arr
    .map(symbol => {
      return {
        symbol: symbol,
        status: ElementStates.Default,
      }
    })
}