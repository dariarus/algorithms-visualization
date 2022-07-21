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
  const [queueContainer, setQueueContainer] = useState<TQueue>(queue.elements);

  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState<boolean>(true);
  const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState<boolean>(true);
  const [isCleanButtonDisabled, setIsCleanButtonDisabled] = useState<boolean>(true);

  const changeSymbolStatus = (status: ElementStates, item: TSymbol | null) => {
    if (item !== null) {
      item.status = status;
    }
  }

  const changeSymbolRendering = async (status: ElementStates, item: TSymbol | null, isAsync: boolean) => {
    if (isAsync) {
      await setRenderingTimer(SHORT_DELAY_IN_MS);
    }
    changeSymbolStatus(status, item);
    setQueueContainer([...queue.elements]);
  }

  const renderCircles = useCallback(() => {
    let circlesContainer: Array<any> = [];
    for (let i = 0; i < queueContainer.length; i++) {
      circlesContainer
        .push(queue.head.index === i && queue.tail.index === i && queueContainer[i]?.symbol
          ? <Circle key={i} symbol={queueContainer[i]?.symbol}
                    state={queueContainer[i]?.status}
                    showIndex={true}
                    index={i} head="head" tail="tail"/>
          : queue.head.index === i && queueContainer[i]?.symbol
            ? <Circle key={i} symbol={queueContainer[i]?.symbol}
                      state={queueContainer[i]?.status}
                      showIndex={true}
                      index={i} head="head"/>
            : queue.tail.index === i && queueContainer[i]?.symbol
              ? <Circle key={i} symbol={queueContainer[i]?.symbol}
                        state={queueContainer[i]?.status}
                        showIndex={true}
                        index={i} tail="tail"/>
              : <Circle key={i} symbol={queueContainer[i]?.symbol}
                        state={queueContainer[i]?.status}
                        showIndex={true}
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
            setQueueContainer(queue.elements);
            await changeSymbolRendering(ElementStates.Changing, queue.tail.value, false);
            await changeSymbolRendering(ElementStates.Default, queue.tail.value, true);
          }}/>
          <Button extraClass={queuePage.button} text="Удалить" disabled={isDeleteButtonDisabled} onClick={async () => {
            await changeSymbolRendering(ElementStates.Changing, queue.head.value, false);
            await changeSymbolRendering(ElementStates.Default, queue.head.value, true);

            queue.dequeue();
            setQueueContainer(queue.elements);
            if (queue.length === 0) {
              setIsDeleteButtonDisabled(true);
              setIsCleanButtonDisabled(true);
            }
          }}/>
        </div>
        <Button text="Очистить" disabled={isCleanButtonDisabled} onClick={() => {
          queue?.clean();
          setQueueContainer(queue.elements);
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
