'use strict';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'All events in mobile app should start with Mobile:',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
  },

  create: function (context) {
    return {
      ExpressionStatement(node) {
        if (context.getFilename().includes('.test.')) {
          return undefined;
        }
        if (
          !node?.expression?.callee?.name ||
          !node?.expression?.arguments?.[0]?.value
        ) {
          return undefined;
        }
        if (node.expression.callee.name !== 'trackCall') {
          return undefined;
        }
        const eventName = node.expression.arguments[0].value;
        if (node.expression.arguments[0].value.startsWith('Mobile: ')) {
          return undefined;
        }
        context.report({
          node: node,
          message: `All mobile app events should start with "Mobile:". Got "${eventName}"`,
        });
      },
    };
  },
};
