/*

,

  {
    "title" : "Concevoir les cas de test",
    "description" : "Rédiger des cas de test pour toutes les fonctionnalités principales de l’application"
  },

  {
    "title" : "Exécuter des tests fonctionnels",
    "description" : "Exécuter des tests fonctionnels pour vérifier que chaque fonctionnalité fonctionne correctement"
  },

  {
    "title" : "Automatiser des tests de régression",
    "description" : "Mettre en place des scripts d’automatisation pour les tests de régression"
  },

  {
    "title" : "Exécuter des tests de performance",
    "description" : "Exécuter des tests de performance pour évaluer la réactivité et la stabilité de l’application sous charge"
  }

*/

describe('Projet Trello Groupe 2', () => {
  
  before(()=> {
    //Connexion
    cy.visit('https://trello.com/home');
    cy.wait(1000);
    cy.get("[data-uuid='MJFtCCgVhXrVl7v9HA7EH_login']").click();
    cy.wait(3000);
    cy.origin('https://id.atlassian.com/', () => {
        cy.get('[name="username"]').type('groupe2wcs@hotmail.com');
        cy.get("#login-submit").click();
        cy.get("#password").type("Z12a456-");
        cy.get("#login-submit").click();
    });
  });

  it.skip('Création des cartes sur le tableau Trello', () => {
    cy.fixture("data").as("infos");
    //Arriver sur tableau Trello
    cy.url().should("include", "/boards");
    cy.get("[href='/b/eqI3vDw6/projet-trello']").click();
    cy.wait(5000);

    cy.get("@infos").then((info)=>{
      info.forEach((inf)=>{
        // cy.get("[data-list-id='66572afd3d364b8829368a88']").find("[data-testid='list-add-card-button']").click();
        
        console.log("Current data: " + inf.title);

        cy.get('[data-testid="list"]').contains('Backlog').then((h2Backlog)=>{
          
          // Get parent list
          let listBacklog = cy.get(h2Backlog).parent().parent().parent();
          
          // Add card
          listBacklog.find('[data-testid="list-add-card-button"]').click();
          cy.get("[data-testid='list-card-composer-textarea']").type(inf.title + '{enter}');
          cy.wait(1000);
        });

        // Description
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
        /*
        //Titre de la carte
        cy.get("[data-testid='list-card-composer-textarea']").type(inf.title);
        cy.wait(3000);
        cy.get(".T9JQSaXUsHTEzk").last().click();
        cy.wait(4000);
        */

        /*
        //Desciption de la carte
        cy.get(".pN1gQpliLhvX5B").click({force: true});
        cy.get("#ak-editor-textarea").type(inf.description);
        cy.get("[data-testid='editor-save-button']").click();
        cy.get("[aria-label='Fermer la boîte de dialogue']").click();
        */
      })
    });

  });

  it('', () => {
    
  });

});