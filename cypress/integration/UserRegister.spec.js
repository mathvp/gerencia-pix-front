/// <reference types="cypress" />

const email = function () {
  return `matheus@teste${Math.floor(Math.random())}${Date.now()}.com`
}

context('User Registration', () => {

  context('Register success', () => {

    it('can access the page successfully', () => {
      cy.visit('/cadastro')
      cy.wait(2000)
    })

    it('can fill first_name field', () => {
      cy.get('input[data-cy="first_name"]').focus().type('Matheus')
    })

    it('can fill last_name field', () => {
      cy.get('input[data-cy="last_name"]').focus().type('Vieira Teste')
    })

    it('can fill email field', () => {
      cy.get('input[data-cy="email"]').focus().type(email())
    })

    it('can fill password field', () => {
      cy.get('input[data-cy="password"]').focus().type('123456')
    })

    it('can fill password_copy field', () => {
      cy.get('input[data-cy="password_copy"]').focus().type('123456')
    })

    it('can click register', () => {
      cy.get('button[data-cy="btn_register"]').click()
      cy.wait(2000)
    })

    it('shows success message', () => {
      cy.get('div[data-cy="response_msg"]').contains('Sua conta foi criada com sucesso')
    })

    it('should redirect to login screen', () => {
      cy.wait(2000)
      cy.url().should('be.equal', `${Cypress.config("baseUrl")}/login`)
    })
  })

  context('Register fails', () => {

    before(() => {
      cy.visit('/cadastro')
      cy.wait(2000)
    })

    beforeEach(() => {
      cy.get('input[data-cy="first_name"]').clear()
      cy.get('input[data-cy="last_name"]').clear()
      cy.get('input[data-cy="email"]').clear()
      cy.get('input[data-cy="password"]').clear()
      cy.get('input[data-cy="password_copy"]').clear()
    })

    context('Empty fields', () => {

      it('can access the page successfully', () => {
        cy.visit('/cadastro')
        cy.wait(2000)
      })

      it('should not be able to send empty form', () => {
        cy.get('button[data-cy="btn_register"]').click()
        cy.wait(2000)

        cy.get('div[data-cy="response_msg"]').should('not.exist')
        cy.url().should('be.equal', `${Cypress.config("baseUrl")}/cadastro`)
      })

      it('should not be able to send without first_name', () => {
        cy.get('input[data-cy="last_name"]').focus().type('Vieira Teste')
        cy.get('input[data-cy="email"]').focus().type(email())
        cy.get('input[data-cy="password"]').focus().type('123456')
        cy.get('input[data-cy="password_copy"]').focus().type('123456')

        cy.get('button[data-cy="btn_register"]').click()
        cy.wait(2000)

        cy.get('div[data-cy="response_msg"]').should('not.exist')
        cy.url().should('be.equal', `${Cypress.config("baseUrl")}/cadastro`)
      })

      it('should not be able to send without last_name', () => {
        cy.get('input[data-cy="first_name"]').focus().type('Teste')
        cy.get('input[data-cy="email"]').focus().type(email())
        cy.get('input[data-cy="password"]').focus().type('abcdefghij')
        cy.get('input[data-cy="password_copy"]').focus().type('abcdefghij')

        cy.get('button[data-cy="btn_register"]').click()
        cy.wait(2000)

        cy.get('div[data-cy="response_msg"]').should('not.exist')
        cy.url().should('be.equal', `${Cypress.config("baseUrl")}/cadastro`)
      })

      it('should not be able to send without email', () => {
        cy.get('input[data-cy="first_name"]').focus().type('Teste')
        cy.get('input[data-cy="last_name"]').focus().type('Vieira Teste')
        cy.get('input[data-cy="password"]').focus().type('abcdefghij')
        cy.get('input[data-cy="password_copy"]').focus().type('abcdefghij')

        cy.get('button[data-cy="btn_register"]').click()
        cy.wait(2000)

        cy.get('div[data-cy="response_msg"]').should('not.exist')
        cy.url().should('be.equal', `${Cypress.config("baseUrl")}/cadastro`)
      })

      it('should not be able to send without password', () => {
        cy.get('input[data-cy="first_name"]').focus().type('Teste')
        cy.get('input[data-cy="last_name"]').focus().type('Vieira Teste')
        cy.get('input[data-cy="email"]').focus().type(email())
        cy.get('input[data-cy="password_copy"]').focus().type('abcdefghij')

        cy.get('button[data-cy="btn_register"]').click()
        cy.wait(2000)

        cy.get('div[data-cy="response_msg"]').should('not.exist')
        cy.url().should('be.equal', `${Cypress.config("baseUrl")}/cadastro`)
      })

      it('should not be able to send without password copy', () => {
        cy.get('input[data-cy="first_name"]').focus().type('Teste')
        cy.get('input[data-cy="last_name"]').focus().type('Vieira Teste')
        cy.get('input[data-cy="email"]').focus().type(email())
        cy.get('input[data-cy="password"]').focus().type('abcdefghij')

        cy.get('button[data-cy="btn_register"]').click()
        cy.wait(2000)

        cy.get('div[data-cy="response_msg"]').should('not.exist')
        cy.url().should('be.equal', `${Cypress.config("baseUrl")}/cadastro`)
      })
    })

    context('Fields validation', () => {

      it('should not be able to send with incomplete email', () => {
        cy.get('input[data-cy="first_name"]').focus().type('Teste')
        cy.get('input[data-cy="last_name"]').focus().type('Vieira Teste')
        cy.get('input[data-cy="email"]').focus().type('emailinvalido')
        cy.get('input[data-cy="password"]').focus().type('abcdefghij')
        cy.get('input[data-cy="password_copy"]').focus().type('abcdefghij')

        cy.get('button[data-cy="btn_register"]').click()
        cy.wait(2000)

        cy.get('div[data-cy="response_msg"]').should('not.exist')
        cy.url().should('be.equal', `${Cypress.config("baseUrl")}/cadastro`)
      })

      it('should not be able to send with invalid email', () => {
        cy.get('input[data-cy="first_name"]').focus().type('Teste')
        cy.get('input[data-cy="last_name"]').focus().type('Vieira Teste')
        cy.get('input[data-cy="email"]').focus().type('emailinvalido.com.br')
        cy.get('input[data-cy="password"]').focus().type('abcdefghij')
        cy.get('input[data-cy="password_copy"]').focus().type('abcdefghij')

        cy.get('button[data-cy="btn_register"]').click()
        cy.wait(2000)

        cy.get('div[data-cy="response_msg"]').should('not.exist')
        cy.url().should('be.equal', `${Cypress.config("baseUrl")}/cadastro`)
      })

      it('should not be able to send with invalid password', () => {
        cy.get('input[data-cy="first_name"]').focus().type('Teste')
        cy.get('input[data-cy="last_name"]').focus().type('Vieira Teste')
        cy.get('input[data-cy="email"]').focus().type(email())
        cy.get('input[data-cy="password"]').focus().type('123')
        cy.get('input[data-cy="password_copy"]').focus().type('123')

        cy.get('button[data-cy="btn_register"]').click()
        cy.wait(2000)

        cy.get('div[data-cy="response_msg"]').should('not.exist')
        cy.url().should('be.equal', `${Cypress.config("baseUrl")}/cadastro`)
      })

      it('should not be able to send when passwords doesnt match', () => {
        cy.get('input[data-cy="first_name"]').focus().type('Teste')
        cy.get('input[data-cy="last_name"]').focus().type('Vieira Teste')
        cy.get('input[data-cy="email"]').focus().type(email())
        cy.get('input[data-cy="password"]').focus().type('12345678')
        cy.get('input[data-cy="password_copy"]').focus().type('abcdefghij')

        cy.get('button[data-cy="btn_register"]').click()
        cy.wait(2000)

        cy.get('div[data-cy="response_msg"]').should('not.exist')
        cy.url().should('be.equal', `${Cypress.config("baseUrl")}/cadastro`)
      })
    })

  })
})