module.exports = {
  //ignorar estas duas pastas
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  //
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],
  //transformar todas os arquivos de typescript para js para o jest processar
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  //em que ambiente meu test esta executando para criar o ambiente de teste simulado
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy"
  },
  //cobertura de testes na aplicacao
  //rodar com npm run test --coverage 
  //acessar o relatorio em ./coverage/index.html
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx",
    "!src/**/_app.tsx",
    "!src/**/_document.tsx",
  ],
  coverageReporters: ["lcov", "json"]
};