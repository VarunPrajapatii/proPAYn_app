/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@propayn/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    'turbo/no-undeclared-env-vars': [
      'error',
      {
        allowList: [
          'JWT_SECRET',
          'NEXTAUTH_URL',
          'PAYMENT_GATEWAY_URL',
          'PAYMENT_GATEWAY_API_KEY',
          'PAYMENT_GATEWAY_SECRET',
          'SESSION_SECRET',
          'NEXTAUTH_SECRET'
        ],
      },
    ],
  },
};
