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
});
