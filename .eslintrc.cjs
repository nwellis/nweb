// Example https://github.com/ixartz/Astro-boilerplate/blob/main/.eslintrc
module.exports = {
  // Configuration for JavaScript files
  plugins: ["astro", "eslint-plugin-prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        doubleQuote: true,
        endOfLine: "auto",
      },
    ],
  },
  extends: ["plugin:astro/recommended"],
  // ...
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      plugins: ["@typescript-eslint", "react", "jsx-a11y"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:react/recommended",
      ],
      settings: {
        react: {
          version: "detect",
        },
      },
      parserOptions: {
        project: "./tsconfig.json",
      },
      rules: {
        "prettier/prettier": [
          "error",
          {
            doubleQuote: true,
            endOfLine: "auto",
          },
        ],
        // Note: you must disable the base rule as it can report incorrect errors
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "react/no-unknown-property": "off", // ThreeJS and this do not play nicely
        "react/prop-types": [
          "error",
          {
            ignore: ["className", "children"],
          },
        ],
      },
    },
    {
      files: ["*.astro"],
      plugins: ["@typescript-eslint", "jsx-a11y"],
      parser: "astro-eslint-parser",
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        "prettier/prettier": [
          "error",
          {
            doubleQuote: true,
            endOfLine: "auto",
          },
        ],
        "@typescript-eslint/no-empty-interface": "off",
      },
    },
  ],
};
