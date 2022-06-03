// export const swap = (arr: Array<string>, firstIndex: number, secondIndex: number): void => {
//     const temp = arr[firstIndex];
//     arr[firstIndex] = arr[secondIndex];
//     arr[secondIndex] = temp;
// }
import {TSymbolArray} from "../../types";

export const swap = (arr: TSymbolArray, firstIndex: number, secondIndex: number): void => {
  let temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}

export const setRenderingTimer = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// export const partition = (arr: Array<string>, start = 0, end = arr.length - 1): number => {
//   const pivotValue = arr[end];
//
//   let pivotIndex = start;
//
//   for (let i = start; i < end; i++) {
//     if (arr[i] <= pivotValue) {
//       swap(arr, i, pivotIndex);
//       pivotIndex++;
//     }
//   }
//
//   swap(arr, pivotIndex, end);
//
//   return pivotIndex;
// }

// export const generateFibArray = (res: number): Array<number> => {
//   let arr = [];
//   // if (res === 1) {
//   //   arr = [1];
//   // } else
//   if (res !== 1 && res > 2) {
//     arr.push(res);
//   }
//   return arr;
// }