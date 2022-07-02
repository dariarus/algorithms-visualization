import React, {useState} from "react";

import sortingPage from './sorting-page.module.css';

import {SolutionLayout} from "../../ui/solution-layout/solution-layout";
import {RadioInput} from "../../ui/radio-input/radio-input";
import {Button} from "../../ui/button/button";
import {Direction} from "../../../types/direction";
import {
  sortMaxLength,
  sortMaxValue,
  sortMinLength, sortMinValue
} from "../../../constants/random-array";
import {Column} from "../../ui/column/column";
import {ElementStates} from "../../../types/element-states";
import {generateRandomArray, getSymbolArray, setRenderingTimer, swap} from "../../utils/utils";
import {TSymbolArray} from "../../../types";
import {SHORT_DELAY_IN_MS} from "../../../constants/delays";
import {doBubbleSort, doSelectionSort} from "../../utils/algorithms";

export const SortingPage: React.FC = () => {
  const [numbersArray, setNumbersArray] = useState<TSymbolArray>([]);
  const [radioValue, setRadioValue] = useState<string>('selection');

  const [isAscSortButtonDisabled, setIsAscSortButtonDisabled] = useState<boolean>(true);
  const [isDescSortButtonDisabled, setIsDescSortButtonDisabled] = useState<boolean>(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [buttonAscLoaderRender, setButtonAscLoaderRender] = useState<boolean>(false);
  const [buttonDescLoaderRender, setButtonDescLoaderRender] = useState<boolean>(false);

  const changeButtonsToDefault = (typeOfSort: string) => {
    if (typeOfSort === 'ascending') {
      setButtonAscLoaderRender(false);
      setIsDescSortButtonDisabled(false);
    } else {
      setButtonDescLoaderRender(false);
      setIsAscSortButtonDisabled(false);
    }
    setIsButtonDisabled(false);
  }

  // Изменить статус/внешний вид символов:
  const changeSymbolStatus = (arr: TSymbolArray, status: ElementStates, firstIndex: number, secondIndex: number | null) => {
    arr[firstIndex].status = status;
    if (secondIndex !== null) {
      arr[secondIndex].status = status;
    }
  }

  const changeSymbolRendering = async (arr: TSymbolArray, status: ElementStates, currIndex: number, nextIndex: number | null, isAsync: boolean) => {
    if (isAsync) {
      await setRenderingTimer(SHORT_DELAY_IN_MS);
    }
    changeSymbolStatus(arr, status, currIndex, nextIndex);
    setNumbersArray([...arr])
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
            <Button extraClass={sortingPage.button} text="По возрвстанию" sorting={Direction.Ascending}
                    isLoader={buttonAscLoaderRender}
                    disabled={isAscSortButtonDisabled} onClick={() => {
              setButtonAscLoaderRender(true);
              setIsDescSortButtonDisabled(true);
              setIsButtonDisabled(true);
              if (radioValue === "selection") {
                doSelectionSort('ascending', numbersArray,
                  async (symbolStatus, index, isAsync) => {
                    await changeSymbolRendering(numbersArray, symbolStatus, index, null, isAsync);
                  },
                  async (symbolStatus, index, isAsync) => {
                    await changeSymbolRendering(numbersArray, symbolStatus, index, null, isAsync);
                  }).then(() => {
                  changeButtonsToDefault('ascending');
                });
              } else {
                doBubbleSort('ascending', numbersArray,
                  async (symbolStatus, firstIndex, secondIndex, isAsync) => {
                    await changeSymbolRendering(numbersArray, symbolStatus, firstIndex, secondIndex, isAsync);
                  },
                  async (symbolStatus, firstIndex, secondIndex, isAsync) => {
                    await changeSymbolRendering(numbersArray, symbolStatus, firstIndex, secondIndex, isAsync);
                  }).then(() => {
                  changeButtonsToDefault('ascending');
                })
              }
            }}/>
            <Button extraClass={sortingPage.button} text="По убыванию" sorting={Direction.Descending}
                    isLoader={buttonDescLoaderRender}
                    disabled={isDescSortButtonDisabled} onClick={() => {
              setIsAscSortButtonDisabled(true);
              setButtonDescLoaderRender(true);
              setIsButtonDisabled(true);
              if (radioValue === "selection") {
                doSelectionSort('descending', numbersArray,
                  async (symbolStatus, index, isAsync) => {
                    await changeSymbolRendering(numbersArray, symbolStatus, index, null, isAsync);
                  },
                  async (symbolStatus, index, isAsync) => {
                    await changeSymbolRendering(numbersArray, symbolStatus, index, null, isAsync);
                  }).then(() => {
                  changeButtonsToDefault('descending');
                });
              } else {
                doBubbleSort('descending', numbersArray,
                  async (symbolStatus, firstIndex, secondIndex, isAsync) => {
                    await changeSymbolRendering(numbersArray, symbolStatus, firstIndex, secondIndex, isAsync);
                  },
                  async (symbolStatus, firstIndex, secondIndex, isAsync) => {
                    await changeSymbolRendering(numbersArray, symbolStatus, firstIndex, secondIndex, isAsync);
                  }).then(() => {
                  changeButtonsToDefault('descending');
                })
              }
            }}/>
          </div>
        </div>
        <Button extraClass={sortingPage.button} text="Новый массив" disabled={isButtonDisabled} onClick={() => {
          setIsAscSortButtonDisabled(false);
          setIsDescSortButtonDisabled(false);
          let array = generateRandomArray(sortMaxLength, sortMinLength, sortMaxValue, sortMinValue);
          let numArr = getSymbolArray(array);
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