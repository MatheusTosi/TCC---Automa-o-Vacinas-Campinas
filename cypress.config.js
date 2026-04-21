const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: "zs5x69",
  e2e: {
    baseUrl: 'https://campinas.sp.gov.br/sites/vacina',
  },
});