import { User } from '../../../src/entities/User';
import { selectByTestId } from '../../helpers/selectByTestId';

export const setRate = (statsCount = 5, feedback = 'Some feedback') => {
  cy.getByTestId(`StarRating.${statsCount}`).click();
  cy.getByTestId('RatingCard.Input').type(feedback);
  cy.getByTestId('RatingCard.Send').click();
};

export const getByTestId = (testId: string) => cy.get(selectByTestId(testId));

declare global {
  namespace Cypress {
    interface Chainable {
      setRate(statsCount: number, feedback: string): Chainable<User>;
    }
  }
}
