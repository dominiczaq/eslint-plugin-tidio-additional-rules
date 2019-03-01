/**
 * @fileoverview Disallow string literals as direct JSXElement children
 * @author Grzegorz Dominiczak
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow string literals as direct JSXElement children',
      category: 'Stylistic Issues',
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    return {
      JSXElement(node) {
        if (context.getFilename().includes('.test.')) {
          return undefined;
        }
        const directLiterals = node.children.filter(c => c.type === 'Literal');
        directLiterals.forEach(literal => {
          const trimmed = literal.value.replace(/\W|\d/g, '');
          if (trimmed !== '') {
            context.report({
              node: literal,
              message:
                'Unexpected literal used as direct child of JSXElement - {{ e }}',
              data: { e: literal.value.trim() }
            });
          }
        });
      }
    };
  }
};
