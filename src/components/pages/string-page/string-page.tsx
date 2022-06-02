import React, {ChangeEvent, useState} from "react";

import stringPage from './string-page.module.css';

import {SolutionLayout} from "../../ui/solution-layout/solution-layout";
import {Input} from "../../ui/input/input";
import {Button} from "../../ui/button/button";
import {Circle} from "../../ui/circle/circle";
import {reverseString} from "../../utils/algorithms";

import {Node} from "../../../types";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  let letters = inputValue.split('');
  let lettersList: Node | null;

  const changeArrayToLinkedList = (arr: Array<string>): Node | null => {
    let head: Node | null = null;
    arr.reduce((acc: Node | null, curr) => {
        if (acc == null) {
          acc = new Node(curr);
          head = acc; // замыкание, чтобы не потерять head
        } else {
          let currentNode = new Node(curr);
          acc.next = currentNode;
          acc = currentNode;
        }
        return acc;
      }, null
    );

    return head;
  }

  lettersList = changeArrayToLinkedList(letters);
  console.log(lettersList)

  return (
    <SolutionLayout title="Строка">
      <div className={stringPage.inputWrap}>
        <Input maxLength={11} isLimitText onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value)
        }}/>
        <Button text="Развернуть" onClick={() => {
          reverseString(changeArrayToLinkedList(letters));
          console.log(reverseString(changeArrayToLinkedList(letters)))
        }}/>
      </div>
      <div className={stringPage.lettersWrap}>
        {
          inputValue !== '' &&
          (letters.map((letter, index) =>
            <Circle key={index} symbol={letter}/>))
        }
      </div>

    </SolutionLayout>
  );
};
