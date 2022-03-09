// Alternatively, you can start the development server (ng serve) in one shell
// and the test runner (npx cypress open) in a second shell.

// describe('My First Test', () => {
//   it('Visits the initial project page', () => {
//     cy.visit('/');
//     cy.contains('Welcome');
//     cy.contains('sandbox app is running!');
//   });
// });

describe('License Manager', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has the correct title', () => {
    cy.title().should('equal', 'License Manager');
  });

  it('wrong password', () => {
    // cy.get('[data-testid="email"]').should('have.text', '');
    cy.get('[data-testid="email"]').clear().type('superadmin@email.com');
    cy.get('[data-testid="password"]').type('string1');
    cy.get('[data-testid="submit"]').click();
    // cy.get('[data-testid="email"]').should('have.text', 'superadmin@email.com');
    cy.get('[data-testid="email"]').should(
      'have.value',
      'superadmin@email.com'
    );
  });
  it('wrong email', () => {
    // cy.get('[data-testid="email"]').should('have.text', '');
    cy.get('[data-testid="email"]').clear().type('superadminemail.com');
    cy.get('[data-testid="password"]').type('string');
    cy.get('[data-testid="submit"]').should('be.disabled');
    // cy.get('[data-testid="email"]').should('have.text', 'superadmin@email.com');
    cy.get('[data-testid="email"]').should('have.value', 'superadminemail.com');
  });
  it('all pass', () => {
    // cy.get('[data-testid="email"]').should('have.text', '');
    cy.get('[data-testid="email"]').clear().type('superadmin@email.com');
    cy.get('[data-testid="password"]').type('string');
    cy.get('[data-testid="submit"]').click();
    // cy.get('[data-testid="email"]').should('have.text', 'superadmin@email.com');
    cy.get('[data-testid="home"]').should('have.text', 'Home works!');
  });
});
