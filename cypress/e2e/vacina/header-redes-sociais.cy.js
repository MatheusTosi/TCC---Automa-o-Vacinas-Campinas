describe('Portal Vacina Campinas - links do cabeçalho', () => {
  const getHeaderContainer = () =>
    cy.get('.ima-header-pmc', { timeout: 15000 }).should('be.visible');

  const getBlocoSocial = () =>
    getHeaderContainer()
      .find('.flex.items-center.col-gap-2.ajuste-contraste')
      .should('be.visible');

  const linksInstitucionais = [
    {
      nome: 'Diário Oficial',
      seletor: () => getHeaderContainer().contains('a.btns-pmc', /diário oficial/i),
      href: 'https://campinas.sp.gov.br/diariooficial',
      urlEsperada: '/diariooficial',
    },
    {
      nome: 'Serviços',
      seletor: () => getHeaderContainer().contains('a.btns-pmc', /serviços/i),
      href: 'https://campinas.sp.gov.br/servicos',
      urlEsperada: '/servicos',
    },
    {
      nome: 'Legislação',
      seletor: () => getHeaderContainer().contains('a.btns-pmc', /legislação/i),
      href: 'https://campinas.sp.gov.br/bibliotecajuridica',
      urlEsperada: '/bibliotecajuridica',
    },
    {
      nome: 'Sou Servidor',
      seletor: () => getHeaderContainer().contains('a.btns-pmc', /sou servidor/i),
      href: 'https://campinas.sp.gov.br/souservidor',
      urlEsperada: '/souservidor',
    },
    {
      nome: 'Transparência',
      seletor: () => getHeaderContainer().contains('a.btns-pmc', /transparência/i),
      href: 'https://campinas.sp.gov.br/transparencia',
      urlEsperada: '/transparencia',
    },
    {
      nome: 'Acessibilidade',
      seletor: () => getHeaderContainer().contains('a.btns-pmc', /acessibilidade/i),
      href: 'https://campinas.sp.gov.br/acessibilidade',
      urlEsperada: '/acessibilidade',
    },
  ];

  const linksSociais = [
    {
      nome: 'Facebook',
      seletor: () => getBlocoSocial().find('a[aria-label="Facebook"]'),
      href: 'https://www.facebook.com/prefeituradecampinas',
      origin: 'https://www.facebook.com',
      trechoUrl: 'facebook.com/prefeituradecampinas',
    },
    {
      nome: 'Fotos Campinas',
      seletor: () => getBlocoSocial().find('a[aria-label="Fotos Campinas"]'),
      href: 'https://fotos.campinas.sp.gov.br/',
      origin: 'https://fotos.campinas.sp.gov.br',
      trechoUrl: 'fotos.campinas.sp.gov.br',
    },
    {
      nome: 'Youtube',
      seletor: () => getBlocoSocial().find('a[aria-label="Youtube"]'),
      href: 'https://www.youtube.com/channel/UCHUgn8tkQq9oJOSJa5PF0Ug',
      origin: 'https://www.youtube.com',
      trechoUrl: '/channel/UCHUgn8tkQq9oJOSJa5PF0Ug',
    },
    {
      nome: 'Instagram',
      seletor: () => getBlocoSocial().find('a[aria-label="Instagram"]'),
      href: 'https://www.instagram.com/prefcampinas',
      origin: 'https://www.instagram.com',
      trechoUrl: '/prefcampinas',
    },
  ];

  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.visit('/inicio');
    cy.get('body').should('be.visible');
    getHeaderContainer();
  });

  it('deve exibir os links institucionais do cabeçalho', () => {
    linksInstitucionais.forEach((link) => {
      link.seletor().should('be.visible');
    });
  });

  it('deve exibir os links sociais do cabeçalho', () => {
    linksSociais.forEach((link) => {
      link.seletor().should('be.visible');
    });
  });

  linksInstitucionais.forEach((link) => {
    it(`deve validar o href de ${link.nome}`, () => {
      link
        .seletor()
        .should('have.attr', 'href', link.href);
    });
  });

  linksSociais.forEach((link) => {
    it(`deve validar o href de ${link.nome}`, () => {
      link
        .seletor()
        .should('have.attr', 'href', link.href);
    });
  });

  linksInstitucionais.forEach((link) => {
    it(`deve redirecionar corretamente para ${link.nome}`, () => {
      link.seletor().click({ force: true });

      cy.location('href', { timeout: 15000 })
        .should('include', link.urlEsperada);
    });
  });

  linksSociais.forEach((link) => {
    it(`deve redirecionar corretamente para ${link.nome}`, () => {
      link.seletor()
        .should('have.attr', 'href', link.href)
        .click({ force: true });

      cy.origin(link.origin, { args: { trechoUrl: link.trechoUrl } }, ({ trechoUrl }) => {
        cy.location('href', { timeout: 20000 })
          .should('include', trechoUrl);
      });
    });
  });
});