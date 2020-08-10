import { IConfig, IPlugin } from "umi-types";
import defaultSettings from "./defaultSettings"; // https://umijs.org/config/

import slash from "slash2";
import themePluginConfig from "./themePluginConfig";
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview =
  ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === "site";
const plugins: IPlugin[] = [
  ["umi-plugin-antd-icon-config", {}],
  [
    "umi-plugin-react",
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: "zh-CN",
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: "./components/PageLoading/index",
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: "InjectManifest",
            workboxOptions: {
              importWorkboxFrom: "local",
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    "umi-plugin-pro-block",
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    "umi-plugin-ga",
    {
      code: "UA-72788897-6",
    },
  ]);
  plugins.push(["umi-plugin-antd-theme", themePluginConfig]);
}

export default {
  plugins,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: "/user",
      component: "../layouts/UserLayout",
      routes: [
        {
          name: "login",
          path: "/user/login",
          component: "./user/login",
        },
      ],
    },
    {
      path: "/",
      component: "../layouts/SecurityLayout",
      routes: [
        {
          path: "/",
          component: "../layouts/BasicLayout",
          authority: ["admin", "user"],
          routes: [
            {
              name: "欢迎",
              icon: "smile",
              path: "/",
              component: "./Welcomes",
            },
            {
              path: "/admin",
              name: "admin",
              icon: "crown",
              component: "./Admin",
              authority: ["admin"],
            },
            {
              name: "接口管理",
              icon: "api",
              path: "/list",
              component: "./ListTableList",
            },
            {
              name: "数据源管理",
              icon: "database",
              path: "/datasource",
              component: "./datasource",
            },
            {
              name: "系统管理",
              icon: "setting",
              path: "/system",
              routes: [
                {
                  name: "公司管理",
                  icon: "bank",
                  path: "/system/list",
                  component: "./system/company/list",
                },
                {
                  name: "card",
                  icon: "smile",
                  path: "/system/demo",
                  component: "./system/demo/demo",
                },
              ],
            },
            {
              name: "功能单元",
              icon: "appstore",
              path: "/process",
              routes: [
                {
                  name: "单元列表",
                  icon: "unordered-list",
                  path: "/process/list",
                  component: "./process/ProcessList",
                },
                {
                  name: "新增单元",
                  icon: "plus-square",
                  path: "/process/add",
                  component: "./process/add",
                },
                {
                  name: "功能列表",
                  icon: "function",
                  path: "/process/functionlist",
                  component: "./process/FunctionList",
                },
                {
                  name: "执行记录",
                  icon: "reload",
                  path: "/process/prolog",
                  component: "./process/ProLogList",
                },
              ],
            },
            {
              name: "调度管理",
              icon: "clock-circle",
              path: "/job",
              routes: [
                {
                  name: "新增",
                  icon: "file-add",
                  path: "/job/jobdefineadd",
                  component: "./job/JobDefineAdd",
                },
                {
                  name: "任务列表",
                  icon: "calendar",
                  path: "/job/list",
                  component: "./job/JobDefineList",
                },
                {
                  name: "调度列表",
                  icon: "schedule",
                  path: "/job/timerlist",
                  component: "./job/TimerList",
                },
              ],
            },
            {
              component: "./404",
            },
          ],
        },
        {
          component: "./404",
        },
      ],
    },
    {
      component: "./404",
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || "", // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string
    ) => {
      if (
        context.resourcePath.includes("node_modules") ||
        context.resourcePath.includes("ant.design.pro.less") ||
        context.resourcePath.includes("global.less")
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace(".less", "");
        const arr = slash(antdProPath)
          .split("/")
          .map((a: string) => a.replace(/([A-Z])/g, "-$1"))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join("-")}-${localName}`.replace(/--/g, "-");
      }

      return localName;
    },
  },
  manifest: {
    basePath: "/",
  },
  // chainWebpack: webpackPlugin,
  // proxy: {
  //   '/server/api/': {
  //     target: 'https://preview.pro.ant.design/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/server': '' },
  //   },
  // },
  proxy: {
    "/api/system/": {
      target: "http://localhost:8300/",
      //target: 'http://tomcat.mrsoa.com:8300/',
      //target: 'http://10.0.254.5:8300/',
      //target: 'https://ims.51eanj.com/system',
      changeOrigin: true,
      pathRewrite: {
        "^/api/system": "",
      },
    },
    "/api/database/": {
      target: "http://localhost:8200/dts/",
      //target: 'http://tomcat.mrsoa.com:8200/',
      //target: '120.78.149.61:9993/dts',
      //target: 'https://ims.51eanj.com/dts/',
      changeOrigin: true,
      pathRewrite: {
        "^/api/database": "",
      },
    },
    "/api/process/": {
      target: "http://localhost:8400/",
      //target: 'http://120.78.149.61:9992',
      //target: "https://ims.51eanj.com/process/",
      changeOrigin: true,
      pathRewrite: {
        "^/api/process": "",
      },
    },
  },
} as IConfig;
