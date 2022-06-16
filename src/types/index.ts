import {ElementStates} from "./element-states";

export class Node<T = string> {
  value: T
  next: Node<T> | null;

  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

export type TSymbol = {
  symbol: string | number,
  status: ElementStates
}

export type TSymbolArray = Array<TSymbol>

export type TPropsInputStackQueue = {
  handlerAdd: () => void,
  handlerDelete: () => void,
  handlerClean: () => void
}