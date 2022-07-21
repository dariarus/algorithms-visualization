describe('app works correctly with routes', function () {
  before(function () {
    cy.visit('http://localhost:3001/algorithms');
  });

  it('should open main page by default', function () {
    cy.url().should('include', '/algorithms')
  });

  it('should open string page after clicking on the appropriate card', function () {
    cy.get("a[href*='/string']").click();
    cy.url().should('include', '/algorithms/string');
    cy.contains("К оглавлению").click();
  });

  it('should open fibonacci page after returning to main page and clicking on the appropriate card', function () {
    cy.get("a[href*='/fibonacci']").click();
    cy.url().should('include', '/algorithms/fibonacci');
    cy.contains("К оглавлению").click();
  });

  it('should open sorting page after returning to main page and clicking on the appropriate card', function () {
    cy.get("a[href*='/sorting']").click();
    cy.url().should('include', '/algorithms/sorting');
    cy.contains("К оглавлению").click();
  });

  it('should open stack page after returning to main page and clicking on the appropriate card', function () {
    cy.get("a[href*='/stack']").click();
    cy.url().should('include', '/algorithms/stack');
    cy.contains("К оглавлению").click();
  });

  it('should open queue page after returning to main page and clicking on the appropriate card', function () {
    cy.get("a[href*='/queue']").click();
    cy.url().should('include', '/algorithms/queue');
    cy.contains("К оглавлению").click();
  });

  it('should open list page after returning to main page and clicking on the appropriate card', function () {
    cy.get("a[href*='/list']").click();
    cy.url().should('include', '/algorithms/list');
    cy.contains("К оглавлению").click();
  });
});