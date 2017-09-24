'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  var containsJSX = false;
  return {
    visitor: {
      JSXOpeningElement: function JSXOpeningElement() {
        containsJSX = true;
      },
      ClassDeclaration: function ClassDeclaration(classPath) {
        if (classPath.node.superClass) {
          return;
        }
        if (checkIfClassHasReactRender(classPath.node)) {
          containsJSX = true;
          classPath.node.superClass = t.identifier('Component');
        }
      },

      Program: {
        exit: function exit(path) {
          if (!containsJSX || path.scope.hasBinding('React')) {
            return;
          }

          var reactImport = t.importDeclaration([t.importDefaultSpecifier(t.identifier('React')), t.importSpecifier(t.identifier('Component'), t.identifier('Component')), t.importSpecifier(t.identifier('PropTypes'), t.identifier('PropTypes'))], t.stringLiteral('react'));

          path.node.body.unshift(reactImport);
        }
      }
    }
  };
};

/*
 * Checks if the the class contains React's render
 * method and if it returns a JSX element.
 */
function checkIfClassHasReactRender(currentClass) {
  try {
    var getRenderMethod = currentClass.body.body.filter(function (id) {
      return id.type === 'ClassMethod' && id.key.name === 'render';
    });
    return getRenderMethod[0].body.body.filter(function (child) {
      return child.type === 'ReturnStatement';
    }).map(function (stat) {
      return stat.argument.type;
    })[0] === 'JSXElement';
  } catch (e) {
    return false;
  }
} /* Default babel plugin */