/**
 * @fileoverview Disallow using string templates for simple strings
 * @author no-unnecessary-template-strings
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-variables-in-error-classes-messages'),
    RuleTester = require('eslint').RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    }
});
var ruleTester = new RuleTester();
ruleTester.run('no-variables-in-error-classes-messages', rule, {
    valid: ['class TestError extends Error{constructor(r){super(r),this.name=this.constructor.name,Error.captureStackTrace(this,this.constructor)}}new TestError("BYCZQ");'],

    invalid: [
        {
            code: 'class TestError extends Error{constructor(r){super(r),this.name=this.constructor.name,Error.captureStackTrace(this,this.constructor)}}new TestError(`BYCZQ ${hello}`);',
            errors: [
                {
                    message: 'Simple string should be in instance of error message',
                    type: 'TemplateLiteral'
                }
            ]
        },
        {
            code: 'class TestError extends Error{constructor(r){super(r),this.name=this.constructor.name,Error.captureStackTrace(this,this.constructor)}}new TestError("BYCZQ" + hello);',
            errors: [
                {
                    message: 'Simple string should be in instance of error message',
                    type: 'TemplateLiteral'
                }
            ]
        }
    ]
});
