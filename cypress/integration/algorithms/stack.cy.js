import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../../src/constants/delays";

describe('a stack page functionality works correctly', function () {
  // TODO: как посчитать длину самого стека вместо использования шаблона?
  const result = [0, 1, 2, 3];

  before(function () {
    cy.visit('http://localhost:3001/algorithms/stack');
    cy.get('button').should('be.disabled');
  });

  it('a button should be disabled while the input is empty', function () {
    cy.get('input').should('have.value', '');
    cy.get('button[id="addButton"]').as('addButton');
    cy.get('@addButton').should('be.disabled');
  });

  it('appearing elements animation works correctly after clicking the Add-button', function () {
    for (let i = 0; i < result.length; i++) {
      cy.get('input').type(`${i}`);
      cy.get('button').contains('Добавить').click();

      cy.get(`[id=circle-index-${i}]`).as(`circle-${i}`);
      cy.get(`@circle-${i}`)
        .invoke('attr', 'class')
        .should('contain', 'circle_changing');

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get(`@circle-${i}`)
        .invoke('attr', 'class')
        .should('contain', 'circle_default');

      cy.get(`@circle-${i}`).should('contain', `${result[i]}`);
    }

    // TODO: как проверить наличие "top" у последнего эл-та?

    // cy.get(`[class^=circle_content]`).find(`@circle-${result.length - 1}`)
    //   .invoke('attr', 'class')
    //   .should('contain', 'circle_head');
  });

  it('disappearing elements animation works correctly after clicking the Delete-button', function () {
    cy.get('[class^=circle_circle]').as('circles');
    //проверить, что все кружки синие
    cy.get('@circles')
      .invoke('attr', 'class')
      .should('contain', 'circle_default');

    // const stackLength = cy.get('[class^=circle_circle]').its('length')
    // console.log(stackLength)

    cy.get(`[id=circle-index-${result.length - 1}]`).as('lastCircle')

    cy.get('button').contains('Удалить').click()
      .then(() => {

        cy.get('@lastCircle')
          .invoke('attr', 'class')
          // проверить, что удаляемый кружок становится  розовым
          .should('contain', 'circle_changing');

        cy.wait(SHORT_DELAY_IN_MS);

        // проверить, что удаляемого кружка больше нет на странице
        cy.get(`[id=circle-index-${result.length - 1}]`).should('not.exist');
      })
  });

  it('cleaning of the page works correctly after clicking the Clean-button', function () {
    cy.get('button').contains('Очистить').click();
    // проверяем, что на странице больше нет ни одного кружка
    cy.get('[class^=circle_circle]').should('not.exist');
  });
});