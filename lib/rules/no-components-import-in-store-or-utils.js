/**
 * @fileoverview store and utils shouldn't have components imports
 * @author Jarosław Salwa
 */
'use strict';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: "store and utils shouldn't have components imports",
      category: 'Stylistic Issues',
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: []
  },

  create: function(context) {
    return {
      ImportDeclaration(node) {
        const fileName = context.getFilename();
        if (fileName.includes('.test.')) {
          return undefined;
        }
        const isUtils = fileName.includes('/utils/');
        const isStore = fileName.includes('/store/');
        if (isUtils || isStore) {
          const importText = node.source.value || '';
          const pathSplit = importText.split('/');
          if (pathSplit[0] !== 'components') {
            return undefined;
          }

          context.report({
            node: node,
            message: `Nothing from 'components/...' should be imported in '${
              isUtils ? 'utils' : 'store'
            }/...'`
          });
        }
      }
    };
  }
};
