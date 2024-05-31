
describe('Projet Trello Groupe 2', () => {
  
  beforeEach(()=> {
    //Connexion
    cy.visit('https://trello.com/b/eqI3vDw6');
    cy.wait(1000);
    cy.get('a').contains('Connexion').click();
    cy.wait(3000);
    cy.origin('https://id.atlassian.com/', () => {
        cy.get('[name="username"]').type('groupe2wcs@hotmail.com');
        cy.get("#login-submit").click();
        cy.get("#password").type("Z12a456-");
        cy.get("#login-submit").click();
    });
    cy.wait(10000);
  });

  /* ***********************
    CARD CREATION
  ************************* */
  it('Création des cartes sur le tableau Trello', () => {

    cy.fixture("data").as("infos");

    cy.get("@infos").then((info)=>{
      info.forEach((inf)=>{
        
        cy.get('[data-testid="list"]').contains('Backlog').then((h2Backlog)=>{
          
          // Get parent list
          let listBacklog = cy.get(h2Backlog).parent().parent().parent();
          
          // Add card
          listBacklog.find('[data-testid="list-add-card-button"]').click();
          cy.get("[data-testid='list-card-composer-textarea']").type(inf.title + '{enter}');
          cy.wait(1000);
        });

        /* ***********************
            FILL DESCRIPTION
         ************************* */
        // Open Card Details
        cy.get('[data-testid="card-name"]').contains(inf.title).click();
        cy.wait(2000);

        // Find the Description Element and fill data
        cy.get('[data-testid="click-wrapper"]').should('be.visible').click();
        cy.get('#ak-editor-textarea').type(inf.description);
        // Save card
        cy.get('[data-testid="editor-save-button"]').click();
        // Close Card Details Window
        cy.get('[aria-label="Fermer la boîte de dialogue"]').click();
        cy.wait(1000);
      })
    });

  });

  /* ***********************
    CARD REORGANIZATION
  ************************* */
  it('Drag n Drop des cartes', () => {
    cy.wait(5000);

    /* **************************
    ELABORER UN PLAN DE TEST
    ************************** */
    dragToTarget('Elaborer un plan de test', 'Done');

 
    /* **************************
    CONCEVOIR LES CAS DE TEST
    ************************** */
    dragToTarget('Concevoir les cas de test', 'Done');
    
    /* **************************
    ELABORER UN PLAN DE TEST
    ************************** */
    dragToTarget('Automatiser des tests de régression', 'In Review');
   
    /* ********************************
    EXECUTER DES TESTS FONCTIONNELS
    ******************************** */
    dragToTarget('Exécuter des tests fonctionnels', 'In Progress');
   
    /* ********************************
    EXECUTER DES TESTS DE PERFORMANCE
    ******************************** */
    dragToTarget('Exécuter des tests de performance', 'To Do');
  
  });

  function dragToTarget(draggableElementTitle, dropTargetListName) {
    // Grab draggable element
    cy.get('[data-testid="card-name"]')
      .contains(draggableElementTitle)
      .parent().parent().parent()
      .should('have.attr', 'draggable', 'true').as('draggable');

    // Fetch "To Do" list (drop target)
    cy.get('[data-testid="list"]')
    .contains(dropTargetListName)
    .parent().parent().parent()
    .should('have.attr', 'data-drop-target-for-external', 'true').as('dropTarget');

    // Do the drag'n'drop
    cy.get('@draggable').drag('@dropTarget', {force:true});
  }
});