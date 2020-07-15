import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from 'D:/vscode/ims-web/src/pages/.umi/LocaleWrapper.jsx';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__user__login" */ '../user/login'),
              LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                .default,
            })
          : require('../user/login').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('D:/vscode/ims-web/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__SecurityLayout" */ '../../layouts/SecurityLayout'),
          LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/SecurityLayout').default,
    routes: [
      {
        path: '/',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
              LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/BasicLayout').default,
        authority: ['admin', 'user'],
        routes: [
          {
            name: 'welcome',
            icon: 'smile',
            path: '/',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Welcomes__model.ts' */ 'D:/vscode/ims-web/src/pages/Welcomes/model.ts').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Welcomes" */ '../Welcomes'),
                  LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Welcomes').default,
            exact: true,
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Admin" */ '../Admin'),
                  LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Admin').default,
            authority: ['admin'],
            exact: true,
          },
          {
            name: 'api',
            icon: 'api',
            path: '/list',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__ListTableList" */ '../ListTableList'),
                  LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../ListTableList').default,
            exact: true,
          },
          {
            name: 'apis',
            icon: 'api',
            path: '/apis',
            routes: [
              {
                name: '标准列表',
                icon: 'smile',
                path: '/apis/apislist',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__apis__ApisList__model.ts' */ 'D:/vscode/ims-web/src/pages/apis/ApisList/model.ts').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../apis/ApisList'),
                      LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../apis/ApisList').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('D:/vscode/ims-web/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: 'datasource',
            icon: 'database',
            path: '/datasource',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__datasource__model.ts' */ 'D:/vscode/ims-web/src/pages/datasource/model.ts').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__datasource" */ '../datasource'),
                  LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../datasource').default,
            exact: true,
          },
          {
            name: 'system',
            icon: 'setting',
            path: '/system',
            routes: [
              {
                name: 'company',
                icon: 'bank',
                path: '/system/list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__system__company__list__model.ts' */ 'D:/vscode/ims-web/src/pages/system/company/list/model.ts').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../system/company/list'),
                      LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../system/company/list').default,
                exact: true,
              },
              {
                name: 'card',
                icon: 'smile',
                path: '/system/demo',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__system__demo__demo__model.ts' */ 'D:/vscode/ims-web/src/pages/system/demo/demo/model.ts').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../system/demo/demo'),
                      LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../system/demo/demo').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('D:/vscode/ims-web/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: 'process',
            icon: 'appstore',
            path: '/process',
            routes: [
              {
                name: 'list',
                icon: 'unordered-list',
                path: '/process/list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__process__ProcessList__model.ts' */ 'D:/vscode/ims-web/src/pages/process/ProcessList/model.ts').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../process/ProcessList'),
                      LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../process/ProcessList').default,
                exact: true,
              },
              {
                name: 'add',
                icon: 'plus-square',
                path: '/process/add',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__process__add__model.ts' */ 'D:/vscode/ims-web/src/pages/process/add/model.ts').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../process/add'),
                      LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../process/add').default,
                exact: true,
              },
              {
                name: 'list',
                icon: 'function',
                path: '/process/functionlist',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__process__FunctionList__model.ts' */ 'D:/vscode/ims-web/src/pages/process/FunctionList/model.ts').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../process/FunctionList'),
                      LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../process/FunctionList').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('D:/vscode/ims-web/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: 'job',
            icon: 'clock-circle',
            path: '/job',
            routes: [
              {
                name: 'add',
                icon: 'file-add',
                path: '/job/jobdefineadd',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__job__JobDefineAdd__model.ts' */ 'D:/vscode/ims-web/src/pages/job/JobDefineAdd/model.ts').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../job/JobDefineAdd'),
                      LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../job/JobDefineAdd').default,
                exact: true,
              },
              {
                name: 'list',
                icon: 'calendar',
                path: '/job/list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../job/JobDefineList'),
                      LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../job/JobDefineList').default,
                exact: true,
              },
              {
                name: 'timer',
                icon: 'schedule',
                path: '/job/timerlist',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../job/TimerList'),
                      LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../job/TimerList').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('D:/vscode/ims-web/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: '文档管理',
            icon: 'docment',
            path: '/doc',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__doc__model.ts' */ 'D:/vscode/ims-web/src/pages/doc/model.ts').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__doc" */ '../doc'),
                  LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../doc').default,
            exact: true,
          },
          {
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__404" */ '../404'),
                  LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('D:/vscode/ims-web/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('D:/vscode/ims-web/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ '../404'),
          LoadingComponent: require('D:/vscode/ims-web/src/components/PageLoading/index')
            .default,
        })
      : require('../404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('D:/vscode/ims-web/node_modules/_umi-build-dev@1.18.5@umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
