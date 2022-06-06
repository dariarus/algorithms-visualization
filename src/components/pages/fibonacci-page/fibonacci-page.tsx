import React, {ChangeEvent, useState} from "react";

import fibonacciPage from "./fibonacci-page.module.css";

import {SolutionLayout} from "../../ui/solution-layout/solution-layout";
import {Input} from "../../ui/input/input";
import {Button} from "../../ui/button/button";
import {Circle} from "../../ui/circle/circle";

import {fib} from "../../utils/algorithms";
import {TSymbolArray} from "../../../types";
import {ElementStates} from "../../../types/element-states";
import {setRenderingTimer} from "../../utils/utils";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fibNumberArray, setFibNumberArray] = useState<Array<number>>([]);
  const [buttonLoaderRender, setButtonLoaderRender] = useState<boolean>(false);

  let number = parseInt(inputValue, 10);


  // Изменить статус/внешний вид символов с паузой и обновить стейт для рендеринга
  const changeFibRendering = async () => {
    setFibNumberArray([]);
    let fibArray = fib(number);
    for (let i = 0; i < fibArray.length; i++) {
      await setRenderingTimer(1000);
      setFibNumberArray(fibArray.slice(0, i + 1));
    }
    setButtonLoaderRender(false);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={fibonacciPage.inputWrap}>
        <Input max={19} isLimitText type="number" maxLength={2} onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
          if (e.target.value === '') {
            setFibNumberArray([]);
          }
        }}/>
        <Button text="Раcсчитать" disabled={!number || number > 19} isLoader={buttonLoaderRender} onClick={() => {
          setButtonLoaderRender(true);
          changeFibRendering();
        }}/>
      </div>
      <div className={fibonacciPage.numbersWrap}>
        {
          fibNumberArray !== [] &&
          (fibNumberArray.map((number, index) =>
            <Circle key={index} symbol={number} index={index}/>))
        }
      </div>
    </SolutionLayout>
  );
};
