import {DELAY_IN_MS} from "../../../src/constants/delays";

describe('a string page functionality works correctly', function () {
  before(function () {
    cy.visit('http://localhost:3001/algorithms/string');
  });

  it('a button should be disabled while the input is empty', function () {
    cy.get('input').should('have.value', '');
    cy.get('button').should('be.disabled');
  });

  it('string reverse animation works correctly', function () {
    cy.get('input').type('overturn').as('input'); // тест работает с четным и нечетным кол-вом букв, а т-же с 1 буквой
    cy.get('button').contains('Развернуть').click();

    cy.get('[class^=circle_circle]').as('circles');
    //проверить, что все кружки синие, перед началом разворота
    cy.get('@circles')
      .invoke('attr', 'class')
      .should('contain', 'circle_default');

    cy.get('@input')
      .invoke('val')
      .then((val) => { // получаем значение, введенное в input

        for (let i = 0; i < val.length / 2; i++) { // идем с двух сторон, поэтому число итераций = длина строки / 2

          cy.wait(DELAY_IN_MS); // таймер

          if (i === 0) { // первая итерация - проверка 0 и последнего эл-тов. На первой ит. кружки только розовые
            // розовые кружки
            cy.get(`[id=circle-index-${i}]`)
              .invoke('attr', 'class')
              .should('contain', 'circle_changing');
            cy.get(`[id=circle-index-${val.length - 1}]`)
              .invoke('attr', 'class')
              .should('contain', 'circle_changing');
          } else { // все остальные итерации - проверка i и val.length - i - 1 эл-тов. Предыдущие эл-ты д/стать уже зелеными
            // розовые кружки
            cy.get(`[id^=circle-index-${i}]`)
              .invoke('attr', 'class')
              .should('contain', 'circle_changing');
            cy.get(`[id^=circle-index-${val.length - i - 1}]`)
              .invoke('attr', 'class')
              .should('contain', 'circle_changing');

            // зеленые кружки
            cy.get(`[id=circle-index-${i - 1}]`)
              .invoke('attr', 'class')
              .should('contain', 'circle_modified');
            cy.get(`[id=circle-index-${i - 1}]`).should('contain', `${val[val.length - i]}`);
            cy.get(`[id=circle-index-${val.length - i}]`)
              .invoke('attr', 'class')
              .should('contain', 'circle_modified');
            cy.get(`[id=circle-index-${val.length - i}]`).and('contain', `${val[i - 1]}`);
          }
        }
      })
  });
});