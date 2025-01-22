let profileId = '';

describe('User visits profile page', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`profile/${data.id}`);
    });
  });
  afterEach(() => {
    cy.resetProfile(profileId);
  });
  it('and the profile is loaded successfully', () => {
    cy.getByTestId('ProfileCard.firstname').should('have.value', 'test');
  });
  it('and edits it', () => {
    const newName = 'new';
    const newLastName = 'lastname';
    cy.updateProfile(newName, newLastName);
    cy.getByTestId('ProfileCard.firstname').should('have.value', newName);
    cy.getByTestId('ProfileCard.lastname').should('have.value', newLastName);
  });
});
