/* eslint-disable semi */
/* eslint-disable no-undef */
/// <reference types="Cypress" />

context('Woofer general test', () => {

  it('Should be able to register', () =>{
    cy.visit('localhost:3333')

    // Form is visible
    cy.get('[data-test=needToLogin]').should('be.visible')
    cy.get('[data-test=register]').click()
    cy.get('[data-test=createYourAccount').should('be.visible').should('contain', 'Create Your Account')

    // Fill out form and submit
    cy.get('#inputFirst').type('Tryna')
    cy.get('#inputLast').type('Tryit')
    cy.get('#inputEmail').type('trynat@email.com')
    cy.get('#inputPassword').type('trynapassword')
    cy.get('#add-user').click()

    //should go back to homescreen
    cy.get('#register-container').should('not.be.visible')
    cy.get('#main-container').should('be.visible')
    cy.get('[data-test=needToLogin]').should('not.be.visible')
    cy.get('[data-test=username').should('contain', 'Tryna')
  })

  it('Should be able to logout', () => {
    cy.get('[data-test=logout]').click()
    cy.get('[data-test=needToLogin]').should('be.visible')
  })

  
})