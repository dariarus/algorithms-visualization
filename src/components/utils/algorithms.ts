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