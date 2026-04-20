describe('Portal Vacina Campinas - integridade dos links do menu', () => {
  beforeEach(() => {
    cy.abrirPortalVacina();
    cy.validarPaginaBasica();
  });

  it('deve validar que os links principais do menu possuem href', () => {
    const itens = [
      /qual vacina/i,
      /locais.*horários/i,
      /caderneta.*comprovante/i,
      /campanhas/i,
      /fake news/i,
      /gestores.*profissionais/i,
    ];

    itens.forEach((item) => {
      cy.contains('a', item)
        .should('have.attr', 'href')
        .and('not.be.empty');
    });
  });
});