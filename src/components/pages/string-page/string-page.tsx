import React, {ChangeEvent, useState} from "react";

import stringPage from './string-page.module.css';

import {SolutionLayout} from "../../ui/solution-layout/solution-layout";
import {Input} from "../../ui/input/input";
import {Button} from "../../ui/button/button";
import {Circle} from "../../ui/circle/circle";
import {ElementStates} from "../../../types/element-states";
import {TSymbolArray} from "../../../types";
import {reverseString} from "../../utils/algorithms";
import {setRenderingTimer} from "../../utils/utils";

export const StringComponent: React.FC = () => {
  const [letters, setLettersArray] = useState<TSymbolArray>([]);

  // Изменить статус/внешний вид символов:
  const changeSymbolStatus = (arr: TSymbolArray, status: ElementStates, start: number, end?: number) => {
    if (end && start <= end) {
      arr[start].status = status;
      arr[end].status = status;
    }
  }

  // Изменить статус/внешний вид символов с паузой и обновить стейт для рендеринга
  const changeSymbolRendering = async (arr: TSymbolArray, status: ElementStates, startIndex: number, endIndex: number) => {
    changeSymbolStatus(arr, status, startIndex, endIndex );
    setLettersArray([...arr])
    await setRenderingTimer(1000);
  }

  // Хендлер нажатия на кнопку
  const handleStringReverse = () => {
    if (letters[0].status === ElementStates.Modified) {
      setLettersArray(letters.map(letter => {
        letter.status = ElementStates.Default;
        return letter
      }))
    }
    // Собственно, переворот
    reverseString(letters, changeSymbolRendering, ElementStates.Changing, ElementStates.Modified);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={stringPage.inputWrap}>
        <Input maxLength={11} isLimitText onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setLettersArray(e.target.value.split('').map(letter => {
            return {
              symbol: letter,
              status: ElementStates.Default,
            }
          }))
        }}/>
        <Button text="Развернуть" onClick={handleStringReverse}/>
      </div>
      <div className={stringPage.lettersWrap}>
        {
          letters &&
          letters.map((letter, index) =>
            <Circle key={index} state={letter.status} symbol={letter.symbol}/>)
        }
      </div>

    </SolutionLayout>
  );
};
