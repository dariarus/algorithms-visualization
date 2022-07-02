import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './button';

describe('Button Component', () => {
  it('Button has text', () => {
    const tree = renderer
      .create(<Button text="Кнопка с текстом" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Button has no text', () => {
    const tree = renderer
      .create(<Button />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Button is disabled', () => {
    const tree = renderer
      .create(<Button disabled={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Button has loader', () => {
    const tree = renderer
      .create(<Button isLoader={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Button click is working correctly', () => {
    window.alert = jest.fn();

    // Рендерим компонент
    render(<Button text="кнопка" onClick={() => {
      alert('Button click works!')
    }
    }/>)

    // Находим элемент кнопки
    const button = screen.getByText("кнопка")

    // Имитируем нажатие на кнопку
    fireEvent.click(button);

    // Проверяем, что alert сработал с правильным текстом предупреждения
    expect(window.alert).toHaveBeenCalledWith('Button click works!');
  });
})
