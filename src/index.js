/* Default babel plugin */
export default function ({ types: t }) {
  let containsJSX = false;
  return {
    visitor: {
      JSXOpeningElement() {
        containsJSX = true;
      },

      Program: {
        exit(path) {
          if (!containsJSX || path.scope.hasBinding('React')) {
            return;
          }

          path.traverse({
            ClassDeclaration(classPath) {
              if (classPath.node.superClass) {
                return;
              }
              if (checkIfClassHasReactRender(classPath.node)) {
                classPath.node.superClass = t.identifier('Component')
              }
            },
          });

          const reactImport = t.importDeclaration([
            t.importDefaultSpecifier(t.identifier('React, {PropTypes, Component}')),
          ], t.stringLiteral('react'));

          path.node.body.unshift(reactImport);
        },
      },
    },
  };
}

/*
 * Checks if the the class contains React's render
 * method and if it returns a JSX element.
 */
function checkIfClassHasReactRender(currentClass) {
  try {
    const getRenderMethod = currentClass.body.body.filter(id => id.type === 'ClassMethod' && id.key.name === 'render');
    return getRenderMethod[0].body.body.filter(child => child.type === 'ReturnStatement').map(stat => stat.argument.type)[0] === 'JSXElement';
  } catch (e) {
    return false;
  }
}
