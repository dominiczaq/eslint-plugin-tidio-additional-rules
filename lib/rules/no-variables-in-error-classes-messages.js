/**
 * @fileoverview Disallow using variables in error exceptions messages
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'Disallow using variables in error class message constructor.',
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
            ExpressionStatement(node) {
                if (context.getFilename().includes('.test.')) {
                    return undefined;
                }

                let isStringLiteral = false;
                const isErrorDeclaration = node.expression.type === 'NewExpression' && node.expression.callee.name.includes('Error');

                if(isErrorDeclaration) {
                    isStringLiteral = node.expression.arguments.length > 0 && node.expression.arguments[0].type === 'Literal';

                    if (!isStringLiteral) {
                        context.report({
                            node: node,
                            message: 'Variables shouldn\'t be used in error message.'
                        });
                    }
                }
            }
        };
    }
};
