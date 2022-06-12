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

    const [symbolFolSmallCircle, setSymbolFolSmallCircle] = useState<any>()

    const changeSymbolStatus = (arr: TSymbolArray, status: ElementStates, index: number, isEmptyCircle?: boolean) => {
      if (index >= arr.length) {
        return;
      }
      if (status) {
        arr[index].status = status;
      }
    }

    const renderSmallCircleForDeleteItem = async (arr: TSymbolArray, index: number, isEmptyCircle: boolean) => {
      if (isEmptyCircle) {
        setIsNeedSmallCircleBottom(true);
        setSymbolFolSmallCircle(arr[index].symbol);
        arr[index].symbol = '';
        setListItems([...arr]);
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
      await renderSmallCircleForDeleteItem(arr, index, isEmptyCircle)

      if (isAsync) {
        await setRenderingTimer(DELAY_IN_MS);
      }
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
      setIsNeedSmallCircleTop(false);
    }

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

    const renderSmallCirclesInPosition = (position: "top" | "bottom", keyInd: number, symbol?: any) => {
      return (
        <>
          {
            position === "top"
              ? <div className={listPage.smallCircleWrapTop}>
                {
                  <Circle key={`smallCircleTop: ${keyInd}`} state={ElementStates.Changing} symbol={inputSymbolValue}
                          isSmall={true}/>
                }
              </div>
              : <div className={listPage.smallCircleWrapBottom}>
                {
                  <Circle key={`smallCircleBottom: ${keyInd}`} state={ElementStates.Changing} symbol={symbol}
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
                  renderSmallCirclesInPosition("top", i)
                }
                {
                  <Circle key={i} state={listItems[i].status} symbol={listItems[i].symbol} index={i}
                  />
                }
                {
                  isNeedSmallCircleBottom && i === indexToRenderSmallCirclesBottom &&
                  renderSmallCirclesInPosition("bottom", i, symbolFolSmallCircle)
                }

              </div>
              {
                i !== listItems.length - 1 &&
                <ArrowIcon/>
              }
            </>
          )
      }
      return circlesContainer;
    }

    return (
      <SolutionLayout title="Связный список">
        <div className={listPage.grid}>
          <Input placeholder="Введите значение" value={inputSymbolValue} maxLength={4} isLimitText={true}
                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
                   e.preventDefault();
                   setInputSymbolValue(e.target.value);
                 }}/>

          <Button text="Добавить в head" linkedList="small" onClick={async () => {
            setIndexToRenderSmallCirclesTop(0);
            await setIsSmallCircleRender("top");

            list.prepend(inputSymbolValue);

            await changeSymbolRendering(getArray(list.toArray()), ElementStates.Modified, 0, false)
            await changeSymbolRendering(getArray(list.toArray()), ElementStates.Default, 0, true)
          }}/>

          <Button text="Добавить в tail" linkedList="small" onClick={async () => {
            setIndexToRenderSmallCirclesTop(list.toArray().length - 1);
            await setIsSmallCircleRender("top");

            list.append(inputSymbolValue);

            await changeSymbolRendering(getArray(list.toArray()), ElementStates.Modified, list.toArray().length - 1, false);
            await changeSymbolRendering(getArray(list.toArray()), ElementStates.Default, list.toArray().length - 1, true);
          }}/>

          <Button text="Удалить из head" linkedList="small" onClick={async () => {
            setIndexToRenderSmallCirclesBottom(0);
            await changeCircleToEmpty(getArray(list.toArray()), 0, true, true);

            list.deleteHead();

            setIsNeedSmallCircleBottom(false);
            await changeCircleToEmpty(getArray(list.toArray()), 0, false, false);
          }}/>

          <Button text="Удалить из tail" linkedList="small" onClick={async () => {
            setIndexToRenderSmallCirclesBottom(list.toArray().length - 1);
            await changeCircleToEmpty(getArray(list.toArray()), list.toArray().length - 1, true, true);

            list.deleteTail();

            setIsNeedSmallCircleBottom(false);
            await changeCircleToEmpty(getArray(list.toArray()), list.toArray().length - 1, false, false);
          }}/>

          <Input type="number" placeholder="Введите индекс" value={inputIndexValue}
                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
                   e.preventDefault();
                   setIndexSymbolValue(e.target.value);
                 }}/>

          <Button extraClass={listPage.bigAddButton} text="Добавить по индексу" linkedList="big" onClick={async () => {
            let index = parseInt(inputIndexValue);

            await changeEachSmallCircleRendering(getArray(list.toArray()), index);

            list.addByIndex(inputSymbolValue, parseInt(inputIndexValue));

            setListItems(getArray(list.toArray()))
            await changeSymbolRendering(getArray(list.toArray()), ElementStates.Modified, index, false);
            await changeSymbolRendering(getArray(list.toArray()), ElementStates.Default, index, true);
          }}/>

          <Button extraClass={listPage.bigDeleteButton} text="Удалить по индексу" linkedList="big" onClick={async () => {
            let index = parseInt(inputIndexValue);

            setIndexToRenderSmallCirclesBottom(index);

            await changeEachSymbolRendering(getArray(list.toArray()), index);
            await changeCircleToEmpty(getArray(list.toArray()), index, true, true);

            list.deleteByIndex(parseInt(inputIndexValue));

            setIsNeedSmallCircleBottom(false);
            await changeCircleToEmpty(getArray(list.toArray()), index, false, false);
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
  }
;
