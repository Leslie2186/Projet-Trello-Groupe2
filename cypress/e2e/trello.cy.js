describe('Projet Trello Groupe 2', () => {
  it('Création des cartes sur le tableau Trello', () => {
    cy.visit('https://trello.com/home');

    //Connexion
    cy.get("[data-uuid='MJFtCCgVhXrVl7v9HA7EH_login']").click();
    cy.wait(3000);
    cy.origin('https://id.atlassian.com/', () => {
      cy.get('[name="username"]').type('groupe2wcs@hotmail.com');
      cy.get("#login-submit").click();
      cy.get("#password").type("Z12a456-");
      cy.get("#login-submit").click();
    });

    //Arriver sur tableau Trello
    cy.url().should("include", "/boards");
    cy.get("[href='/b/eqI3vDw6/projet-trello']").click();
    cy.wait(5000);
    cy.get("[data-list-id='66572afd3d364b8829368a88']").find("[data-testid='list-add-card-button']").click();
    
    //Titre de la carte
    cy.get("[data-testid='list-card-composer-textarea']").type("Elaborer un plan de test");
    cy.wait(3000);
    cy.get(".T9JQSaXUsHTEzk").last().click();
    cy.wait(4000);

    //Desciption de la carte
    cy.get(".pN1gQpliLhvX5B").click({force: true});
    cy.get("#ak-editor-textarea").type("Elaborer un plan de test détaillé pour le projet");
    cy.get("[data-testid='editor-save-button']").click();
    cy.get("[aria-label='Fermer la boîte de dialogue']").click();

  });
});