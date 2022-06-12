import React, {ChangeEvent, useState} from "react";

import listPage from "./list-page.module.css";

import {SolutionLayout} from "../../ui/solution-layout/solution-layout";
import {Input} from "../../ui/input/input";
import {Button} from "../../ui/button/button";
import {Circle} from "../../ui/circle/circle";
import {LinkedList} from "../../utils/linked-list-class";
import {TSymbolArray} from "../../../types";
import {getArray, setRenderingTimer} from "../../utils/utils";
import {ArrowIcon} from "../../ui/icons/arrow-icon";
import {ElementStates} from "../../../types/element-states";
import {DELAY_IN_MS} from "../../../constants/delays";

export const ListPage: React.FC = () => {
  const [inputSymbolValue, setInputSymbolValue] = useState<string>('');
  const [inputIndexValue, setIndexSymbolValue] = useState<string>('');

  const [list] = useState<LinkedList<any>>(new LinkedList().append(1).append(2).append(3).append(4));

  const [listItems, setListItems] = useState<TSymbolArray>(getArray(list.toArray()));

  const [isNeedSmallCircleTop, setIsNeedSmallCircleTop] = useState<boolean>(false);
  const [isNeedSmallCircleBottom, setIsNeedSmallCircleBottom] = useState<boolean>(false);
  const [indexToRenderSmallCirclesTop, setIndexToRenderSmallCirclesTop] = useState<number>(0);
  const [indexToRenderSmallCirclesBottom, setIndexToRenderSmallCirclesBottom] = useState<number>(0);

  const changeSymbolStatus = (arr: TSymbolArray, status: ElementStates, index: number, isEmptyCircle?: boolean) => {
    if (status) {
      if (index >= arr.length) {
        return;
      } else {
        arr[index].status = status;
      }
    }
    if (isEmptyCircle) {
      arr[index].symbol = '';
      // setIsSmallCircleRender("bottom");
      // renderSmallCirclesInPosition("bottom", arr[index].symbol);
    }
  }

  const changeSymbolRendering = async (arr: TSymbolArray, status: ElementStates, currIndex: number, isAsync: boolean) => {
    if (isAsync) {
      await setRenderingTimer(DELAY_IN_MS);
    }
    changeSymbolStatus(arr, status, currIndex);
    setListItems([...arr]);
  }

  const changeCircleToEmpty = async (arr: TSymbolArray, index: number, isEmptyCircle: boolean, isAsync: boolean) => {

    changeSymbolStatus(arr, ElementStates.Default, index, isEmptyCircle);

    // renderSmallCirclesInPosition("bottom", arr[index].symbol);
    if (isAsync) {
      await setRenderingTimer(DELAY_IN_MS);
    }
    // renderSmallCirclesInPosition("bottom", arr[index].symbol);
    // await setIsSmallCircleRender("bottom");
    // await setIsSmallCircleRender("bottom");
    // renderSmallCirclesInPosition("bottom", arr[index].symbol);
    setListItems([...arr]);
  }

  const changeEachSymbolRendering = async (arr: TSymbolArray, index: number) => {
    let i = 0;
    while (i <= index && index < arr.length) {
      await changeSymbolRendering(arr, ElementStates.Changing, i, true);
      ++i;
    }
  }

  const changeEachSmallCircleRendering = async (arr: TSymbolArray, index: number) => {
    setIsNeedSmallCircleTop(true);
    let i = 0;
    while (i <= index && index < arr.length) {
      setIndexToRenderSmallCirclesTop(i);
      if (i !== 0) {
        await changeSymbolRendering(arr, ElementStates.Changing, i - 1, false);
      }
      await setRenderingTimer(DELAY_IN_MS);
      i++;
    }
    // await changeSymbolRendering(arr, ElementStates.Default, i, false);
    setIsNeedSmallCircleTop(false);
  }

  // const renderSmallCircle = (arr?: TSymbolArray, index?: number) => {
  //   return (
  //     <>
  //       <Circle state={ElementStates.Changing} symbol={inputSymbolValue}
  //               isSmall={true}/>
  //     </>)
  // }

  const setIsSmallCircleRender = async (position: "top" | "bottom") => {
    if (position === "top") {
      setIsNeedSmallCircleTop(true);
      await setRenderingTimer(DELAY_IN_MS);
      setIsNeedSmallCircleTop(false);
    } else {
      setIsNeedSmallCircleBottom(true);
      await setRenderingTimer(DELAY_IN_MS);
      setIsNeedSmallCircleBottom(false);
    }
  }

  // const renderSmallCirclesInPosition = (position: "top" | "bottom", arr?: TSymbolArray, index?: number) => {
  const renderSmallCirclesInPosition = (position: "top" | "bottom", symbol?: any) => {
    return (
      <>
        {
          position === "top"
            ? <div className={listPage.smallCircleWrapTop}>
              {
                <Circle state={ElementStates.Changing} symbol={inputSymbolValue}
                        isSmall={true}/>
              }
            </div>
            :  position === "bottom" && symbol &&
            <div className={listPage.smallCircleWrapBottom}>
              {
                <Circle state={ElementStates.Changing} symbol={symbol}
                        isSmall={true}/>
              }
            </div>

        }
      </>
    )
  }


  const renderCircles = () => {
    let circlesContainer: Array<any> = [];
    for (let i = 0; i < listItems.length; i++) {
      circlesContainer
        .push(
          <>
            <div className={listPage.circles}>
              {
                isNeedSmallCircleTop && i === indexToRenderSmallCirclesTop &&
                renderSmallCirclesInPosition("top")
              }
              {
                <Circle key={i} state={listItems[i].status} symbol={listItems[i].symbol} index={i}
                />
              }
              {
                isNeedSmallCircleBottom && i === indexToRenderSmallCirclesBottom &&
                renderSmallCirclesInPosition("bottom", listItems[i].symbol)
              }

            </div>
            {
              i !== listItems.length - 1 &&
              <ArrowIcon/>
            }
          </>
        )
    }
    console.log(listItems)
    return circlesContainer;
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={listPage.grid}>
        <Input placeholder="Введите значение" value={inputSymbolValue} maxLength={4} isLimitText={true}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 e.preventDefault();
                 // setIsAddButtonDisabled(false);
                 setInputSymbolValue(e.target.value);
               }}/>
        <Button text="Добавить в head" linkedList="small" onClick={async () => {

          setIndexToRenderSmallCirclesTop(0);
          await setIsSmallCircleRender("top");

          list.prepend(inputSymbolValue);
          await changeSymbolRendering(getArray(list.toArray()), ElementStates.Modified, 0, false)
          await changeSymbolRendering(getArray(list.toArray()), ElementStates.Default, 0, true)
          // setListItems(getArray(list.print()))
          console.log(listItems);
        }}/>
        <Button text="Добавить в tail" linkedList="small" onClick={async () => {

          setIndexToRenderSmallCirclesTop(list.toArray().length - 1);
          await setIsSmallCircleRender("top");

          list.append(inputSymbolValue)
          await changeSymbolRendering(getArray(list.toArray()), ElementStates.Modified, list.toArray().length - 1, false);
          await changeSymbolRendering(getArray(list.toArray()), ElementStates.Default, list.toArray().length - 1, true);

          console.log(listItems);
        }}/>
        <Button text="Удалить из head" linkedList="small" onClick={async () => {

          await changeCircleToEmpty(getArray(list.toArray()), 0, true, false);

          list.deleteHead();
          setIndexToRenderSmallCirclesBottom(0);
          await setIsSmallCircleRender("bottom");
          await changeCircleToEmpty(getArray(list.toArray()), 0, false, false);

          console.log(listItems);
        }}/>
        <Button text="Удалить из tail" linkedList="small" onClick={async () => {
          await changeCircleToEmpty(getArray(list.toArray()), list.toArray().length - 1, true, true);
          list.deleteTail();
          await changeCircleToEmpty(getArray(list.toArray()), list.toArray().length - 1, false, true);

          // setListItems(getArray(list.toArray()))
          console.log(listItems);
        }}/>

        <Input type="number" placeholder="Введите индекс" value={inputIndexValue}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 e.preventDefault();
                 // setIsAddButtonDisabled(false);
                 setIndexSymbolValue(e.target.value);
               }}/>
        <Button extraClass={listPage.bigAddButton} text="Добавить по индексу" linkedList="big" onClick={async () => {
          let index = parseInt(inputIndexValue);

          await changeEachSmallCircleRendering(getArray(list.toArray()), index);
          // await changeEachSymbolRendering(getArray(list.toArray()), index);

          list.addByIndex(inputSymbolValue, parseInt(inputIndexValue));
          setListItems(getArray(list.toArray()))
          await changeSymbolRendering(getArray(list.toArray()), ElementStates.Modified, index, false);
          await changeSymbolRendering(getArray(list.toArray()), ElementStates.Default, index, true);

          console.log(listItems);
        }}/>
        <Button extraClass={listPage.bigDeleteButton} text="Удалить по индексу" linkedList="big" onClick={async () => {
          let index = parseInt(inputIndexValue);
          await changeEachSymbolRendering(getArray(list.toArray()), index);
          await changeCircleToEmpty(getArray(list.toArray()), index, true, true);
          list.deleteByIndex(parseInt(inputIndexValue));

          await changeCircleToEmpty(getArray(list.toArray()), index, false, true);
          // setListItems(getArray(list.toArray()))
          console.log(listItems);
        }}/>
      </div>

      <div className={listPage.circleWrap}>
        {
          listItems &&
          renderCircles()
        }
      </div>
    </SolutionLayout>
  );
};
