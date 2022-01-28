'use strict';
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-components-import-in-store-or-utils'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
RuleTester.setDefaultConfig({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});
var ruleTester = new RuleTester();
ruleTester.run('no-components-import-in-store-or-utils', rule, {
  valid: [
    {
      code: `import Something from 'components/Test'`,
      filename: 'packages/webApp/Main.jsx',
    },
  ],

  invalid: [
    {
      code: `import Something from 'components/Test'`,
      filename: 'packages/store/index.js',
      errors: [
        {
          message: `Nothing from 'components/...' should be imported in 'store/...'`,
          type: 'ImportDeclaration',
        },
      ],
    },
    {
      code: `import Something from 'components/Test'`,
      filename: 'packages/utils/api/index.js',
      errors: [
        {
          message: `Nothing from 'components/...' should be imported in 'utils/...'`,
          type: 'ImportDeclaration',
        },
      ],
    },
  ],
});
