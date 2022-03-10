// Check the Login Functionality
// Alternatively, you can start the development server (ng serve) in one shell
// and the test runner (npx cypress open) in a second shell.

import * as jwt from 'jsonwebtoken';

// Test cases
// 

// describe('My First Test', () => {
//   it('Visits the initial project page', () => {
//     cy.visit('/');
//     cy.contains('Welcome');
//     cy.contains('sandbox app is running!');
//   });
// });

let accessToken = jwt.sign(
  {
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    id: '1',
    roles: [
      {
        name: 'SUPER_ADMIN',
      },
    ],
  },
  'secret'
);

describe('License Manager', () => {
  let interceptCount = 0;

  beforeEach(() => {
    // cy.intercept(
    //   {
    //     method: 'POST',
    //     url: 'api/auth/access_token',
    //   },
    //   (req) => {
    //     req.reply((res) => {
    //       if (interceptCount === 0) {
    //         interceptCount += 1;
    //         res.send({ detail: 'Incorrect username or password' });
    //       } else
    //         res.send({
    //           access: accessToken,
    //         });
    //     });
    //   }
    // ).as('login');

    // cy.intercept(
    //   {
    //     method: 'GET',
    //     url: 'api/user-roles/1',
    //   },
    //   {
    //     body: [
    //       {
    //         name: 'SUPER_ADMIN',
    //       },
    //     ],
    //   }
    // ).as('userRoles');

    cy.visit('/');
  });

  it('has the correct title', () => {
    cy.title().should('equal', 'License Manager');
  });

  it('wrong password', () => {
    cy.intercept(
      {
        method: 'POST',
        url: 'api/auth/access_token',
      },
      { body: { detail: 'Incorrect username or password' } }
    ).as('login1');
    // cy.get('[data-testid="email"]').should('have.text', '');
    cy.get('[data-testid="email"]').clear().type('superadmin@email.com');
    cy.get('[data-testid="password"]').type('string1');
    cy.get('[data-testid="submit"]').click();
    // cy.get('[data-testid="email"]').should('have.text', 'superadmin@email.com');
    // cy.wait('@login');

    cy.wait('@login1');
    cy.get('[data-testid="email"]').should(
      'have.value',
      'superadmin@email.com'
    );
  });
  it('When typing wrong email, this field should display red outline, and submit button should be disabled', () => {
    cy.get('[data-testid="email"]').clear().type('superadminemail.com');
    cy.get('[data-testid="email"]').should('have.class', 'ng-invalid');
    cy.get('[data-testid="submit"]').should('be.disabled');
  });
  it('When password is short, this field should display red outline, and submit button should be disabled', () => {
    cy.get('[data-testid="password"]').type('val').clear();
    // cy.get('[data-testid="password"]').invoke('val', '');
    cy.get('[data-testid="email"]').clear().type('superadmin@email.com');
    cy.get('[data-testid="password"]').should('have.class', 'ng-invalid');
    cy.get('[data-testid="submit"]').should('be.disabled');
  });
  it('submits the form successfully', () => {
    cy.intercept(
      {
        method: 'POST',
        url: 'api/auth/access_token',
      },
      {
        statusCode: 200,
        body: {
          access: accessToken,
        },
      }
    ).as('login2');
    cy.intercept(
      {
        method: 'GET',
        url: 'api/user-roles/1',
      },
      {
        body: [
          {
            name: 'SUPER_ADMIN',
          },
        ],
      }
    ).as('userRoles');
    // cy.get('[data-testid="email"]').should('have.text', '');
    cy.get('[data-testid="email"]').clear().type('superadmin@email.com');
    cy.get('[data-testid="password"]').type('string');
    cy.get('[data-testid="submit"]').click();
    // cy.wait('@login');

    cy.wait('@login2');
    // cy.wait('@userRoles');

    cy.wait('@userRoles');
    // cy.get('[data-testid="email"]').should('have.text', 'superadmin@email.com');
    cy.get('[data-testid="home"]').should('have.text', 'Home works!');
  });
});
