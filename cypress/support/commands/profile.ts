export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId('ProfileCard.EditButton').click();
  cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
  cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
  cy.getByTestId('ProfileCard.SaveButton').click();
};

export const resetProfile = (profileId: string) => cy.request({
  method: 'PUT',
  url: `http://localhost:8000/profile/${profileId}`,
  headers: { Authorization: `Bearer ${profileId}` },
  body: {
    id: '4',
    firstname: 'test',
    lastname: 'user',
    age: 24,
    currency: 'KZT',
    city: 'New York',
    username: 'testuser',
    // eslint-disable-next-line max-len
    avatar:
        // eslint-disable-next-line max-len
        'https://images.unsplash.com/photo-1664575600397-88e370cb46b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    country: 'USA',
  },
});

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname: string, lastname: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
