/* eslint-disable semi */
/* eslint-disable no-undef */
/// <reference types="Cypress" />

context('Woofer general test', () => {

  it('Should be able to register', () =>{
    cy.visit('https://damp-waters-21948.herokuapp.com/')

    // Form is visible
    cy.get('[data-test=needToLogIn]').should('be.visible')
    cy.get('[data-test=register]').click()
    cy.get('[data-test=createYourAccount').should('be.visible').should('contain', 'Create Your Account')

    // Fill out form and submit
    cy.get('#inputFirst').type('Tryna')
    cy.get('#inputLast').type('Tryit')
    cy.get('#inputEmail').type('trynat@email.com')
    cy.get('#inputPassword').type('trynapassword')
    cy.get('#add-user').click()

     //should go back to homescreen
     cy.get('#main-container').should('be.visible')
     cy.get('[data-test=needToLogin]').should('be.visible')
     
    // Can login
    cy.get('#login-modal').click()
    cy.get('#user-info').should('be.visible')
    cy.get('#email').type('trynat@email.com')
    cy.get('#user_password').type('trynapassword')
    cy.get('#login').click()
    cy.get('[data-test=home]').should('be.visible')
    cy.get('[data-test=home]').click()
    cy.get('#console-container').should('be.visible')
    cy.get('[data-test=username').should('contain', 'Tryna')
    cy.get('[data-test=needToLogin]').should('be.visible')
   
  })

  it('Should be able to logout', () => {
    cy.get('[data-test=logout]').click()
    cy.get('[data-test=needToLogin]').should('be.visible')
  })
  
})