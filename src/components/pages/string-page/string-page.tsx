import React, {ChangeEvent, useState} from "react";

import stringPage from './string-page.module.css';

import {SolutionLayout} from "../../ui/solution-layout/solution-layout";
import {Input} from "../../ui/input/input";
import {Button} from "../../ui/button/button";
import {Circle} from "../../ui/circle/circle";
import {ElementStates} from "../../../types/element-states";
import {TSymbolArray} from "../../../types";
import {getArray, setRenderingTimer, swap} from "../../utils/utils";
import {DELAY_IN_MS} from "../../../constants/delays";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [lettersArray, setLettersArray] = useState<TSymbolArray>([]);
  const [buttonLoaderRender, setButtonLoaderRender] = useState<boolean>(false);

  // Изменить статус/внешний вид символов:
  const changeSymbolStatus = (arr: TSymbolArray, status: ElementStates, start: number, end: number) => {
    if (start <= end) {
      arr[start].status = status;
      arr[end].status = status;
    }
  }

  // Изменить статус/внешний вид символов с паузой и обновить стейт для рендеринга
  const changeSymbolRendering = async (arr: TSymbolArray, status: ElementStates, startIndex: number, endIndex: number) => {
    await setRenderingTimer(DELAY_IN_MS);
    changeSymbolStatus(arr, status, startIndex, endIndex);
    setLettersArray([...arr])
  }

  const reverseString = async () => {
    let arr = getArray(inputValue.split(''));
    let start = 0;
    let end = arr.length - 1
    if (!arr) {
      return;
    }
    setLettersArray([...arr]);
    while (start <= end) {
      await changeSymbolRendering(arr, ElementStates.Changing, start, end);
      swap(arr, start, end);
      await changeSymbolRendering(arr, ElementStates.Modified, start, end);
      start++;
      end--;
    }
    setButtonLoaderRender(false);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={stringPage.inputWrap}>
        <Input maxLength={11} isLimitText onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
        }}/>
        <Button extraClass={stringPage.button} text="Развернуть" disabled={inputValue === ''} isLoader={buttonLoaderRender} onClick={() => {
          setButtonLoaderRender(true);
          reverseString();
        }}/>
      </div>
      <div className={stringPage.lettersWrap}>
        {
          lettersArray &&
          lettersArray.map((letter, index) =>
            <Circle key={index} state={letter.status} symbol={letter.symbol}/>)
        }
      </div>
    </SolutionLayout>
  );
};