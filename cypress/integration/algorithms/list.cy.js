import {DELAY_IN_MS} from "../../../src/constants/delays";

describe('a list page functionality works correctly', function () {
  // const resultQueueLength = 4;
  // let head = 0;
  // let tail = 0;
  // const queue = [];
  let list = [];
  const head = 0;

  before(function () {
    cy.visit('http://localhost:3001/algorithms/list');

    cy.get('button').as('button');

    cy.get('@button').filter(':contains("Добавить в head")')
      .should('be.disabled');

    cy.get('@button').filter(':contains("Добавить в tail")')
      .should('be.disabled');

    cy.get('@button').filter(':contains("Добавить по индексу")')
      .should('be.disabled');

    cy.get('@button').filter(':contains("Удалить по индексу")')
      .should('be.disabled');

    cy.get('@button').filter(':contains("Удалить из head")')
      .should('be.enabled');

    cy.get('@button').filter(':contains("Удалить из tail")')
      .should('be.enabled');

    // Проверяем, что есть некоторые синие кружки с некоторыми значениями
    cy.get(`[class^=circle_circle]`).as('circles');

    cy.get('@circles')
      .its('length')
      .should('be.gt', 0)
      .and('be.lt', 7);

    cy.get('@circles').should('not.be.empty');

    cy.get('@circles')
      .invoke('attr', 'class')
      .should('contain', 'circle_default');

    // Сразу записываем в переменную весь получившийся дефолтный список
    cy.get('@circles').each(($el) => {
      list.push($el);
    });
  });

  it('Enabled and disabled buttons render correctly', function () {
    cy.get('button').as('button');

    // Проверить, что кнопки для удаления значений доступны в любом случае
    cy.get('@button')
      .filter(':contains("Удалить из head")')
      .should('be.enabled');

    cy.get('@button')
      .filter(':contains("Удалить из tail")')
      .should('be.enabled');

    // Проверить, что текстовое поле для значений пустое
    cy.get(`input[type^=text]`)
      .should('have.value', '');

    // и, сл-но, недоступны все остальные кнопки
    cy.get('@button')
      .filter(':contains("Добавить в head")')
      .should('be.disabled');

    cy.get('@button')
      .filter(':contains("Добавить в tail")')
      .should('be.disabled');

    cy.get('@button')
      .filter(':contains("Добавить по индексу")')
      .should('be.disabled');

    cy.get('@button')
      .filter(':contains("Удалить по индексу")')
      .should('be.disabled');

    // Проверить, что числовое поле для индекса пустое
    cy.get(`input[type^=number]`)
      .should('have.value', '');

    // и, сл-но, недоступны кнопки доб./уд. по индексу
    cy.get('@button')
      .filter(':contains("Добавить по индексу")')
      .should('be.disabled');

    cy.get('@button')
      .filter(':contains("Удалить по индексу")')
      .should('be.disabled');
  });

  it('Add-to-head-button functionality works correctly', function () {
    cy.get('[class^=circle_circle]').as('bigCircles');

    // Проверить, что head на своем месте перед началом изменений
    cy.get(`[id=circle-index-${head}]`)
      .prev()
      .should('contain', 'head')

    cy.get(`input[type^=text]`).type('Zero');
    cy.get('button').contains("Добавить в head").click();

    cy.get('input[type^=text]')
      .invoke('val')
      .then((val) => { // получаем значение, введенное в input

        const newLength = list.unshift(val);

        // найти по id тот кружок, над которым д/б розовый кружок
        cy.get(`[id=circle-index-${head}]`).as('head-circle');

        // Проверить, есть ли розовый кружок сверху и что он содержит значение из поля ввода
        cy.get('@head-circle')
          .parent()
          .prev()
          .should('contain', val);
        cy.get('@head-circle')
          .parent()
          .prev()
          .invoke('attr', 'class')
          .should('contain', 'smallCircleWrapTop');

        cy.wait(DELAY_IN_MS);

        // после паузы в 1с розовый кружок исчезает, а большой становится зеленым
        cy.get('@head-circle')
          .parent()
          .prev()
          .should('not.exist');

        cy.get('@head-circle')
          .invoke('attr', 'class')
          .should('contain', 'circle_modified');

        // после еще 1с большой кружок становится синим и должен содержать новое значение
        cy.wait(DELAY_IN_MS);

        cy.get('@head-circle')
          .should('contain', val);

        cy.get('@head-circle')
          .invoke('attr', 'class')
          .should('contain', 'circle_default');

        // Проверяем, что новая длина увеличилась на 1 и что head остался на своем месте
        cy.get('[class^=circle_circle]')
          .its('length')
          .should('be.eq', newLength)

        cy.get('@head-circle')
          .prev()
          .should('contain', 'head')
      })
  });

  it('Add-to-tail-button functionality works correctly', function () {
    cy.get('[class^=circle_circle]').as('bigCircles');

    // Проверить, что tail на своем месте перед началом изменений
    cy.get(`[id=circle-index-${list.length - 1}]`)
      .nextUntil('circle_string')
      .should('contain', 'tail');

    cy.get(`input[type^=text]`).clear().type('Last');
    cy.get('button').contains("Добавить в tail").click();

    cy.get('input[type^=text]')
      .invoke('val')
      .then((val) => { // получаем значение, введенное в input

        // найти по id тот кружок, над которым д/б розовый кружок
        cy.get(`[id=circle-index-${list.length - 1}]`).as('tail-circle');

        // Проверить, есть ли розовый кружок сверху и что он содержит значение из поля ввода
        cy.get('@tail-circle')
          .parent()
          .prev()
          .should('contain', val);
        cy.get('@tail-circle')
          .parent()
          .prev()
          .invoke('attr', 'class')
          .should('contain', 'smallCircleWrapTop');

        cy.wait(DELAY_IN_MS);

        const newLength = list.push(val);

        // после паузы в 1с розовый кружок исчезает, а большой становится зеленым
        cy.get(`[id=circle-index-${list.length - 1}]`).as('tail-circle')

        cy.get('@tail-circle')
          .parent()
          .prev()
          .should('not.exist');

        cy.get('@tail-circle')
          .invoke('attr', 'class')
          .should('contain', 'circle_modified');

        // после еще 1с большой кружок становится синим и должен содержать новое значение
        cy.wait(DELAY_IN_MS);

        cy.get('@tail-circle')
          .should('contain', val);

        cy.get('@tail-circle')
          .invoke('attr', 'class')
          .should('contain', 'circle_default');

        // Проверяем, что новая длина увеличилась на 1 и что tail остался на своем месте
        cy.get('[class^=circle_circle]')
          .its('length')
          .should('be.eq', newLength)

        cy.get('@tail-circle')
          .nextUntil('circle_string')
          .should('contain', 'tail');
      })
  });

  it('Add-by-index-button functionality works correctly', function () {
    // Фиксируем текущую длину списка
    const currentLength = list.length;

    cy.get('[class^=circle_circle]').as('bigCircles');

    cy.get(`input[type^=text]`).clear().type('New');
    cy.get(`input[type^=number]`).type('2');

    cy.get('button').contains("Добавить по индексу").click();

    cy.get('input[type^=number]')
      .invoke('val')
      .then((val) => { // получаем значение, введенное в input-number

        const valIndex = parseInt(val);

        cy.get('input[type^=text]')
          .invoke('val')
          .then((valText) => { // получаем значение, введенное в input-number

            // Проверить, что, начиная с начала, над каждым кружком появляется маленький розовый кружок, пока не дойдет до введенного в поле индекса
            for (let i = 0; i <= valIndex; i++) {
              cy.get(`[id=circle-index-${i}]`).as(`circle-${i}`);

              cy.get(`@circle-${i}`)
                .parent()
                .prev()
                .should('contain', valText);
              cy.get(`@circle-${i}`)
                .parent()
                .prev()
                .invoke('attr', 'class')
                .should('contain', 'smallCircleWrapTop');

              // таймер
              cy.wait(DELAY_IN_MS);
              // после нулевой итерации предыдущие большие кружки окрашиваются в розовый цвет
              if (i !== 0 && i < valIndex) {
                cy.get(`@circle-${i - 1}`)
                  .invoke('attr', 'class')
                  .should('contain', 'circle_changing');
              } else if (i === valIndex) {
                // на последней итерации маленький кружок исчезает, добавляется один большой со значением из инпута, и становится зеленым
                cy.get(`@circle-${i}`)
                  .parent()
                  .prev()
                  .should('not.exist');

                cy.get(`@circle-${i}`)
                  .invoke('attr', 'class')
                  .should('contain', 'circle_modified');

                cy.get(`@circle-${i}`)
                  .should('contain', `${valText}`);
              }
            }
            // Вставляем новый элемент в массив списка:
            list.splice(valIndex, 0, valText);

            // после еще одной секунды все кружки становятся обратно синими
            cy.wait(DELAY_IN_MS);

            cy.get('[class^=circle_circle]').as('bigCircles');

            cy.get('@bigCircles')
              .invoke('attr', 'class')
              .should('contain', 'circle_default');

            // Проверить новую длину
            cy.get('@bigCircles')
              .its('length')
              .should('be.eq', currentLength + 1);
          })
      })
  });

  it('Delete-from-head-button functionality works correctly', function () {
    cy.get('[class^=circle_circle]').as('bigCircles');

    // Фиксируем значения для списка до изменений
    const currentLength = list.length;
    const headValue = list[head];
    cy.get(`[id=circle-index-${head + 1}]`)
      .find('p')
      .then((val) => {
        const nextValue = val.text();

        cy.get('button').contains("Удалить из head").click();

        // По нажатию на кнопку внизу появляется малый розовый кружок со значением из большого нулевого, а сам кружок становится пустым
        cy.get(`[id=circle-index-${head}]`).as('head-circle');

        cy.get('@head-circle')
          .should('contain', '');

        cy.get('@head-circle')
          .parent()
          .next()
          .should('contain', `${headValue}`);
        cy.get('@head-circle')
          .parent()
          .next()
          .invoke('attr', 'class')
          .should('contain', 'smallCircleWrapBottom');

        // спустя секунду оба кружка исчезают, длина сокращается на 1, а в head попадает значение бывшего кружка №1
        cy.wait(DELAY_IN_MS);

        list.shift();

        cy.get(`[id=circle-index-${head}]`).as('head-circle');
        cy.get('@head-circle')
          .parent()
          .next()
          .should('not.exist');

        cy.get('@head-circle')
          .should('contain', `${nextValue}`);

        cy.get('@head-circle')
          .prev()
          .should('contain', 'head')

        cy.get('[class^=circle_circle]')
          .its('length')
          .should('be.eq', currentLength - 1);
      })
  });

  it('Delete-from-tail-button functionality works correctly', function () {
    cy.get('[class^=circle_circle]').as('bigCircles');

    // Фиксируем значения для списка до изменений
    let tail = list.length - 1;

    cy.get(`[id=circle-index-${tail}]`)
      .find('p')
      .then((val) => {
        const tailValue = val.text();

        cy.get(`[id=circle-index-${tail - 1}]`)
          .find('p')
          .then((val) => {
            const prevValue = val.text();

            cy.get('button').contains("Удалить из tail").click();

            // По нажатию на кнопку внизу появляется малый розовый кружок со значением из большого, а сам кружок становится пустым
            cy.get(`[id=circle-index-${tail}]`).as('tail-circle');

            cy.get('@tail-circle')
              .should('contain', '');

            cy.get('@tail-circle')
              .parent()
              .next()
              .should('contain', `${tailValue}`);
            cy.get('@tail-circle')
              .parent()
              .next()
              .invoke('attr', 'class')
              .should('contain', 'smallCircleWrapBottom');

            // спустя секунду оба кружка исчезают, длина сокращается на 1, а в tail попадает значение предыдущего кружка
            cy.wait(DELAY_IN_MS);

            list.pop();
            tail = list.length - 1;

            cy.get(`[id=circle-index-${tail}]`).as('tail-circle');
            cy.get('@tail-circle')
              .parent()
              .next()
              .should('not.exist');

            cy.get('@tail-circle')
              .should('contain', `${prevValue}`);

            cy.get('@tail-circle')
              .nextUntil('circle_string')
              .should('contain', 'tail');

            cy.get('[class^=circle_circle]')
              .its('length')
              .should('be.eq', list.length);
          })
      })
  });

  it('Delete-by-index-button functionality works correctly', function () {
    if (list.length <= 3) {
      for (let i = 0; i < 4; i++) {
        cy.get('input[type^=text]').clear().type(`${i}`);
        cy.get('button').contains("Добавить в head").click();
      }
      cy.wait(3500);
    }

    cy.get('button').contains("Удалить по индексу").click();

    cy.get('input[type^=number]')
      .invoke('val')
      .then((valIndex) => {
        const index = parseInt(valIndex);

        cy.get(`[id=circle-index-${index}]`)
          .find('p')
          .then((val) => {
            const valueByIndex = val.text();

            cy.get(`[id=circle-index-${index + 1}]`)
              .find('p')
              .then((val) => {
                const nextValue = val.text();

                for (let i = 0; i <= index; i++) {
                  cy.get(`[id=circle-index-${i}]`).as(`circle-${i}`);

                  cy.wait(DELAY_IN_MS);

                  if (i < index) {
                    cy.get(`@circle-${i}`)
                      .invoke('attr', 'class')
                      .should('contain', 'circle_changing');
                  } else {
                    cy.get(`@circle-${i}`)
                      .parent()
                      .next()
                      .should('contain', `${valueByIndex}`);
                    cy.get(`@circle-${i}`)
                      .parent()
                      .next()
                      .invoke('attr', 'class')
                      .should('contain', 'smallCircleWrapBottom');
                  }
                }
                // Спустя 1с оба кружка исчезают, длина уменьшается на 1, а место по индексу занимает следующий элемент
                cy.wait(DELAY_IN_MS);

                list.splice(index, 1);

                cy.get(`[id=circle-index-${index}]`).as(`circle-${index}`);
                cy.get(`@circle-${index}`)
                  .parent()
                  .next()
                  .should('not.exist');

                cy.get(`@circle-${index}`)
                  .should('contain', `${nextValue}`);

                cy.get('[class^=circle_circle]').as('bigCircles');

                cy.get('@bigCircles')
                  .invoke('attr', 'class')
                  .should('contain', 'circle_default');

                cy.get('@bigCircles')
                  .its('length')
                  .should('be.eq', list.length)
              })
          })
      })
  });
});