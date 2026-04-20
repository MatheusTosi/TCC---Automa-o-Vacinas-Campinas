describe('Portal Vacina Campinas - validação de rotas', () => {
  const paginas = [
    {
      nome: 'Início',
      rota: '/inicio',
      textoEsperado: /vacina campinas|vacinação|vacina/i,
    },
    {
      nome: 'Qual vacina tomar',
      rota: '/qual-vacina-devo-tomar',
      textoEsperado: /qual vacina|vacina/i,
    },
    {
      nome: 'Locais e horários das salas de vacinação',
      rota: '/locais-e-horarios-das-salas-de-vacinacao',
      textoEsperado: /locais|horários|salas de vacinação/i,
    },
    {
      nome: 'Caderneta e comprovante de vacinação',
      rota: '/caderneta-de-vacinacao',
      textoEsperado: /caderneta|comprovante|vacinação/i,
    },
    {
      nome: 'Campanhas de vacinação',
      rota: '/campanhas-de-vacinacao',
      textoEsperado: /campanhas|vacinação/i,
    },
    {
      nome: 'Vacina sem fake news',
      rota: '/dicas-para-evitar-noticias-falsas',
      textoEsperado: /fake news|notícias falsas|vacina/i,
    },
    {
      nome: 'Conteúdo para gestores e profissionais de saúde',
      rota: '/gestores-e-profissionais-de-saude',
      textoEsperado: /gestores|profissionais de saúde|saúde/i,
    },
  ];

  paginas.forEach((pagina) => {
    it(`deve carregar a página: ${pagina.nome}`, () => {
      cy.acessarSecaoPorRota(pagina.rota);
      cy.contains('body', pagina.textoEsperado).should('be.visible');
    });
  });
});