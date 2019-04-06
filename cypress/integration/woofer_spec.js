/* eslint-disable semi */
/* eslint-disable no-undef */
/// <reference types="Cypress" />

context('Woofer general test', () => {

  it('Should be able to register', () =>{
    cy.visit('localhost:3333')

    cy.get('[data-test=register]').click()
    cy.get('[data-test=createYourAccount').should('be.visible').should('contain', 'Create Your Account')

  })
})