import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView, HeadView } from '@/components/layouts'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Home',
        component: () => import('@/views/dashboard/Home'),
        meta: { title: '首页',icon: 'home', permission: [ 'dashboard' ] }
      },
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: HeadView,
        meta: { title: '系统管理', icon: 'desktop', permission: [ 'dashboard' ] },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '审计日志', permission: [ 'dashboard' ] },
          },
          {
            path: '/dashboard/monitor',
            name: 'Monitor',
            hidden: false,
            component: () => import('@/views/dashboard/Monitor'),
            meta: { title: '系统配置', permission: [ 'dashboard' ] },
            children: [
              {
                path: '/dashboard/monitor/symail',
                name: 'MonitorSymail',
                component: () => import('@/views/dashboard/Monitor/Symail'),
                meta: { title: '邮件配置tab'}
              },
              {
                path: '/dashboard/monitor/symsg',
                name: 'MonitorSymsg',
                component: () => import('@/views/dashboard/Monitor/Symsg'),
                meta: { title: '短信配置tab'}
              },
              {
                path: '/dashboard/monitor/syfile',
                name: 'MonitorSyfile',
                component: () => import('@/views/dashboard/Monitor/Syfile'),
                meta: { title: '文件配置tab'}
              },
              {
                path: '/dashboard/monitor/sypic',
                name: 'MonitorSypic',
                component: () => import('@/views/dashboard/Monitor/Sypic'),
                meta: { title: '图片配置tab'}
              },
            ]
          },
          {
            path: '/dashboard/clearcache',
            name: 'Clearcache',
            component: () => import('@/views/dashboard/Clearcache'),
            meta: { title: '清除缓存页面', permission: [ 'dashboard' ] }
          },
          {
            path: '/dashboard/center',
            name: 'Center',
            component: () => import('@/views/dashboard/Center'),
            meta: { title: '个人资料管理页面', permission: [ 'dashboard' ] }
          }
        ]
      },

      // forms
      {
        path: '/content',
        redirect: '',
        component: PageView,
        meta: { title: '内容管理', icon: 'table', permission: [ 'form' ] },
        children: [
          {
            path: '/content/recycle-admin',
            name: 'BaseForm',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: '回收站管理', permission: [ 'form' ] }
          },
          {
            path: '/content/step-admin',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '单页面管理', permission: [ 'form' ] }
          },
          {
            path: '/content/advanced-admin',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '文章管理', permission: [ 'form' ] }
          },
          {
            path: '/content/article-class',
            name: 'ArticleClass',
            component: () => import('@/views/form/advancedForm/Article'),
            meta: { title: '文章分类', permission: [ 'form' ] }
          }
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: { title: '权限管理', icon: 'insurance', permission: [ 'profile' ] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: '管理员管理', permission: [ 'profile' ] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: '角色管理', permission: [ 'profile' ] }
          }
        ]
      },

      // list
      {
        path: '/list',
        name: 'list',
        component: () => import('@/views/list/TableList'),
        meta: { title: '菜单管理', icon: 'menu-fold', permission: [ 'table' ] }
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: RouteView,
        meta: { title: '管理员登陆', icon: 'team', permission: [ 'result' ] }
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },

]
