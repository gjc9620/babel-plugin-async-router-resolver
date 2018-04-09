const babel = require('babel-core');

const code = `
  export default {
    path: 'customer',
    component: App,
    indexRoute: {
      getComponent: asyncRouterBT('./pages/List'),
    },
    childRoutes: [
      require('./pages/Detail/route').default,
    ],
  };

  const [
    fuckRouter,
    chunhuiRouter,
  ] = asyncRouterBT(
    './pages/List',
    './pages/List',
  );
`;

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

// const result = babel.transform(code, {
//   plugins: [{
//     visitor,
//   }],
// });
//
// console.log(result.code);

module.exports = function p() {
  return {
    visitor,
  };
};
