import {TSymbolArray} from "../../types";
import {ElementStates} from "../../types/element-states";

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

export const generateRandomArray = (maxLength: number, minLength: number, maxValue: number, minValue: number) => {
  const randomArrayLength = Math.random() * (maxLength - minLength) + minLength;
  return Array.from({length: randomArrayLength}).map(x => Math.floor(Math.random() * (maxValue - minValue) + minValue))
}