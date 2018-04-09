const babel = require('babel-core');
const resolver = require('./resolver');


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
    listRouter,
    detailRouter,
  ] = asyncRouterBT(
    './pages/List',
    './pages/Detail',
  );
`;

const result = babel.transform(code, {
  plugins: [
    resolver
  ],
});

console.log(result.code);

