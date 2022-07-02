import {TSymbolArray} from "../../types";
import {swap} from "./utils";

export const reverseString = async (arr: TSymbolArray, beforeChange?: (arr: TSymbolArray, start: number, end: number) => void,
                                    afterChange?: (arr: TSymbolArray, start: number, end: number) => void) => {
  let start = 0;
  let end = arr.length - 1
  if (!arr) {
    return;
  }
  while (start <= end) {
    if (beforeChange) {
      await beforeChange(arr, start, end);
    }
    //await changeSymbolRendering(arr, ElementStates.Changing, start, end);
    swap(arr, start, end);
    if (afterChange) {
      await afterChange(arr, start, end);
    }
    //  await changeSymbolRendering(arr, ElementStates.Modified, start, end);
    start++;
    end--;
  }
  return arr;
}

export const fib = (n: number) => {
  let curr = 1;
  let next = 1;
  let res = 0;
  let fibArray: Array<number> = [];

  if (n === 0) {
    fibArray = [1];
  } else if (n < 2) {
    fibArray = [1, 1];
  } else {
    fibArray.push(1, 1);
    for (let k = 2; k <= n; k++) {
      res = curr + next;
      curr = next;
      next = res;
      fibArray.push(res);
    }
  }
  return fibArray;
}