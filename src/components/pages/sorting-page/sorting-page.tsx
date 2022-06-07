import React, {useState} from "react";

import sortingPage from './sorting-page.module.css';

import {SolutionLayout} from "../../ui/solution-layout/solution-layout";
import {RadioInput} from "../../ui/radio-input/radio-input";
import {Button} from "../../ui/button/button";
import {Direction} from "../../../types/direction";
import {maxLength, maxValue, minLength, minValue} from "../../../constants/random-array";
import {Column} from "../../ui/column/column";
import {ElementStates} from "../../../types/element-states";
import {getArray, setRenderingTimer, swap} from "../../utils/utils";
import {TSymbolArray} from "../../../types";
import {SHORT_DELAY_IN_MS} from "../../../constants/delays";

export const SortingPage: React.FC = () => {
  const [numbersArray, setNumbersArray] = useState<TSymbolArray>([]);
  const [radioValue, setRadioValue] = useState<string>('selection');
  // const [sortType, setSortType] = useState<'ascending' | 'descending'>('descending');

  const [isAscSortButtonDisabled, setIsAscSortButtonDisabled] = useState<boolean>(true);
  const [isDescSortButtonDisabled, setIsDescSortButtonDisabled] = useState<boolean>(true);
  const [buttonLoaderRender, setButtonLoaderRender] = useState<boolean>(false);
  const [buttonAscLoaderRender, setButtonAscLoaderRender] = useState<boolean>(false);
  const [buttonDescLoaderRender, setButtonDescLoaderRender] = useState<boolean>(false);

  const generateRandomArray = () => {
    const randomArrayLength = Math.random() * (maxLength - minLength) + minLength;
    return Array.from({length: randomArrayLength}).map(x => Math.floor(Math.random() * (maxValue - minValue) + minValue))
  }

  // Изменить статус/внешний вид символов:
  const changeSymbolStatus = (arr: TSymbolArray, status: ElementStates, index: number) => {
    arr[index].status = status;
  }

  const changeSymbolRendering = (arr: TSymbolArray, status: ElementStates, currIndex: number) => {
    changeSymbolStatus(arr, status, currIndex);
    setNumbersArray([...arr])
  }

  const changeSymbolRenderingAsync = async (arr: TSymbolArray, status: ElementStates, currIndex: number) => {
    await setRenderingTimer(SHORT_DELAY_IN_MS);
    changeSymbolRendering(arr, status, currIndex);
  }

  const doSelectionSort = async (typeOfSort: string) => {
    for (let i = 0; i < numbersArray.length - 1; i++) {
      let currInd = i;
      await changeSymbolRenderingAsync(numbersArray, ElementStates.Changing, currInd);
      for (let nextInd = i + 1; nextInd < numbersArray.length; nextInd++) {
        await changeSymbolRenderingAsync(numbersArray, ElementStates.Changing, nextInd);
        if (typeOfSort === 'ascending') {
          if (numbersArray[currInd].symbol > numbersArray[nextInd].symbol) {
            currInd = nextInd;
          }
        } else {
          if (numbersArray[currInd].symbol < numbersArray[nextInd].symbol) {
            currInd = nextInd;
          }
        }
        await changeSymbolRenderingAsync(numbersArray, ElementStates.Default, nextInd);
      }
      if (currInd !== i) {
        swap(numbersArray, i, currInd);
        changeSymbolRendering(numbersArray, ElementStates.Default, currInd);
      }
      changeSymbolRendering(numbersArray, ElementStates.Modified, i);
    }
    changeSymbolRendering(numbersArray, ElementStates.Modified, numbersArray.length - 1);
    if (typeOfSort === 'ascending') {
      setButtonAscLoaderRender(false);
      setIsDescSortButtonDisabled(false);
    } else {
      setButtonDescLoaderRender(false);
      setIsAscSortButtonDisabled(false);
    }
    setButtonLoaderRender(false);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortingPage.wrapper}>
        <div className={sortingPage.buttonsWrapper}>
          <div className={sortingPage.radioWrapper}>
            <RadioInput name="sort" value="selection" label="Выбор" defaultChecked onClick={() => {
              setRadioValue("selection");
            }}/>
            <RadioInput name="sort" value="bubble" label="Пузырёк" onClick={() => {
              setRadioValue("bubble");
            }}/>
          </div>
          <div className={sortingPage.buttonsSortWrapper}>
            <Button text="По возрвстанию" sorting={Direction.Ascending} isLoader={buttonAscLoaderRender}
                    disabled={isAscSortButtonDisabled} onClick={() => {
              setButtonAscLoaderRender(true);
              setIsDescSortButtonDisabled(true);
              setButtonLoaderRender(true);
              if (radioValue === "selection") {
                doSelectionSort('ascending');
              }
            }}/>
            <Button text="По убыванию" sorting={Direction.Descending} isLoader={buttonDescLoaderRender}
                    disabled={isDescSortButtonDisabled} onClick={() => {
              setIsAscSortButtonDisabled(true);
              setButtonDescLoaderRender(true);
              setButtonLoaderRender(true);
              if (radioValue === "selection") {
                doSelectionSort('descending');
              }
            }}/>
          </div>
        </div>
        <Button text="Новый массив" isLoader={buttonLoaderRender} onClick={() => {
          setIsAscSortButtonDisabled(false);
          setIsDescSortButtonDisabled(false);
          let array = generateRandomArray();
          let numArr = getArray(array);
          setNumbersArray(numArr);
        }}/>
      </div>
      <div className={sortingPage.columns}>
        {
          numbersArray && numbersArray.map((item, index) =>
            <Column key={index} index={item.symbol as number} state={item.status}/>
          )
        }
      </div>
    </SolutionLayout>
  );
};
