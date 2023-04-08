module.exports = {
  plugins: ["eslint-plugin-prettier"],
  ignorePatterns: [
    "tailwind.config.cjs",
    "astro.config.mjs",
    "plopfile.cjs",
    "postcss.config.js",
    "dist/**/*",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        doubleQuote: true,
        endOfLine: "auto",
      },
    ],
  },
  extends: ["plugin:prettier/recommended"],
  overrides: [
    {
      // ASTRO CONFIG
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
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
        "no-empty-pattern": "off",
      },
    },
    {
      // TS/REACT CONFIG
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
        "no-empty-pattern": "off",
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
  ],
};
