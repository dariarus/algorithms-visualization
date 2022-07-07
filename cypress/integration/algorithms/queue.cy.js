import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";

describe('a queue page functionality works correctly', function () {
  const resultQueueLength = 4;
  let head = 0;
  let tail = 0;
  const queue = [];

  before(function () {
    cy.visit('http://localhost:3001/algorithms/queue');
    cy.get('button').should('be.disabled');
    cy.get(`[class^=circle_circle]`).as('circles');

    // проверить, что при загрузке на странице есть 7 путых синих кружков
    cy.get('@circles')
      .its('length')
      .should('be.eq', 7)
    cy.get('@circles').should('contain', '');
    cy.get('@circles')
      .invoke('attr', 'class')
      .should('contain', 'circle_default');
  });

  it('an Add-button should be disabled while the input is empty', function () {
    cy.get('input').should('have.value', '');
    cy.get('button')
      .filter(':contains("Добавить")')
      .should('be.disabled');
  });

  it('appearing elements animation works correctly after clicking the Add-button', function () {
    for (let i = 0; i < resultQueueLength; i++) {
      cy.get('input').type(`${i}`);

      cy.get('button')
        .filter(':contains("Добавить")')
        .should('be.enabled');

      cy.get('button').contains('Добавить').click();

      queue.push(i);
      if (i !== 0) {
        tail++;
      } else tail = 0;

      cy.get(`[id=circle-index-${i}]`).as(`circle-${i}`);
      cy.get(`@circle-${i}`)
        .invoke('attr', 'class')
        .should('contain', 'circle_changing');

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get(`@circle-${i}`)
        .invoke('attr', 'class')
        .should('contain', 'circle_default');

      cy.get(`@circle-${i}`).should('contain', `${i}`);
    }

    // Проверить, что первый кружок содержит идентификатор head
    cy.get(`[class^=circle_circle]`)
      .filter(`[id=circle-index-${queue[head % queue.length]}]`).as(`circle-${queue[head % queue.length]}`);
    cy.get(`@circle-${queue[head % queue.length]}`)
      .contains(`${queue[head % queue.length]}`)
    cy.get(`@circle-${queue[head % queue.length]}`)
      .prev()
      .should('contain', 'head')

    // Проверить, что последний кружок содержит идентификатор tail
    cy.get(`[id=circle-index-${tail % queue.length}]`)
      .nextAll('div')
      .should('contain', 'tail')
  });

  it('disappearing elements animation works correctly after clicking the Delete-button', function () {
    cy.get('[class^=circle_circle]').as('circles');
    //проверить, что все кружки синие
    cy.get('@circles')
      .invoke('attr', 'class')
      .should('contain', 'circle_default');

    cy.get(`[id=circle-index-${head % queue.length}]`).as('firstCircle')

    cy.get('button').contains('Удалить').click()
      .then(() => {

        queue.shift();
        head += 1;

        cy.get('@firstCircle')
          .invoke('attr', 'class')
          // проверить, что удаляемый кружок становится  розовым
          .should('contain', 'circle_changing');

        cy.wait(SHORT_DELAY_IN_MS);

        // проверить, что первый кружок очистился и стал синим
        cy.get('@firstCircle')
          .invoke('attr', 'class')
          .should('contain', 'circle_default');
        cy.get('@firstCircle')
          .should('contain', '');

        // проверить, что следующий кружок стал head
        cy.get(`[id=circle-index-${head % queue.length}]`)
          .prev()
          .should('contain', 'head')
      })
  });

  it('the cyclic queue works correctly', function () {
    for (let i = 0; i < resultQueueLength; i++) {
      cy.get('input').type(`${i + 10}`);
      cy.get('button').contains('Добавить').click();

      queue.push(i);
        tail++;
    }

    // Проверить, что head и tail на своих местах
    cy.get(`[class^=circle_circle]`)
      .filter(`[id=circle-index-${head % queue.length}]`).as(`circle-${head % queue.length}`);

    cy.get(`@circle-${head % queue.length}`)
      .prev()
      .should('contain', 'head')

    cy.get(`[id=circle-index-${tail % queue.length}]`)
      .nextAll('div')
      .should('contain', 'tail')
  });

  it('cleaning of the page works correctly after clicking the Clean-button', function () {
    cy.get('button').contains('Очистить').click();
    // проверяем, что на странице все кружки стали пустые
    cy.get('[class^=circle_circle]').should('contain', '');
  });
});