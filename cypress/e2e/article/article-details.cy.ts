let currentArticleId = '';

describe('The user visits the article page', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.visit(`articles/${article.id}`);
    });
  });
  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });
  it('and sees the contents of the article', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist');
  });
  it('and sees a list of recommended articles', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist');
  });
  it('and leaves a comment', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.addComment('Some text');
    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });
  it('and gives a rating (stubs)', () => {
    cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.setRate(5, 'Some feedback');
    cy.get('[data-selected=true]').should('have.length', 5);
  });
});
