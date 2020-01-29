// https://docs.cypress.io/api/introduction/api.html

//TODO - Get slider specifc point and test popup functionality

describe('User input to marker and popup showing', () => {
  it('Visits the app root url', () => {
    cy.visit('http://localhost:8080/')
    
    cy.get('.v-slider').type('1')
    cy.get('.submitButton').click()
      .then( () => {
        cy
          .get('.leaflet-marker-icon')
      })
  })
})
