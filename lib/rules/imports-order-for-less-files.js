/**
 * @fileoverview Always put less files as last ones
 * @author Jarosław Salwa
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Always put less files as last ones',
      category: 'Fill me in',
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    const isLessFile = name => {
      const lessNameRegexp = RegExp(/\.less$/, 'gi');
      return lessNameRegexp.test(name);
    };

    return {
      Program(nodes) {
        if (nodes.body) {
          const imports = nodes.body.filter(
            node => node.type === 'ImportDeclaration'
          );
          imports.forEach((singleImport, i) => {
            if (singleImport.source && singleImport.source.value) {
              if (isLessFile(singleImport.source.value)) {
                for (let j = i + 1; j < imports.length; j += 1) {
                  if (imports[j].source && imports[j].source.value) {
                    if (!isLessFile(imports[j].source.value)) {
                      context.report({
                        node: singleImport,
                        message:
                          'Less files should be imported as last ones - "{{ e }}"',
                        data: { e: singleImport.source.value.trim() }
                      });
                      break;
                    }
                  }
                }
              }
            }
          });
        }
      }
    };
  }
};
