import {swap} from "./utils";
import {TSymbolArray} from "../../types";
import {ElementStates} from "../../types/element-states";

export const reverseString = async (arr: TSymbolArray, callback: Function,
                                    isChangingStatus: ElementStates, isModifiedStatus: ElementStates) => {
  let start = 0;
  let end = arr.length - 1
  if (!arr) {
    return;
  }
  while (start <= end) {
    if (arr.length === 1) {
      await callback(arr, isChangingStatus, 0, 0);
      await callback(arr, isModifiedStatus, 0, 0);
    }

    await callback(arr, isChangingStatus, start, end);
    swap(arr, start, end);
    await callback(arr, isModifiedStatus, start, end);
    start++;
    end--;
  }
}

export const fib = (n: number): Array<number> => {
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
      console.log(res)
      fibArray.push(res);
      console.log(fibArray)
    }
  }
  return fibArray;
}