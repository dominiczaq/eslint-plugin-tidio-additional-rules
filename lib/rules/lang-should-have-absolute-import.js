/**
 * @fileoverview Lang import should have an absolute import
 * @author lang-should-have-absolute-import
 */
'use strict';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Lang import should have an absolute import',
      category: 'Stylistic Issues',
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: []
  },

  create: function(context) {
    return {
      ImportDeclaration(node) {
        if (context.getFilename().includes('.test.')) {
          return undefined;
        }
        const importText = node.source.value || '';
        if (
          importText.indexOf('lang') > 0 &&
          importText.indexOf('../lang') !== -1
        ) {
          context.report({
            node: node,
            message: "lang module import should be absolute"
          });
        }
      }
    };
  }
};
