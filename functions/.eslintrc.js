module.exports = {
  root: true, // This stops ESLint from looking at your root Next.js config
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // Standard for TS
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
  ],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0, // Prevents false alarms on Firebase imports
  },
};