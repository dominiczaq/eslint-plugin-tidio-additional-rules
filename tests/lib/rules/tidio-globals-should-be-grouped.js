/**
 * @fileoverview Require grouping tidio imports
 * @author tidio-globals-should-be-grouped
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/tidio-globals-should-be-grouped'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});
var ruleTester = new RuleTester();
ruleTester.run('tidio-globals-should-be-grouped', rule, {
  valid: [
    `import React from 'react';
    import store from 'store';
    import operatorsStore from 'store/operators/selectors';
    import visitorsReducer from 'store/visitors';
    import visitorStoreActions from 'store/visitors/actions';
    import visitorStoreSelectors from 'store/visitors/selectors';
    import projectStoreSelectors from 'store/project/selectors';
    import design from 'design';`,
    `import React from 'react';
    import operatorsStore from 'store/operators/selectors';
    import visitorsReducer from 'store/visitors';
    import visitorStoreActions from 'store/visitors/actions';
    import visitorStoreSelectors from 'store/visitors/selectors';
    import store from 'store';
    import projectStoreSelectors from 'store/project/selectors';
    import design from 'design';`
  ],

  invalid: [
    {
      code: `import visitorsActions from 'store/visitors/actions';
    import design from 'design';
    import visitorsReducer from 'store/visitors';
    import visitorStoreSelectors from 'store/visitors/selectors';`,
      errors: [
        {
          message:
            "'design' import should occur after 'store/visitors/selectors'",
          type: 'ImportDeclaration'
        }
      ]
    },
    {
      code: `import visitorsReducer from 'store/visitors/actions';
      import operatorsStore from 'store/operators/selectors';
      import visitorStoreSelectors from 'store/visitors/selectors';`,
      errors: [
        {
          message:
            "'store/operators/selectors' import should occur after 'store/visitors/selectors'",
          type: 'ImportDeclaration'
        }
      ]
    },
    {
      code: `import visitorsSelectors from 'store/visitors/selectors';
      import store from 'store';
      import immutableTypings from 'store/typings/immutableExtensions';
      import operatorsSelectors from 'store/operators/selectors';
      import operatorsActions from 'store/operators/actions';
      import visitorsActions from 'store/visitors/actions';
      import conversationsSelectors from 'store/conversations/selectors';
      import applicationSelectors from 'store/application/actions';
      import tidioTypings from 'store/typings/TidioTypings';
      import visitorTypingsActions from 'store/visitorsTypings/actions';`,
      errors: [
        {
          message: "'store' import should occur after 'store/visitors/actions'",
          type: 'ImportDeclaration'
        },
        {
          message:
            "'store/typings/immutableExtensions' import should occur after 'store/visitors/actions'",
          type: 'ImportDeclaration'
        },
        {
          message:
            "'store/operators/selectors' import should occur after 'store/visitors/actions'",
          type: 'ImportDeclaration'
        },
        {
          message:
            "'store/operators/actions' import should occur after 'store/visitors/actions'",
          type: 'ImportDeclaration'
        }
      ]
    },
    {
      code: `import store1 from 'store/typings/one';
      import store from 'store';
      import store2 from 'store/typings/two';`,
      errors: [
        {
          message: "'store' import should occur after 'store/typings/two'",
          type: 'ImportDeclaration'
        }
      ]
    }
  ]
});
