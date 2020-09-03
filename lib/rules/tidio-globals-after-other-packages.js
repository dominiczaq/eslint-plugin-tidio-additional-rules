/**
 * @fileoverview Disallow tidio packages before or mixed with other packages
 * @author tidio-globals-after-other-packages
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const tidioModules = [
  'store',
  'apiData',
  'swal',
  'helpers',
  'design',
  'utils',
  'track',
  'lang',
  'chatData',
  'botsSectionHelpers',
  'upgradeHelpers'
];

const isNodeTidioModule = nodeValue => {
  let tidioModule = false;
  for (let i = 0; i < tidioModules.length; i += 1) {
    if (nodeValue.startsWith(tidioModules[i])) {
      tidioModule = true;
    }
  }
  return tidioModule;
};
module.exports = {
  meta: {
    docs: {
      description:
        'Disallow tidio packages before or mixed with other packages',
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
      Program(node) {
        if (context.getFilename().includes('.test.')) {
          return undefined;
        }
        const allAbsoluteImportNodes = node.body.filter(element => {
          if (element.type !== 'ImportDeclaration') {
            return false;
          }
          return !element.source.value.startsWith('.');
        });
        for (let i = 0; i < allAbsoluteImportNodes.length; i += 1) {
          if (!isNodeTidioModule(allAbsoluteImportNodes[i].source.value)) {
            continue;
          }
          for (let j = allAbsoluteImportNodes.length - 1; j >= i; j -= 1) {
            if (!isNodeTidioModule(allAbsoluteImportNodes[j].source.value)) {
              context.report({
                node: allAbsoluteImportNodes[i],
                message: `'${
                  allAbsoluteImportNodes[i].source.value
                }' import should occur after '${
                  allAbsoluteImportNodes[j].source.value
                }'`
              });
              break;
            }
          }
        }
      }
    };
  }
};
