'use strict';
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/require-mobile-in-mobileapp-events'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});
var ruleTester = new RuleTester();
ruleTester.run('require-mobile-in-mobileapp-events', rule, {
  valid: ['trackCall("Mobile: Test");', 'anyotherfunction("Event")'],

  invalid: [
    {
      code: `trackCall("Test");`,
      errors: [
        {
          message:
            'All mobile app events should start with "Mobile:". Got "Test"',
          type: 'ExpressionStatement',
        },
      ],
    },
  ],
});
