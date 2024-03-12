// cypress/integration/user.spec.ts 

describe('App Functionality', () => {
    it('Should display users', () => { 
       cy.visit('http://localhost:3000/'); // Visit the homepage 
       
       
       cy.get('#user-list-block').should('exist'); // Ensure the user list is displayed 
   }); 

})