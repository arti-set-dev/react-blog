import { selectByTestId } from '../../helpers/selectByTestId';

describe('Routing', () => {
  describe('User is not authorized', () => {
    it('Go to main page', () => {
      cy.visit('/');
      cy.get(selectByTestId('MainPage')).should('exist');
    });
    it('Go to profile page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('MainPage')).should('exist');
    });
    it('Going to a non-existent route', () => {
      cy.visit('/sssswswd');
      cy.get(selectByTestId('NotFoundPage')).should('exist');
    });
  });
  describe('User is authorized', () => {
    beforeEach(() => {
      cy.login('admin', '123');
    });
    it('Go to profile page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('ProfilePage')).should('exist');
    });
    it('Go to the page with a list of articles', () => {
      cy.visit('/articles');
      cy.get(selectByTestId('ArticlesPage')).should('exist');
    });
  });
});
