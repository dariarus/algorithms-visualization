import React, {ChangeEvent, useState} from "react";

import stackPage from "./stack-page.module.css";

import {SolutionLayout} from "../../ui/solution-layout/solution-layout";
import {Input} from "../../ui/input/input";
import {Button} from "../../ui/button/button";
import {Stack} from "../../utils/stack-class";
import {Circle} from "../../ui/circle/circle";
import {setRenderingTimer} from "../../utils/utils";
import {TSymbol, TSymbolArray} from "../../../types";
import {ElementStates} from "../../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../../constants/delays";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [stack] = useState<Stack<TSymbol>>(new Stack<TSymbol>());
  const [stackContainer, setStackContainer] = useState<TSymbolArray>(stack.container);

  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState<boolean>(true);
  const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState<boolean>(true);
  const [isCleanButtonDisabled, setIsCleanButtonDisabled] = useState<boolean>(true);

  const changeSymbolStatus = (stack: Stack<TSymbol>, status: ElementStates, index: number) => {
    if (stack) {
      stack.container[index].status = status;
    }
  }

  const changeSymbolRendering = async (stack: Stack<TSymbol>, status: ElementStates, currIndex: number, isAsync: boolean) => {
    if (isAsync) {
      await setRenderingTimer(SHORT_DELAY_IN_MS);
    }
    changeSymbolStatus(stack, status, currIndex);
    setStackContainer([...stack.container]);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={stackPage.wrapper}>
        <div className={stackPage.inputWrap}>
          <Input placeholder="Введите значение" value={inputValue} maxLength={4} isLimitText={true}
                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
                   e.preventDefault();
                   setIsAddButtonDisabled(false);
                   setInputValue(e.target.value);
                 }}/>
          <Button extraClass={stackPage.button} text="Добавить" disabled={isAddButtonDisabled} onClick={async () => {
            setInputValue('');
            setIsAddButtonDisabled(true);
            setIsDeleteButtonDisabled(false);
            setIsCleanButtonDisabled(false);
            if (stack) {
              stack.push({
                symbol: inputValue,
                status: ElementStates.Default
              });
              await changeSymbolRendering(stack, ElementStates.Changing, stack.container.length - 1, false);
              await changeSymbolRendering(stack, ElementStates.Default, stack.container.length - 1, true);
            }
          }}/>
          <Button extraClass={stackPage.button} text="Удалить" disabled={isDeleteButtonDisabled} onClick={async () => {
            if (stack) {
              await changeSymbolRendering(stack, ElementStates.Changing, stack.container.length - 1, false);
              await setRenderingTimer(SHORT_DELAY_IN_MS);
              stack?.pop();
              setStackContainer(stack.container);
              if (stack.container.length < 1) {
                setIsDeleteButtonDisabled(true);
                setIsCleanButtonDisabled(true);
              }
            }
          }}/>
        </div>
        <Button text="Очистить" disabled={isCleanButtonDisabled} onClick={() => {
          stack?.clean();
          setStackContainer(stack.container);
          setIsDeleteButtonDisabled(true);
          setIsCleanButtonDisabled(true);
        }}/>
      </div>
      <div className={stackPage.circleWrap}>
        {
          stack && stackContainer.map((item, index) =>
            index === stackContainer.length - 1
              ? <Circle key={`circle-top: ${index}`} state={item.status} symbol={item.symbol} index={index} head="top"/>
              : <Circle key={`circle: ${index}`} state={item.status} symbol={item.symbol} index={index}/>
          )
        }
      </div>
    </SolutionLayout>
  );
};
