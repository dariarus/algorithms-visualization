import {Node} from "../../types";

// export const reverseString = (arr: Array<string>, start = 0, end = arr.length - 1): Array<string> | null => {
//   if (end <= start) {
//     return arr;
//   }
//   if (arr.length <= 1) {
//     return null;
//   }
//   let pivotIndex: number = partition(arr, start, end);
//   console.log(arr);
//   reverseString(arr, start, pivotIndex - 1);
//   reverseString(arr, pivotIndex + 1, end);
//
//   return arr;
// }

export const reverseString = (head: Node | null): Node | null => {

  let curr = head;
  let prev = null;

  while (curr) {
    let tmp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = tmp;
  }
  return prev;
};

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