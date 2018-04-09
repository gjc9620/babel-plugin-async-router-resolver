

const convert = path => `
  (undefined, function asyncRouter(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('${path}').default);
    });
  })
`;
const convertArr = paths => `
  (undefined, [${paths.map(convert).join(',')}])
`;

const expressionName = 'asyncRouterBT';
const visitor = {
  CallExpression(nodePath /* pluginPass */) {
    const {
      node,
    } = nodePath;
    const args = node.arguments;
    if (node.callee.name === expressionName && args.length) {
      if (args.length > 1) {
        nodePath.replaceWithSourceString(convertArr(args.map(arg => arg.value)));
      } else {
        nodePath.replaceWithSourceString(convert(args[0].value));
      }
    }
  },
};

module.exports = function p() {
  return {
    visitor,
  };
};
