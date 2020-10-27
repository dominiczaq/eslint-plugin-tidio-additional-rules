/**
 * @fileoverview Track import should have an absolute import
 * @author track-should-have-absolute-import
 */
'use strict';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Track import should have an absolute import',
      category: 'Stylistic Issues',
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: []
  },

  create: function(context) {
    return {
      ImportDeclaration(node) {
        if (
          context.getFilename().includes('.test.') ||
          context.getFilename().includes('loginPage')
        ) {
          return undefined;
        }
        const importText = node.source.value || '';
        if (
          importText.indexOf('track') > 0 &&
          (importText.indexOf('../track') !== -1 ||
            importText.indexOf('../models/track') !== -1)
        ) {
          context.report({
            node: node,
            message: 'track module import should be absolute'
          });
        }
      }
    };
  }
};
