describe('Solidarian', () => {
  it('Visits the Solidarian page', () => {
    cy.visit('/');
    cy.contains('Navega entre las comunidades de nuestra web');
  });
});

describe('Solidarian Test', () => {
  const newUser = {
    username: 'Test',
    password: 'test',
    nombre: 'User Prueba',
    telefono: '123456789',
    ciudad: 'Madrid',
    pais: 'España',
  };

  const user = {
    username: 'Test',
    password: 'test',
  };

  const newComunidad = {
    nombre: 'Comunidad Test',
    descripcion: 'Comunidad de prueba',
  };

  const newCausa = {
    nombre: 'Causa Test',
    descripcion: 'Causa de prueba',
  };

  beforeEach(() => {

  });

  after(() => {
    // cy.logout();
  });

  it('Visits the Solidarian Register page and redirect to login page', () => {
    cy.visit('/');
    cy.contains('Registrarse').click();

    cy.url().should('include', '/registrar');

    cy.get('#username').type(newUser.username);
    cy.get('#password').type(newUser.password);
    cy.get('#name').type(newUser.nombre);
    cy.get('#telefono').type(newUser.telefono);
    cy.get('#ciudad').type(newUser.ciudad);
    cy.get('#pais').type(newUser.pais);

    cy.get('button[type=submit]').contains('Registrar').click();
    // cy.url().should('include', '/login');
  });

  it('Login with new user and check token', () => {
    const userLogin = {
      username: 'Test',
      password: 'test',
    };

    cy.visit('/login');
    cy.get('#username').type(userLogin.username);
    cy.get('#password').type(userLogin.password);
    cy.get('button[type=submit]').contains('Login').click();
    cy.url().should('include', '/');
    cy.get('.nav-link').contains(userLogin.username);
    cy.getAllLocalStorage().should('exist', 'token');
  });

  it('Visits the Solidarian Comunidades page, create new comunidad', () => {
    cy.login(user.username, user.password);
    cy.visit('/comunidades');
    cy.get('button[type=button]').contains('Crear comunidad').click();
    cy.url().should('include', '/crear-comunidad');

    cy.get('[placeholder="Nombre de la comunidad"]').type(newComunidad.nombre);
    cy.get('[placeholder="Descripción de la comunidad"]').type(
      newComunidad.descripcion,
    );

    cy.get('button[type=submit]').contains('Crear comunidad').click();

    cy.request({
      method: 'GET',
      url: 'http://localhost:3001/comunidades/name/' + newComunidad.nombre,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      let comunidad = response.body;

      const comunidadId = comunidad.id;
      cy.url().should('include', '/comunidades/' + comunidadId);
    });

    cy.url().should('include', '/comunidades/');

    cy.visit('/comunidades');
    cy.get('#cardComunidad').should('have.lengthOf', 1);
  });

  it('Visits the Solidarian Comunidades page, create new comunidad and delete it', () => {
    cy.login(user.username, user.password);
    cy.visit('/comunidades');
    cy.get('#cardComunidad').within(() => {
      cy.get('.card-body').contains(newComunidad.nombre);
      cy.get('.card-body').get('button').contains('Ver detalles').click();
    });

    cy.get('button[type=button]').contains('Crear causa solidaria').click();
    cy.url().should('include', '/crear-causa');

    cy.get('[placeholder="Título de la causa solidaria"]').type(newCausa.nombre);
    cy.get('#descripcion').type(newCausa.descripcion);
    cy.get('#fechaInicio').type('2021-06-01');
    cy.get('#fechaFin').type('2021-06-30');
    cy.get('.form-check').should('have.lengthOf', 17);

    cy.get('[type="checkbox"]').first().check();
    cy.get('[type="checkbox"]').last().check();

    cy.get('button[type=submit]').contains('Crear causa solidaria').click();

    cy.request({
      method: 'GET',
      url: 'http://localhost:3001/causas/name/' + newCausa.nombre,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      let causa = response.body;
      
      const causaId = causa.id;
      cy.url().should('include', '/causa/' + causaId);
    });
  });
});
