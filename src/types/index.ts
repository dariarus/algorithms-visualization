import {ElementStates} from "./element-states";

export class Node<T = string> {
  value: T
  next: Node<T> | null;

  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

export type TSymbolArray = Array<{
  symbol: string | number,
  status: ElementStates
}>