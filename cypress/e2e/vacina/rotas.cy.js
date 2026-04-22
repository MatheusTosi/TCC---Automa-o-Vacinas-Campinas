describe('Portal Vacina Campinas - validação direta das rotas', () => {
  const paginas = [
    {
      nome: 'Início',
      rota: '/inicio',
      conteudo: /vacina campinas|vacinação|vacina/i,
    },
    {
      nome: 'Vacina por idade e grupos',
      rota: '/idade-e-grupos',
      conteudo: /idade|grupos|vacina/i,
    },
    {
      nome: 'Locais e horários das salas de vacinação',
      rota: '/locais-e-horarios-de-vacinacao',
      conteudo: /locais|horários|vacinação/i,
    },
    {
      nome: 'Caderneta e comprovante de vacinação',
      rota: '/caderneta-de-vacinacao',
      conteudo: /caderneta|comprovante|vacinação/i,
    },
    {
      nome: 'Vacina sem fake news',
      rota: '/dicas-para-evitar-noticias-falsas',
      conteudo: /fake news|notícias falsas|vacina/i,
    },
    {
      nome: 'Conteúdo para gestores e profissionais de saúde',
      rota: '/gestores-e-profissionais-de-saude',
      conteudo: /gestores|profissionais de saúde|saúde/i,
    },
  ];

  beforeEach(() => {
    cy.viewport(1440, 900);

    cy.on('uncaught:exception', (err) => {
      if (
        err.message.includes("Cannot read properties of null (reading 'document')")
      ) {
        return false;
      }
    });
  });

  paginas.forEach((pagina) => {
    it(`deve carregar corretamente a rota: ${pagina.nome}`, () => {
      cy.visit(pagina.rota, { failOnStatusCode: false });

      cy.get('body', { timeout: 15000 }).should('be.visible');
      cy.title().should('not.be.empty');

      cy.location('pathname', { timeout: 15000 }).should('include', pagina.rota);

      cy.get(
        'h1:visible, h2:visible, h3:visible, p:visible, a:visible, span:visible, li:visible',
        { timeout: 15000 }
      )
        .contains(pagina.conteudo)
        .should('be.visible');
    });
  });
});