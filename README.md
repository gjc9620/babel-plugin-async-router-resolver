# babel-plugin-async-router-resolver
Repetitive declare async require component(s) in react router is not need now

# How to install
`npm install --save-dev babel-plugin-async-router-resolver`

# How to use
`
  //webpack.js
  const resolver = require('babel-plugin-async-router-resolver');
  babel.transform(code, {
    plugins: [
      resolver
    ],
  });

  //router.js
  export default {
      path: 'customer',
      component: App,
      indexRoute: {
        getComponent: asyncRouterBT('./pages/List'), //require is async!
      },
      childRoutes: [
        require('./pages/Detail/route').default,
      ],
    };

  //Perform it like a function
  asyncRouterBT('./pages/List').name; //asyncRouter
  asyncRouterBT('./pages/List')();


  //They are async!
  const [
    listRouter,
    detailRouter,
  ] = asyncRouterBT(
    './pages/List',
    './pages/Detail',
  );
`

#How it work
`
  getComponent: asyncRouterBT('./pages/List'),

  //=> compiled
  getComponent: function asyncRouter(location, cb) {
    require.ensure([], require => {
      cb(null, require('./pages/List').default);
    }
  },

  const [
    listRouter,
    detailRouter,
  ] = asyncRouterBT(
    './pages/List',
    './pages/Detail',
  );

  //=> compiled

  const [
      listRouter,
      detailRouter,
    ] = [
      function asyncRouter(location, cb) {
        require.ensure([], require => {
          cb(null, require('./pages/List').default);
        }
      },
      function asyncRouter(location, cb) {
        require.ensure([], require => {
          cb(null, require('./pages/List').default);
        }
      },
    ];
`
#Fix eslint error
`
  // .eslintrc.json
  {
    "root": true,
    "parser": "foo",
    "extends": "bar",
+   "globals": {
+     "asyncRouterBT": true
+   }
  }

`

