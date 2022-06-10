import React, {ChangeEvent, useState} from "react";

import listPage from "./list-page.module.css";

import {SolutionLayout} from "../../ui/solution-layout/solution-layout";
import {Input} from "../../ui/input/input";
import {Button} from "../../ui/button/button";

export const ListPage: React.FC = () => {
  const [inputSymbolValue, setInputSymbolValue] = useState<string>('');
  const [inputIndexValue, setIndexSymbolValue] = useState<string>('');

  return (
    <SolutionLayout title="Связный список">
      <div className={listPage.grid}>
        <Input placeholder="Введите значение" value={inputSymbolValue} maxLength={4} isLimitText={true}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 e.preventDefault();
                 // setIsAddButtonDisabled(false);
                 setInputSymbolValue(e.target.value);
               }}/>
        <Button text="Добавить в head" linkedList="small"/>
        <Button text="Добавить в tail" linkedList="small"/>
        <Button text="Удалить из head" linkedList="small"/>
        <Button text="Удалить из tail" linkedList="small"/>
        <Input placeholder="Введите индекс" value={inputIndexValue} maxLength={4} isLimitText={true}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 e.preventDefault();
                 // setIsAddButtonDisabled(false);
                 setIndexSymbolValue(e.target.value);
               }}/>
        <Button extraClass={listPage.bigAddButton} text="Добавить по индексу" linkedList="big"/>
        <Button extraClass={listPage.bigDeleteButton} text="Удалить по индексу" linkedList="big"/>
      </div>
    </SolutionLayout>
  );
};
