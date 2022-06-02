import React, {ChangeEvent, useState} from "react";

import fibonacciPage from "./fibonacci-page.module.css";

import {SolutionLayout} from "../../ui/solution-layout/solution-layout";
import {Input} from "../../ui/input/input";
import {Button} from "../../ui/button/button";
import {Circle} from "../../ui/circle/circle";

import {reverseString} from "../../utils/algorithms";
import {fib} from "../../utils/algorithms";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fibNumberArray, setFibNumberArray] = useState<Array<number>>([]);
  let number = parseInt(inputValue, 10);
  let fibRes: Array<number>;

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={fibonacciPage.inputWrap}>
        <Input max={19} isLimitText type="number" maxLength={2} onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value)
        }}/>
        <Button text="Раcсчитать" disabled={number > 19} onClick={() => {
          fibRes = fib(number);
          setFibNumberArray(fibRes);
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
