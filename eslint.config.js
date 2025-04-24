module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.lint.json"],
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  settings: { react: { version: "detect" } },
  ignorePatterns: ["node_modules/", "dist/", "build/", "coverage/"],
  rules: {
    // Qui eventuali override custom
  },
  overrides: [
    {
      files: ["**/*.test.{ts,tsx,js,jsx}", "**/__mocks__/**"],
      env: { jest: true }
    }
  ]
};
