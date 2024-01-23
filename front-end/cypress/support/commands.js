// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('button[type=submit]').contains('Login').click();
  cy.url().should('include', '/');
  cy.get('.nav-link').contains(username);
  cy.getAllLocalStorage().should('exist', 'token');
});

Cypress.Commands.add('logout', () => {
  cy.visit('/');
  cy.get('.nav-link').contains('Cerrar sesión'); 
  cy.get('.nav-link').contains('Cerrar sesión').click();
  cy.getAllLocalStorage().should('not.have.property', 'token');
  cy.url().should('include', '/login');
});
