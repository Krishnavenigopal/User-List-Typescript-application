// cypress/integration/user.spec.ts 

describe('User Functionality', () => {
     it('Should display users', () => { 
        cy.visit('http://localhost:3000/'); // Visit the homepage 
        
        
        cy.get('#user-list-block').should('exist'); // Ensure the user list is displayed 
    }); 

    it('Should check for api calls for user api', () => { 
      cy.intercept({
         method: 'GET',
         url: "https://jsonplaceholder.typicode.com/users",
       }).as('usersCheck')

      cy.visit('http://localhost:3000/'); // Visit the homepage 
             
      cy.wait('@usersCheck').then((interception) => {
         assert.isNotNull(interception.response?.body, 'User API call has data')
       }) // Ensure the user api is called and has value
    }); 


    it('Should display name and address', () => { 
      cy.visit('http://localhost:3000/'); // Visit the homepage 
      cy.get('#user-list-name').should('exist'); // Ensure the user name is displayed 
      cy.get('#user-list-address').should('exist'); // Ensure the user address is displayed
  }); 

  it('Should check for api calls for album and photo upon selecting a user', () => { 
   cy.intercept({
      method: 'GET',
      url: "https://jsonplaceholder.typicode.com/albums",
    }).as('albumsCheck')

    cy.intercept({
      method: 'GET',
      url: "https://jsonplaceholder.typicode.com/photos",
    }).as('photosCheck')

   cy.visit('http://localhost:3000/'); // Visit the homepage 

   cy.get('#user-list-block').should('exist'); // Ensure the user list is displayed 
   cy.get('#user-list-name').first().click(); // Click on the first user 
          
   cy.wait('@albumsCheck').then((interception) => {
      assert.isNotNull(interception.response?.body, 'Album API call has data')
    }) // Ensure the album list is displayed 

    cy.wait('@photosCheck').then((interception) => {
      assert.isNotNull(interception.response?.body, 'Photo API call has data')
    }) // Ensure the photo list is displayed 
   }); 
    
    it('Should display albums and photos for a selected user', () => { 
        cy.visit('http://localhost:3000/'); // Visit the homepage 
        
        cy.get('#user-list-block').should('exist'); // Ensure the user list is displayed 
        cy.get('#user-list-name').first().click(); // Click on the first user 
        cy.get('#album-list').should('exist'); // Ensure the album list is displayed for that selected user
        cy.get('#photo-list').should('exist'); // Ensure the photo list is displayed for that selected user
    });
 });