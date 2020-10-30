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
import RendererWrapper0 from 'C:/DEV/Vscode/ims-web/src/pages/.umi/LocaleWrapper.jsx';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
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
              LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
                .default,
            })
          : require('../user/login').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('C:/DEV/Vscode/ims-web/node_modules/_umi-build-dev@1.18.6@umi-build-dev/lib/plugins/404/NotFound.js')
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
          LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
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
              LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/BasicLayout').default,
        authority: ['admin', 'user'],
        routes: [
          {
            name: '欢迎',
            icon: 'smile',
            path: '/',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Welcomes__model.ts' */ 'C:/DEV/Vscode/ims-web/src/pages/Welcomes/model.ts').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Welcomes" */ '../Welcomes'),
                  LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
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
                  LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Admin').default,
            authority: ['admin'],
            exact: true,
          },
          {
            name: '接口管理',
            icon: 'api',
            path: '/list',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__ListTableList" */ '../ListTableList'),
                  LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../ListTableList').default,
            exact: true,
          },
          {
            name: '数据源管理',
            icon: 'database',
            path: '/datasource',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__datasource__model.ts' */ 'C:/DEV/Vscode/ims-web/src/pages/datasource/model.ts').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__datasource" */ '../datasource'),
                  LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../datasource').default,
            exact: true,
          },
          {
            name: '系统管理',
            icon: 'setting',
            path: '/system',
            routes: [
              {
                name: '公司管理',
                icon: 'bank',
                path: '/system/list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__system__company__list__model.ts' */ 'C:/DEV/Vscode/ims-web/src/pages/system/company/list/model.ts').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../system/company/list'),
                      LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
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
                        import(/* webpackChunkName: 'p__system__demo__demo__model.ts' */ 'C:/DEV/Vscode/ims-web/src/pages/system/demo/demo/model.ts').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../system/demo/demo'),
                      LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../system/demo/demo').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/DEV/Vscode/ims-web/node_modules/_umi-build-dev@1.18.6@umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: '功能单元',
            icon: 'appstore',
            path: '/process',
            routes: [
              {
                name: '单元列表',
                icon: 'unordered-list',
                path: '/process/list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__process__ProcessList__model.ts' */ 'C:/DEV/Vscode/ims-web/src/pages/process/ProcessList/model.ts').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../process/ProcessList'),
                      LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../process/ProcessList').default,
                exact: true,
              },
              {
                name: '新增单元',
                icon: 'plus-square',
                path: '/process/add',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__process__add__model.ts' */ 'C:/DEV/Vscode/ims-web/src/pages/process/add/model.ts').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../process/add'),
                      LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../process/add').default,
                exact: true,
              },
              {
                name: '功能列表',
                icon: 'function',
                path: '/process/functionlist',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__process__FunctionList__model.ts' */ 'C:/DEV/Vscode/ims-web/src/pages/process/FunctionList/model.ts').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../process/FunctionList'),
                      LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../process/FunctionList').default,
                exact: true,
              },
              {
                name: '执行记录',
                icon: 'reload',
                path: '/process/prolog',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../process/ProLogList'),
                      LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../process/ProLogList').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/DEV/Vscode/ims-web/node_modules/_umi-build-dev@1.18.6@umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: '调度管理',
            icon: 'clock-circle',
            path: '/job',
            routes: [
              {
                name: '新增',
                icon: 'file-add',
                path: '/job/jobdefineadd',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__job__JobDefineAdd__model.ts' */ 'C:/DEV/Vscode/ims-web/src/pages/job/JobDefineAdd/model.ts').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../job/JobDefineAdd'),
                      LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../job/JobDefineAdd').default,
                exact: true,
              },
              {
                name: '任务列表',
                icon: 'calendar',
                path: '/job/list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../job/JobDefineList'),
                      LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../job/JobDefineList').default,
                exact: true,
              },
              {
                name: '调度列表',
                icon: 'schedule',
                path: '/job/timerlist',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../job/TimerList'),
                      LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../job/TimerList').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/DEV/Vscode/ims-web/node_modules/_umi-build-dev@1.18.6@umi-build-dev/lib/plugins/404/NotFound.js')
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
                  LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('C:/DEV/Vscode/ims-web/node_modules/_umi-build-dev@1.18.6@umi-build-dev/lib/plugins/404/NotFound.js')
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
              LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('C:/DEV/Vscode/ims-web/node_modules/_umi-build-dev@1.18.6@umi-build-dev/lib/plugins/404/NotFound.js')
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
          LoadingComponent: require('C:/DEV/Vscode/ims-web/src/components/PageLoading/index')
            .default,
        })
      : require('../404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('C:/DEV/Vscode/ims-web/node_modules/_umi-build-dev@1.18.6@umi-build-dev/lib/plugins/404/NotFound.js')
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
