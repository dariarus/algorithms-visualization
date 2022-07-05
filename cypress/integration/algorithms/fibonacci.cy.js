import {DELAY_IN_MS} from "../../../src/constants/delays";

describe('a string page functionality works correctly', function () {
  before(function () {
    cy.visit('http://localhost:3001/algorithms/fibonacci');
  });

  it('a button should be disabled while the input is empty', function () {
    cy.get('input').should('have.value', '');
    cy.get('button').should('be.disabled');
  });

  it('appearing elements animation works correctly', function () {
    cy.get('input').type('6');
    cy.get('button').contains('Рассчитать').click();

    const result = [1, 1, 2, 3, 5, 8, 13]; // результат для 6-го члена последовательности

    cy.get('input')
      .invoke('val')
      .then(() => { // получаем значение, введенное в input

        for (let i = 0; i < result.length; i++) {

          cy.wait(DELAY_IN_MS); // таймер

          cy.get(`[id=circle-index-${i}]`).as(`circle-${i}`);
          cy.get(`@circle-${i}`)
            .invoke('attr', 'class')
            .should('contain', 'circle_default');
          cy.get(`@circle-${i}`).should('contain', `${result[i]}`); // проверяем символ в кружке по созданному шаблону для введенного значения
        }
      }).then(() => {
        cy.get('[class^=circle_circle]').then(($arr) => {
            expect($arr).to.have.length(result.length) // проверяем, что отрисовалось верное кодичество кружков
          });
      });
  });
});