describe('A user visits a page with a list of articles', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit('articles');
    });
  });
  it('and the articles are loaded successfully', () => {
    cy.getByTestId('ArticlesList').should('exist');
    cy.getByTestId('ArticlesItem').should('have.length.greaterThan', 3);
  });
  it('and the articles are loaded successfully (on stubs)', () => {
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
    cy.getByTestId('ArticlesList').should('exist');
    cy.getByTestId('ArticlesItem').should('have.length.greaterThan', 3);
  });
  it.skip('test fails (skip)', () => {
    cy.getByTestId('ArticlesList').should('exist');
    cy.getByTestId('ArticlesItem').should('have.length.greaterThan', 3);
    cy.get('sqsqs').should('exist');
  });
});
