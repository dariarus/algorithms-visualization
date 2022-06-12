import React, {ChangeEvent, useCallback, useState} from "react";

import queuePage from "../stack-page/stack-page.module.css";

import {SolutionLayout} from "../../ui/solution-layout/solution-layout";
import {Input} from "../../ui/input/input";
import {Button} from "../../ui/button/button";
import {ElementStates} from "../../../types/element-states";
import {setRenderingTimer} from "../../utils/utils";
import {SHORT_DELAY_IN_MS} from "../../../constants/delays";
import {TSymbol} from "../../../types";
import {Queue} from "../../utils/queue-class";
import {Circle} from "../../ui/circle/circle";

type TQueue = Array<TSymbol | null>

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [queue] = useState<Queue<TSymbol>>(new Queue<TSymbol>(7));
  const [queueContainer, setQueueContainer] = useState<TQueue>(queue.container);

  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState<boolean>(true);
  const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState<boolean>(true);
  const [isCleanButtonDisabled, setIsCleanButtonDisabled] = useState<boolean>(true);

  const changeSymbolStatus = (arr: Array<TSymbol | null>, status: ElementStates, index: number) => {
    if (arr[index] !== null) {
      (arr[index] as TSymbol).status = status;
    }
  }

  const changeSymbolRendering = async (queue: Queue<TSymbol>, status: ElementStates, currIndex: number, isAsync: boolean) => {
    if (isAsync) {
      await setRenderingTimer(SHORT_DELAY_IN_MS);
    }
    changeSymbolStatus(queue.container, status, currIndex);
    setQueueContainer([...queue.container]);
  }

  const renderCircles = useCallback(() => {
    let circlesContainer: Array<any> = [];
    for (let i = 0; i < queueContainer.length; i++) {
      circlesContainer
        .push(queue.head === i && queue.tail === i && queueContainer[i]?.symbol
          ? <Circle key={i} symbol={queueContainer[i]?.symbol}
                    state={queueContainer[i]?.status}
                    index={i} head="head" tail="tail"/>
          : queue.head === i && queueContainer[i]?.symbol
            ? <Circle key={i} symbol={queueContainer[i]?.symbol}
                      state={queueContainer[i]?.status}
                      index={i} head="head"/>
            : queue.tail === i && queueContainer[i]?.symbol
              ? <Circle key={i} symbol={queueContainer[i]?.symbol}
                        state={queueContainer[i]?.status}
                        index={i} tail="tail"/>
              : <Circle key={i} symbol={queueContainer[i]?.symbol}
                        state={queueContainer[i]?.status}
                        index={i}/>
        )
    }
    return circlesContainer;
  }, [queue.head, queue.tail, queueContainer])

  return (
    <SolutionLayout title="Очередь">
      <div className={queuePage.wrapper}>
        <div className={queuePage.inputWrap}>
          <Input placeholder="Введите значение" value={inputValue} maxLength={4} isLimitText={true}
                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
                   e.preventDefault();
                   setIsAddButtonDisabled(false);
                   setInputValue(e.target.value);
                 }}/>
          <Button extraClass={queuePage.button} text="Добавить" disabled={isAddButtonDisabled} onClick={async () => {
            setInputValue('');
            setIsAddButtonDisabled(true);
            setIsDeleteButtonDisabled(false);
            setIsCleanButtonDisabled(false);

            queue.enqueue({
              symbol: inputValue,
              status: ElementStates.Default
            })
            setQueueContainer(queue.container);
            await changeSymbolRendering(queue, ElementStates.Changing, queue.tail, false);
            await changeSymbolRendering(queue, ElementStates.Default, queue.tail, true);
          }}/>
          <Button extraClass={queuePage.button} text="Удалить" disabled={isDeleteButtonDisabled} onClick={async () => {
            await changeSymbolRendering(queue, ElementStates.Changing, queue.head, false);
            await changeSymbolRendering(queue, ElementStates.Default, queue.head, true);

            queue.dequeue();
            setQueueContainer(queue.container);
            if (queue.length === 0) {
              setIsDeleteButtonDisabled(true);
              setIsCleanButtonDisabled(true);
            }
          }}/>
        </div>
        <Button text="Очистить" disabled={isCleanButtonDisabled} onClick={() => {
          queue?.clean();
          setQueueContainer(queue.container);
          setIsDeleteButtonDisabled(true);
          setIsCleanButtonDisabled(true);
        }}/>
      </div>
      <div className={queuePage.circleWrap}>
        {
          queueContainer &&
          renderCircles()
        }
      </div>
    </SolutionLayout>
  );
};
