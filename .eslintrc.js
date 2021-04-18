const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules)
  .reduce((acc, rule) => { acc[`jsx-a11y/${rule}`] = 'off'; return acc }, {})

const strict = process.env.STRICT === 'true';

module.exports = {
  "extends": ["@ijsto", "airbnb/hooks"],
  "globals": {
    "UIkit": "readonly"
  },
  "plugins": ["unused-imports"],
  "rules": {
    ...a11yOff, // disable for now
    "consistent-return": "off",
    "import/extensions": "off",
    "import/no-cycle": [0, { ignoreExternal: true }],
    "import/no-unresolved": ["error", { "ignore": ["^@"] }],
    "jsx-a11y/anchor-is-valid": "off",
    "no-else-return": "off",
    "no-param-reassign": strict ? "warn" : "off",
    "no-shadow": strict ? "warn" : "off",
    "no-use-before-define": [1, "nofunc"],
    "prefer-const": "off",
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    ],
    "react/jsx-props-no-spreading": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "sort-keys": "off",
    // unused-imports related:
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ]
  }
}