import React, {ChangeEvent, useEffect, useState, Fragment} from "react";

import listPage from "./list-page.module.css";

import {SolutionLayout} from "../../ui/solution-layout/solution-layout";
import {Input} from "../../ui/input/input";
import {Button} from "../../ui/button/button";
import {Circle} from "../../ui/circle/circle";
import {LinkedList} from "../../utils/linked-list-class";
import {TSymbolArray} from "../../../types";
import {generateRandomArray, getSymbolArray, setRenderingTimer} from "../../utils/utils";
import {
  listMaxLength,
  listMaxValue,
  listMinLength, listMinValue
} from "../../../constants/random-array";
import {ArrowIcon} from "../../ui/icons/arrow-icon";
import {ElementStates} from "../../../types/element-states";
import {DELAY_IN_MS} from "../../../constants/delays";

export const ListPage: React.FC = () => {
  const [inputSymbolValue, setInputSymbolValue] = useState<string>('');
  const [inputIndexValue, setIndexSymbolValue] = useState<string>('');

  const [list] = useState<LinkedList<any>>(new LinkedList());
  const [listItems, setListItems] = useState<TSymbolArray>([]);

  const [isNeedSmallCircleTop, setIsNeedSmallCircleTop] = useState<boolean>(false);
  const [isNeedSmallCircleBottom, setIsNeedSmallCircleBottom] = useState<boolean>(false);
  const [indexToRenderSmallCirclesTop, setIndexToRenderSmallCirclesTop] = useState<number>(0);
  const [indexToRenderSmallCirclesBottom, setIndexToRenderSmallCirclesBottom] = useState<number>(0);

  const [symbolFolSmallCircle, setSymbolFolSmallCircle] = useState<any>();

  const [isInputValueDisabled, setIsInputValueDisabled] = useState<boolean>(false);
  const [isInputIndexDisabled, setIsInputIndexDisabled] = useState<boolean>(false);

  const [isAddHeadButtonDisabled, setIsAddHeadButtonDisabled] = useState<boolean>(true);
  const [addHeadButtonLoader, setAddHeadButtonLoader] = useState<boolean>(false);
  const [isAddTailButtonDisabled, setIsAddTailButtonDisabled] = useState<boolean>(true);
  const [addTailButtonLoader, setAddTailButtonLoader] = useState<boolean>(false);

  const [isDeleteHeadButtonDisabled, setIsDeleteHeadButtonDisabled] = useState<boolean>(false);
  const [deleteHeadButtonLoader, setDeleteHeadButtonLoader] = useState<boolean>(false);
  const [isDeleteTailButtonDisabled, setIsDeleteTailButtonDisabled] = useState<boolean>(false);
  const [deleteTailButtonLoader, setDeleteTailButtonLoader] = useState<boolean>(false);

  const [isAddByIndexButtonDisabled, setIsAddByIndexButtonDisabled] = useState<boolean>(true);
  const [addByIndexButtonLoader, setAddByIndexButtonLoader] = useState<boolean>(false);
  const [isDeleteByIndexButtonDisabled, setIsDeleteByIndexButtonDisabled] = useState<boolean>(true);
  const [deleteByIndexButtonLoader, setDeleteByIndexButtonLoader] = useState<boolean>(false);

  useEffect(() => {
    let randomArray = generateRandomArray(listMaxLength, listMinLength, listMaxValue, listMinValue);
    for (let i = 0; i < randomArray.length; i++) {
      list.append(randomArray[i]);
    }
    setListItems(getSymbolArray(randomArray));
  }, [list])

  const changeSymbolStatus = (arr: TSymbolArray, status: ElementStates, index: number) => {
    if (index < 0 || index >= arr.length) {
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
    await renderSmallCircleForDeleteItem(arr, index, isEmptyCircle);
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
                <Circle extraClass={listPage.smallCircles}
                        state={ElementStates.Changing} symbol={inputSymbolValue}
                        isSmall={true}/>
              }
            </div>
            : <div className={listPage.smallCircleWrapBottom}>
              {
                <Circle extraClass={listPage.smallCircles}
                        state={ElementStates.Changing} symbol={symbol}
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
          <Fragment key={i}>
            <div className={listPage.circles}>
              {
                isNeedSmallCircleTop && i === indexToRenderSmallCirclesTop &&
                renderSmallCirclesInPosition("top", i)
              }
              {
                i === 0 && listItems.length === 1
                  ? <Circle state={listItems[i].status} symbol={listItems[i].symbol} showIndex={true} index={i}
                            head="head"
                            tail="tail"/>
                  : i === 0
                    ? <Circle state={listItems[i].status} symbol={listItems[i].symbol} showIndex={true} index={i}
                              head="head"/>
                    : i === listItems.length - 1
                      ? <Circle state={listItems[i].status} symbol={listItems[i].symbol} showIndex={true} index={i}
                                tail="tail"/>
                      : <Circle state={listItems[i].status} symbol={listItems[i].symbol} showIndex={true} index={i}/>
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
          </Fragment>
        )
    }
    return circlesContainer;
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={listPage.grid}>
        <Input placeholder="Введите значение" value={inputSymbolValue} maxLength={4} isLimitText={true}
               disabled={isInputValueDisabled}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 e.preventDefault();
                 setInputSymbolValue(e.target.value);

                 setIsAddHeadButtonDisabled(false);
                 setIsAddTailButtonDisabled(false);
               }}/>

        <Button text="Добавить в head" linkedList="small" isLoader={addHeadButtonLoader}
                disabled={isAddHeadButtonDisabled} onClick={async () => {
          setAddHeadButtonLoader(true);
          setIsInputValueDisabled(true);
          setIsInputIndexDisabled(true);

          setIsAddTailButtonDisabled(true);
          setIsDeleteHeadButtonDisabled(true);
          setIsDeleteTailButtonDisabled(true);
          setIsAddByIndexButtonDisabled(true);
          setIsDeleteByIndexButtonDisabled(true);

          setIndexToRenderSmallCirclesTop(0);
          await setIsSmallCircleRender("top");

          list.prepend(inputSymbolValue);

          await changeSymbolRendering(getSymbolArray(list.toArray()), ElementStates.Modified, 0, false);
          await changeSymbolRendering(getSymbolArray(list.toArray()), ElementStates.Default, 0, true);

          setAddHeadButtonLoader(false);
          setIsInputValueDisabled(false);
          setIsInputIndexDisabled(false);

          setIsAddTailButtonDisabled(false);
          setIsDeleteHeadButtonDisabled(false);
          setIsDeleteTailButtonDisabled(false);
          if (inputIndexValue !== '') {
            setIsAddByIndexButtonDisabled(false);
            setIsDeleteByIndexButtonDisabled(false);
          }
        }}/>

        <Button text="Добавить в tail" linkedList="small" isLoader={addTailButtonLoader}
                disabled={isAddTailButtonDisabled} onClick={async () => {
          setAddTailButtonLoader(true);
          setIsInputValueDisabled(true);
          setIsInputIndexDisabled(true);

          setIsAddHeadButtonDisabled(true);
          setIsDeleteHeadButtonDisabled(true);
          setIsDeleteTailButtonDisabled(true);
          setIsAddByIndexButtonDisabled(true);
          setIsDeleteByIndexButtonDisabled(true);

          setIndexToRenderSmallCirclesTop(list.toArray().length - 1);
          await setIsSmallCircleRender("top");

          list.append(inputSymbolValue);

          await changeSymbolRendering(getSymbolArray(list.toArray()), ElementStates.Modified, list.toArray().length - 1, false);
          await changeSymbolRendering(getSymbolArray(list.toArray()), ElementStates.Default, list.toArray().length - 1, true);

          setAddTailButtonLoader(false);
          setIsInputValueDisabled(false);
          setIsInputIndexDisabled(false);

          setIsAddHeadButtonDisabled(false);
          setIsDeleteHeadButtonDisabled(false);
          setIsDeleteTailButtonDisabled(false);
          if (inputIndexValue !== '') {
            setIsAddByIndexButtonDisabled(false);
            setIsDeleteByIndexButtonDisabled(false);
          }
        }}/>

        <Button text="Удалить из head" linkedList="small" isLoader={deleteHeadButtonLoader}
                disabled={isDeleteHeadButtonDisabled} onClick={async () => {
          setDeleteHeadButtonLoader(true);
          setIsInputValueDisabled(true);
          setIsInputIndexDisabled(true);

          setIsAddHeadButtonDisabled(true);
          setIsAddTailButtonDisabled(true);
          setIsDeleteTailButtonDisabled(true);
          setIsAddByIndexButtonDisabled(true);
          setIsDeleteByIndexButtonDisabled(true);

          setIndexToRenderSmallCirclesBottom(0);
          await changeCircleToEmpty(getSymbolArray(list.toArray()), 0, true, true);

          list.deleteHead();

          setIsNeedSmallCircleBottom(false);
          await changeCircleToEmpty(getSymbolArray(list.toArray()), 0, false, false);

          setDeleteHeadButtonLoader(false);
          setIsInputValueDisabled(false);
          setIsInputIndexDisabled(false);

          setIsAddHeadButtonDisabled(false);
          setIsAddTailButtonDisabled(false);
          setIsDeleteTailButtonDisabled(false);
          if (inputIndexValue !== '') {
            setIsAddByIndexButtonDisabled(false);
            setIsDeleteByIndexButtonDisabled(false);
          }
        }}/>

        <Button text="Удалить из tail" linkedList="small" isLoader={deleteTailButtonLoader}
                disabled={isDeleteTailButtonDisabled} onClick={async () => {
          setDeleteTailButtonLoader(true);
          setIsInputValueDisabled(true);
          setIsInputIndexDisabled(true);

          setIsAddHeadButtonDisabled(true);
          setIsAddTailButtonDisabled(true);
          setIsDeleteHeadButtonDisabled(true);
          setIsAddByIndexButtonDisabled(true);
          setIsDeleteByIndexButtonDisabled(true);

          setIndexToRenderSmallCirclesBottom(list.toArray().length - 1);
          await changeCircleToEmpty(getSymbolArray(list.toArray()), list.toArray().length - 1, true, true);

          list.deleteTail();

          setIsNeedSmallCircleBottom(false);
          await changeCircleToEmpty(getSymbolArray(list.toArray()), list.toArray().length - 1, false, false);

          setDeleteTailButtonLoader(false);
          setIsInputValueDisabled(false);
          setIsInputIndexDisabled(false);

          setIsAddHeadButtonDisabled(false);
          setIsAddTailButtonDisabled(false);
          setIsDeleteHeadButtonDisabled(false);
          if (inputIndexValue !== '') {
            setIsAddByIndexButtonDisabled(false);
            setIsDeleteByIndexButtonDisabled(false);
          }
        }}/>

        <Input type="number" placeholder="Введите индекс" value={inputIndexValue} disabled={isInputIndexDisabled}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 e.preventDefault();
                 setIndexSymbolValue(e.target.value);

                 if (!isInputValueDisabled) {
                   setIsAddByIndexButtonDisabled(false);
                 }
                 setIsDeleteByIndexButtonDisabled(false);
               }}/>

        <Button extraClass={listPage.bigAddButton} text="Добавить по индексу" linkedList="big"
                isLoader={addByIndexButtonLoader}
                disabled={isAddByIndexButtonDisabled || isAddHeadButtonDisabled} onClick={async () => {

          const index = parseInt(inputIndexValue);

          if (index >= 0 && index <= list.toArray().length - 1) {
            setAddByIndexButtonLoader(true);
            setIsInputValueDisabled(true);
            setIsInputIndexDisabled(true);

            setIsAddHeadButtonDisabled(true);
            setIsAddTailButtonDisabled(true);
            setIsDeleteHeadButtonDisabled(true);
            setIsDeleteTailButtonDisabled(true);
            setIsDeleteByIndexButtonDisabled(true);
          }

          await changeEachSmallCircleRendering(getSymbolArray(list.toArray()), index);

          list.addByIndex(inputSymbolValue, parseInt(inputIndexValue));

          await changeSymbolRendering(getSymbolArray(list.toArray()), ElementStates.Modified, index, false);
          await changeSymbolRendering(getSymbolArray(list.toArray()), ElementStates.Default, index, true);

          setAddByIndexButtonLoader(false);
          setIsInputValueDisabled(false);
          setIsInputIndexDisabled(false);

          setIsAddHeadButtonDisabled(false);
          setIsAddTailButtonDisabled(false);
          setIsDeleteHeadButtonDisabled(false);
          setIsDeleteTailButtonDisabled(false);
          setIsDeleteByIndexButtonDisabled(false);
        }}/>

        <Button extraClass={listPage.bigDeleteButton} text="Удалить по индексу" linkedList="big"
                isLoader={deleteByIndexButtonLoader} disabled={isDeleteByIndexButtonDisabled} onClick={async () => {
          const index = parseInt(inputIndexValue);

          if (index >= 0 && index <= list.toArray().length - 1) {
            setDeleteByIndexButtonLoader(true);
            setIsInputValueDisabled(true);
            setIsInputIndexDisabled(true);

            setIsAddHeadButtonDisabled(true);
            setIsAddTailButtonDisabled(true);
            setIsDeleteHeadButtonDisabled(true);
            setIsDeleteTailButtonDisabled(true);
            setIsAddByIndexButtonDisabled(true);
          }

          setIndexToRenderSmallCirclesBottom(index);

          await changeEachSymbolRendering(getSymbolArray(list.toArray()), index);
          await changeCircleToEmpty(getSymbolArray(list.toArray()), index, true, true);

          if (index === 0) {
            list.deleteHead();
          } else {
            list.deleteByIndex(index);
          }

          setIsNeedSmallCircleBottom(false);
          await changeCircleToEmpty(getSymbolArray(list.toArray()), index, false, false);

          setDeleteByIndexButtonLoader(false);
          setIsInputValueDisabled(false);
          setIsInputIndexDisabled(false);

          setIsAddHeadButtonDisabled(false);
          setIsAddTailButtonDisabled(false);
          setIsDeleteHeadButtonDisabled(false);
          setIsDeleteTailButtonDisabled(false);
          setIsAddByIndexButtonDisabled(false);
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
