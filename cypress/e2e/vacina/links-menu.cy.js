describe('Portal Vacina Campinas - integridade dos links do menu lateral', () => {
  const getMenuVisivel = () =>
    cy.get('nav.menu-padrao-sem-fundo:visible', { timeout: 15000 }).first();

  const expandirPainelSeNecessario = (textoPainel) => {
    getMenuVisivel()
      .contains('mat-expansion-panel-header', new RegExp(textoPainel, 'i'), {
        timeout: 10000,
      })
      .then(($painel) => {
        const expandido = $painel.attr('aria-expanded');

        if (expandido === 'false') {
          cy.wrap($painel).click({ force: true });
        }
      });

    getMenuVisivel()
      .contains('mat-expansion-panel-header', new RegExp(textoPainel, 'i'), {
        timeout: 10000,
      })
      .should('have.attr', 'aria-expanded', 'true');
  };

  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.visit('/inicio');
    cy.get('body').should('be.visible');
    getMenuVisivel().should('exist');
  });

  it('deve validar os hrefs dos links diretos do menu', () => {
    const hrefsEsperados = [
      '/sites/vacina/inicio',
      '/sites/vacina/locais-e-horarios-de-vacinacao',
      '/sites/vacina/caderneta-de-vacinacao',
      '/sites/vacina/dicas-para-evitar-noticias-falsas',
      '/sites/vacina/gestores-e-profissionais-de-saude',
    ];

    getMenuVisivel()
      .find('a.item-menu:visible')
      .then(($links) => {
        const hrefsEncontrados = [...$links].map((el) => el.getAttribute('href'));

        hrefsEsperados.forEach((hrefEsperado) => {
          expect(hrefsEncontrados).to.include(hrefEsperado);
        });
      });
  });

  it('deve validar o href do submenu "Vacina por idade e grupos"', () => {
    expandirPainelSeNecessario('qual vacina devo tomar');

    getMenuVisivel()
      .contains('a.item-menu', /vacina por idade e grupos/i, { timeout: 10000 })
      .should('have.attr', 'href')
      .and('include', '/sites/vacina/idade-e-grupos');
  });

  it('deve expandir o painel "Campanhas de Vacinação"', () => {
    getMenuVisivel()
      .contains('mat-expansion-panel-header', /campanhas de vacinação/i, {
        timeout: 10000,
      })
      .should('have.attr', 'aria-expanded');

    expandirPainelSeNecessario('campanhas de vacinação');
  });

  it('deve validar os links internos do painel "Campanhas de Vacinação"', () => {
  expandirPainelSeNecessario('campanhas de vacinação');

  getMenuVisivel()
    .find('a.item-menu:visible')
    .then(($links) => {
      const linksValidos = [...$links]
        .map((el) => ({
          texto: el.innerText.trim(),
          href: el.getAttribute('href'),
        }))
        .filter((item) => item.texto && item.href);

      expect(linksValidos.length).to.be.greaterThan(0);

      linksValidos.forEach((item) => {
        expect(item.href).to.not.be.empty;
      });
    });
});
});