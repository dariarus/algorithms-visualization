import {TSymbolArray} from "../../types";
import {swap} from "./utils";
import {ElementStates} from "../../types/element-states";

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
    swap(arr, start, end);
    if (afterChange) {
      await afterChange(arr, start, end);
    }
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

export const doSelectionSort = async (typeOfSort: string, arr: TSymbolArray, beforeChange?: (symbolStatus: ElementStates, index: number, isAsync: boolean) => void,
                                      afterChange?: (symbolStatus: ElementStates, index: number, isAsync: boolean) => void) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let currInd = i;
    if (beforeChange) {
      await beforeChange(ElementStates.Changing, currInd, true)
    }
    for (let nextInd = i + 1; nextInd < arr.length; nextInd++) {
      if (beforeChange) {
        await beforeChange(ElementStates.Changing, nextInd, false)
      }
      if (typeOfSort === 'ascending') {
        if (arr[currInd].symbol > arr[nextInd].symbol) {
          currInd = nextInd;
        }
      } else {
        if (arr[currInd].symbol < arr[nextInd].symbol) {
          currInd = nextInd;
        }
      }
      if (afterChange) {
        await afterChange(ElementStates.Default, nextInd, true)
      }
    }
    if (currInd !== i) {
      swap(arr, i, currInd);
      if (afterChange) {
        await afterChange(ElementStates.Default, currInd, false)
      }
    }
    if (afterChange) {
      await afterChange(ElementStates.Modified, i, false)
    }
  }
  if (afterChange) {
    await afterChange(ElementStates.Modified, arr.length - 1, false)
  }
  return arr;
}

export const doBubbleSort = async (typeOfSort: string, arr: TSymbolArray, beforeChange?: (symbolStatus: ElementStates, firstIndex: number,
                                                                                          secondIndex: number | null, isAsync: boolean) => void,
                                   afterChange?: (symbolStatus: ElementStates, firstIndex: number,
                                                  secondIndex: number | null, isAsync: boolean) => void) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (beforeChange) {
        await beforeChange(ElementStates.Changing, j, j + 1, false)
      }
      if (typeOfSort === 'ascending') {
        if (arr[j].symbol > arr[j + 1].symbol) { // сортируем элементы по возрастанию
          swap(arr, j, j + 1);
        }
      } else {
        if (arr[j].symbol < arr[j + 1].symbol) { // сортируем элементы по возрастанию
          swap(arr, j, j + 1);
        }
      }
      if (afterChange) {
        await afterChange(ElementStates.Default, j, j + 1, true);
        await afterChange(ElementStates.Modified, j + 1, null, false)
      }
    }
    if (afterChange) {
      await afterChange(ElementStates.Modified, 0, null, false);
    }
  }
  return arr;
}