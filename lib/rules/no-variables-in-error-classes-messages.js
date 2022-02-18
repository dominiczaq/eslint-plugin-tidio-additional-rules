/**
 * @fileoverview Disallow using string variables in error exceptions messages
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'Disallow using variables in error message constructor.',
            category: 'Stylistic Issues',
            recommended: false
        },
        fixable: null, // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {
        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            NoVariablesInErrorClassMessages(node) {
                if (context.getFilename().includes('.test.')) {
                    return undefined;
                }

                let isInstanceOfError = node.heritageClauses &&
                    node.heritageClauses[0] &&
                    node.heritageClauses[0].types &&
                    node.heritageClauses[0].types[0] &&
                    node.heritageClauses[0].types[0].expression.escapedText === 'Error';

                let isConstructorMessage = node.members &&
                    node.members[0].type === 'Constructor' &&
                    node.members[0].parameters &&
                    //first parameter of constructor (for error => message)
                    node.members[0].parameters[0];

                let isStringLiteral = false;

                if(isInstanceOfError && isConstructorMessage) {
                    isStringLiteral = node.arguments[0] && node.arguments[0].type === 'StringLiteral';
                }

                if (!isStringLiteral) {
                    context.report({
                        node: node,
                        message: 'Error constructor message should consists of string literal only.'
                    });
                }
            }
        };
    }
};
