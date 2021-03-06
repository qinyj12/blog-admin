import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制面板', icon: 'fas fa-tachometer-alt' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    hidden: true, // 不知道干嘛用的，隐藏
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  // 文章编辑页
  {
    path: '/article',
    component: Layout,
    children: [
      {
        // 这里用articleId来判断正在被修改的是哪一篇文章
        path: ':ArticleId',
        hidden: true, // 平时隐藏起来
        name: 'Article',
        component: () => import('@/views/article/revise/index'),
        meta: { title: '编辑文章', icon: 'fas fa-edit' }
      },
      {
        // 这里用articleId来判断正在被修改的是哪一篇文章
        path: 'new',
        name: 'addArticle',
        component: () => import('@/views/article/revise/index'),
        meta: { title: '编辑文章', icon: 'fas fa-edit' }
      }
      // 把这个路由隐藏掉，重新创建一个新的路由，点击后链接到/article/new
    ]
  },
  // 文章管理页
  {
    path: '/articles',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Articles',
        component: () => import('@/views/article/manage/index'),
        meta: { title: '文章管理', icon: 'fas fa-clipboard-list' }
      }
    ]
  },
  // 新增用户页
  {
    path: '/adduser',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'addUser',
        component: () => import('@/views/user/add/index'),
        meta: { title: '新增用户', icon: 'fas fa-clipboard-list' }
      }
    ]
  },

  // 用户编辑页
  {
    path: '/user',
    component: Layout,
    children: [
      {
        // 这里用userId来判断正在被修改的是哪一个用户
        path: ':UserId',
        hidden: true, // 平时隐藏
        name: 'User',
        component: () => import('@/views/user/edit/index'),
        meta: { title: '编辑用户', icon: 'fas fa-user-edit' }
      },

    ]
  },
  {
    path: '/users',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'UsersList',
        component: () => import('@/views/user/manage/index'),
        meta: { title: '用户管理', icon: 'fas fa-users' }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Test',
        component: () => import('@/views/test/index'),
        meta: { title: '测试', icon: 'fas fa-vial' }
      }
    ]
  },

  {
    path: '/nested',
    hidden: true, // 隐藏
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    hidden: true, // 隐藏
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
