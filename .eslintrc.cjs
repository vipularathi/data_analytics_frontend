module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  plugins: ["react-refresh", "mobx", "@tanstack/query", "unused-imports"],
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:mobx/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    quotes: [
      "warn",
      "double",
      {
        allowTemplateLiterals: true,
      },
    ],
    "jsx-quotes": ["warn", "prefer-double"],
    "unused-imports/no-unused-imports": "error",

    // Mobx [https://www.npmjs.com/package/eslint-plugin-mobx]
    "mobx/exhaustive-make-observable": "warn",
    "mobx/unconditional-make-observable": "error",
    "mobx/missing-make-observable": "error",
    "mobx/missing-observer": "off",

    // React Query [https://tanstack.com/query/v5/docs/eslint/eslint-plugin-query]
    "@tanstack/query/exhaustive-deps": "error",
    "@tanstack/query/no-rest-destructuring": "warn",
    "@tanstack/query/stable-query-client": "error",

    // unused-imports [https://www.npmjs.com/package/eslint-plugin-unused-imports]
    "no-unused-vars": "warn",
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
      },
    ],

    "import/prefer-default-export": "off",
    "linebreak-style": "off",
    "lines-between-class-members": "off",
    "no-underscore-dangle": "off",
    "object-curly-newline": "off",
    "class-methods-use-this": "off",
    "import/no-extraneous-dependencies": "off",
    "react/prop-types": "off"
  },
};
