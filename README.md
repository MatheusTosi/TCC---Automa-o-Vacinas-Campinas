# Testes Automatizados com Cypress – Portal de Vacinação de Campinas

## Descrição

Este projeto tem como objetivo a análise técnica da qualidade do serviço de informação sobre vacinação disponibilizado pela Prefeitura de Campinas, por meio da aplicação de testes automatizados baseados na abordagem Behavior Driven Development (BDD), utilizando o framework Cypress.

O foco da automação está na validação da navegação, da integridade das informações e da consistência do conteúdo apresentado ao usuário.


## Objetivo

Avaliar a qualidade funcional do portal de vacinação, verificando:

- navegação entre páginas;
- funcionamento do menu lateral;
- acesso às principais seções;
- exibição de conteúdo informativo;
- comportamento de elementos dinâmicos da interface.

## Metodologia

O projeto foi desenvolvido seguindo as etapas:

1. Levantamento das funcionalidades do sistema;
2. Elaboração dos cenários de teste em BDD;
3. Estruturação dos casos de teste;
4. Seleção dos testes automatizáveis;
5. Implementação da automação com Cypress;
6. Execução dos testes e análise dos resultados.

## Estrutura do Projeto

cypress/
├── e2e/
│ ├── menu-lateral.cy.js
│ └── bdd/
│ └── portal-vacina.feature
├── support/
│ └── commands.js
└── cypress.config.js


---

## Testes Automatizados

Os testes automatizados cobrem os seguintes fluxos:

- acesso à página inicial;
- validação do menu lateral;
- navegação entre seções;
- expansão de menus dinâmicos;
- acesso às principais páginas do portal.

---

## BDD (Behavior Driven Development)

Os cenários de teste foram definidos utilizando a sintaxe Gherkin, no arquivo:
cypress/e2e/bdd/portal-vacina.feature


Exemplo de cenário:
gherkin
Cenário: Acessar campanhas de vacinação
  Dado que o usuário está no portal
  Quando o usuário seleciona a opção "Campanhas de vacinação"
  Então o sistema deve exibir informações sobre campanhas vigentes


Tecnologias Utilizadas
  JavaScript
  Cypress
  Node.js
  Visual Studio Code
  Gherkin (BDD)

Execução do Projeto

  Clonar o repositório
  git clone https://github.com/seu-usuario/seu-repositorio.git 
  
  Acessar a pasta do projeto
  cd seu-repositorio

  Instalar dependências
  npm install
  
Executar o Cypress

Modo interativo:
npx cypress open

Modo headless:
npx cypress run


Observações
O portal analisado possui natureza predominantemente informativa.
Não há funcionalidades transacionais no sistema (como agendamento).
Nem todos os cenários BDD foram automatizados, especialmente aqueles relacionados a critérios subjetivos, como clareza e legibilidade das informações.
Considerações Técnicas

Durante o desenvolvimento da automação, foram identificados alguns desafios:

componentes dinâmicos do Angular Material;
menus expansíveis controlados por atributos como aria-expanded;
presença de elementos ocultos no DOM;
necessidade de validar apenas elementos visíveis.

Para contornar esses pontos, foram adotadas estratégias como:

uso de seletores mais específicos;
validação explícita de visibilidade;
funções auxiliares reutilizáveis;
reconsulta do DOM após interações.
Autor

Matheus Tosi
Curso de Análise e Desenvolvimento de Sistemas – IFSP Campinas
Área de atuação: Qualidade de Software
