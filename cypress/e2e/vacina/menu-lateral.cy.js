describe('Portal Vacina Campinas - menu lateral', () => {
  const getMenuVisivel = () =>
    cy.get('nav.menu-padrao-sem-fundo:visible', { timeout: 15000 }).first();

  const clicarEntradaMenu = (texto) => {
    const regex = new RegExp(texto, 'i');

    getMenuVisivel().then(($menu) => {
      const linkDireto = [...$menu.find('a.item-menu')].find((el) =>
        regex.test(el.innerText.trim())
      );

      if (linkDireto) {
        cy.wrap(linkDireto).click({ force: true });
        return;
      }

      const painelExpansivel = [...$menu.find('mat-expansion-panel-header')].find((el) =>
        regex.test(el.innerText.trim())
      );

      if (painelExpansivel) {
        cy.wrap(painelExpansivel).click({ force: true });
        return;
      }

      const noArvore = [...$menu.find('mat-tree-node')].find((el) =>
        regex.test(el.innerText.trim())
      );

      if (noArvore) {
        cy.wrap(noArvore).click({ force: true });
        return;
      }

      throw new Error(`Não foi possível encontrar a entrada de menu com o texto: ${texto}`);
    });
  };

  const expandirPainelSeNecessario = (textoPainel) => {
    getMenuVisivel()
      .contains(
        'mat-expansion-panel-header',
        new RegExp(textoPainel, 'i'),
        { timeout: 10000 }
      )
      .then(($painel) => {
        const expandido = $painel.attr('aria-expanded');

        if (expandido === 'false') {
          cy.wrap($painel).click({ force: true });
        }
      });

    getMenuVisivel()
      .contains(
        'mat-expansion-panel-header',
        new RegExp(textoPainel, 'i'),
        { timeout: 10000 }
      )
      .should('have.attr', 'aria-expanded', 'true');
  };

  const clicarItemDentroDoPainel = (textoPainel, textoItem) => {
    expandirPainelSeNecessario(textoPainel);

    getMenuVisivel()
      .contains('a.item-menu', new RegExp(textoItem, 'i'), { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
  };

  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.visit('/inicio');
    cy.get('body').should('be.visible');
    cy.title().should('not.be.empty');
    getMenuVisivel().should('exist');
  });

  it('deve exibir os itens principais do menu lateral', () => {
    getMenuVisivel().contains(/início/i).should('be.visible');
    getMenuVisivel().contains(/qual vacina devo tomar/i).should('be.visible');
    getMenuVisivel().contains(/locais e horários/i).should('be.visible');
    getMenuVisivel().contains(/caderneta e comprovante/i).should('be.visible');
    getMenuVisivel().contains(/campanhas de vacinação/i).should('be.visible');
    getMenuVisivel().contains(/vacina sem fake news/i).should('be.visible');
    getMenuVisivel().contains(/gestores e profissionais/i).should('be.visible');
  });

  it('deve navegar para a seção "Início"', () => {
    clicarEntradaMenu('início');

    cy.url().should('include', '/inicio');
    cy.contains(/vacina campinas|vacinação|vacina/i, { timeout: 10000 }).should('be.visible');
  });

  it('deve expandir o grupo e acessar "Vacina por idade e grupos"', () => {
    clicarItemDentroDoPainel('qual vacina devo tomar', 'vacina por idade e grupos');

    cy.url().should('include', '/idade-e-grupos');
    cy.contains(/idade|grupos|vacina/i, { timeout: 10000 }).should('be.visible');
  });

  it('deve acessar a seção "Locais e horários das salas de vacinação"', () => {
    clicarEntradaMenu('locais e horários');

    cy.contains(/locais|horários|salas de vacinação/i, { timeout: 10000 }).should('be.visible');
  });

  it('deve acessar a seção "Caderneta e comprovante de vacinação"', () => {
    clicarEntradaMenu('caderneta e comprovante');

    cy.contains(/caderneta|comprovante|vacinação/i, { timeout: 10000 }).should('be.visible');
  });

  it('deve acessar a seção "Campanhas de vacinação"', () => {
    clicarEntradaMenu('campanhas de vacinação');

    cy.contains(/campanhas|vacinação/i, { timeout: 10000 }).should('be.visible');
  });

  it('deve acessar a seção "Vacina sem fake news"', () => {
    clicarEntradaMenu('vacina sem fake news');

    cy.contains(/fake news|notícias falsas|vacina/i, { timeout: 10000 }).should('be.visible');
  });

  it('deve acessar a seção "Conteúdo para gestores e profissionais de saúde"', () => {
  clicarEntradaMenu('gestores e profissionais');

  cy.url().should('include', '/gestores-e-profissionais-de-saude');
  cy.get('h1:visible, h2:visible, h3:visible, p:visible, a:visible, span:visible', {
    timeout: 10000
  })
    .contains(/gestores|profissionais de saúde|saúde/i)
    .should('be.visible');
});
});