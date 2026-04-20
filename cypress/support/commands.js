Cypress.Commands.add('obterMenuLateralVisivel', () => {
  cy.get('nav.menu-padrao-sem-fundo:visible', { timeout: 15000 })
    .first()
    .as('menuLateral');
});

Cypress.Commands.add('expandirGrupoMenuSeNecessario', (textoGrupo) => {
  cy.get('@menuLateral')
    .contains('mat-tree-node', new RegExp(textoGrupo, 'i'), { timeout: 10000 })
    .as('grupoMenu');

  cy.get('@grupoMenu').then(($grupo) => {
    const expandivel = $grupo.attr('aria-expanded');

    if (expandivel === 'false') {
      cy.wrap($grupo).click({ force: true });
      cy.wrap($grupo).should('have.attr', 'aria-expanded', 'true');
    }
  });
});

Cypress.Commands.add('clicarNoItemDoMenu', (textoItem) => {
  cy.get('@menuLateral')
    .contains('a.item-menu', new RegExp(textoItem, 'i'), { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });
});