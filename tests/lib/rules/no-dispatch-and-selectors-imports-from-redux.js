'use strict';
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-dispatch-and-selectors-imports-from-redux'),
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
ruleTester.run('no-dispatch-and-selectors-imports-from-redux', rule, {
    valid: [
        {
            code: `import { useAppDispatch } from '../../../panelStore/hooks'`,
            filename: 'packages/webApp/Main.jsx',
            options: [{ module: 'webApp' }],
        },
        {
            code: `import { useAppSelector } from '../../../panelStore/hooks'`,
            filename: 'packages/mobileApp/Main.jsx',
            options: [{ module: 'mobileApp' }],
        },
        {
            code: `import { useDispatch, useSelector } from 'react-redux';`,
            filename: 'packages/utils/index.ts',
            options: [{ module: 'webApp' }],
        },
    ],
    invalid: [
        {
            code: `import { useSelector } from 'react-redux'`,
            filename: 'packages/webApp/Main.jsx',
            options: [{ module: 'webApp' }],
            errors: [
                {
                    message: "useSelector should not be used in webApp, use useAppSelector instead",
                    type: "ImportDeclaration"
                }
            ]
        },
        {
            code: `import { useDispatch } from 'react-redux'`,
            filename: 'packages/mobileApp/Main.jsx',
            options: [{ module: 'mobileApp' }],
            errors: [
                {
                    message: "useDispatch should not be used in mobileApp, use useAppDispatch instead",
                    type: "ImportDeclaration"
                }
            ]
        },
        {
            code: `import { useDispatch, useSelector, Provider } from 'react-redux'`,
            filename: 'packages/webApp/Main.jsx',
            options: [{ module: 'webApp' }],
            errors: [
                {
                    message: "useDispatch, useSelector should not be used in webApp, use useAppDispatch, useAppSelector instead",
                    type: "ImportDeclaration"
                }
            ]
        },
    ],
});
