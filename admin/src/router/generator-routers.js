

import { BaseLayout, BlankLayout } from '@/layouts'
import store from '@/store'
// 前端路由表
const constantRouterComponents = {
    // 基础页面 layout 必须引入
    BaseLayout: BaseLayout,
    BlankLayout: BlankLayout,

}




const routes_data = [
    // {
    //     id: 10,
    //     meta: { title: '系统管理', icon: 'el-icon-setting', show: store.state.admin.isSystemAdmin },
    //     name: "system",
    //     parentId: 0,
    //     component: "BlankLayout",
    // },
    // {
    //     component: "/system/user",
    //     id: 100,
    //     meta: { title: '用户管理', icon: 'el-icon-menu', show: true },
    //     name: "user",
    //     path: "/system/user",
    //     parentId: 10
    // },

    // {
    //     component: "/system/role",
    //     id: 110,
    //     meta: { title: '角色管理', icon: 'el-icon-menu', show: true },
    //     name: "role",
    //     path: "/system/role",
    //     parentId: 10
    // },
    // {
    //     component: "/system/popedom",
    //     id: 120,
    //     meta: { title: '权限管理', icon: 'el-icon-menu', show: true },
    //     name: "popedom",
    //     path: "/system/popedom",
    //     parentId: 10
    // },
    // {
    //     component: "/system/api_log",
    //     id: 130,
    //     meta: { title: 'API日志', icon: 'el-icon-menu', show: true },
    //     name: "api_log",
    //     path: "/system/api_log",
    //     parentId: 10
    // },
    // {
    //     component: "/system/user_withdraw",
    //     id: 130,
    //     meta: { title: '用户提现', icon: 'el-icon-menu', show: true },
    //     name: "user_withdraw",
    //     path: "/system/user_withdraw",
    //     parentId: 10
    // },
    {
        component: "BlankLayout",
        id: 20,
        meta: { title: '我的账户', icon: 'el-icon-user', show: true },
        name: "user",
        path: "/myAccount",
        parentId: 0
    },
    {
        component: "/myAccount/workplace",
        id: 218,
        meta: { title: '工作台', icon: 'el-icon-menu', show: true },
        name: "user",
        path: "/myAccount/workplace",
        parentId: 20
    },
    // {
    //     component: "/myAccount/account_center",
    //     id: 225,
    //     meta: { title: '个人中心', icon: 'el-icon-menu', show: true },
    //     name: "user",
    //     path: "/myAccount/account_center",
    //     parentId: 20
    // },
    {
        component: "/myAccount/merchant",
        id: 220,
        meta: { title: '商户信息', icon: 'el-icon-menu', show: true },
        name: "user",
        path: "/myAccount/merchant",
        parentId: 20
    },
    // {
    //     component: "/myAccount/wx_notify",
    //     id: 226,
    //     meta: { title: '微信通知', icon: 'el-icon-menu', show: true },
    //     name: "wx_notify",
    //     path: "/myAccount/wx_notify",
    //     parentId: 20
    // },
    // {
    //     component: "/myAccount/withdraw",
    //     id: 222,
    //     meta: { title: '申请提现', icon: 'el-icon-menu', show: true },
    //     name: "withdraw",
    //     path: "/myAccount/withdraw",
    //     parentId: 20
    // },
    // {
    //     component: "/myAccount/withdraw_record",
    //     id: 224,
    //     meta: { title: '提现记录', icon: 'el-icon-menu', show: true },
    //     name: "user",
    //     path: "/myAccount/withdraw_record",
    //     parentId: 20
    // },
    {
        component: "/myAccount/capital_change",
        id: 200,
        meta: { title: '资金变动', icon: 'el-icon-menu', show: true },
        name: "capital",
        path: "/myAccount/capital_change",
        parentId: 20
    },
    // {
    //     component: "/myAccount/summary",
    //     id: 210,
    //     meta: { title: '信息汇总', icon: 'el-icon-menu', show: true },
    //     name: "summary",
    //     path: "/myAccount/summary",
    //     parentId: 20
    // },
    {
        component: "BlankLayout",
        id: 30,
        meta: { title: '商品管理', icon: 'el-icon-menu', show: true },
        name: "goods",
        path: "/goods",
        parentId: 0
    },
    {
        component: "/goods/type/type",
        id: 330,
        meta: { title: '商品分类', icon: 'el-icon-menu', show: true },
        name: "type",
        path: "/goods/type",
        parentId: 30
    },
    {
        component: "/goods/goods_list/good",
        id: 310,
        meta: { title: '商品列表', icon: 'el-icon-menu', show: true },
        name: "goods_list",
        path: "/goods/goods_list",
        parentId: 30
    },
    {
        component: "/goods/card",
        id: 360,
        meta: { title: '卡密管理', icon: 'el-icon-menu', show: true },
        name: "cards",
        path: "/goods/cards",
        parentId: 30
    },
    {
        component: "/goods/goods_list/good_update",
        id: 340,
        meta: { title: '添加商品', icon: 'el-icon-menu', show: true },
        name: "good_update",
        path: "/goods/good_update",
        parentId: 30
    },
    {
        component: "/goods/card_add",
        id: 350,
        meta: { title: '添加卡密', icon: 'el-icon-menu', show: true },
        name: "cards_add",
        path: "/goods/card_add",
        parentId: 30
    },

    {
        component: "BlankLayout",
        id: 50,
        meta: { title: '订单管理', icon: 'el-icon-tickets', show: true },
        name: "order",
        path: "/order",
        parentId: 0,
    },
    {
        component: "/goods/order/order",
        id: 520,
        meta: { title: '交易记录', icon: 'el-icon-menu', show: true },
        name: "good_order",
        path: "/goods/order",
        parentId: 50
    },
    {
        component: "/goods/order/after_sale",
        id: 510,
        meta: { title: '投诉列表', icon: 'el-icon-menu', show: true },
        name: "after_sale",
        path: "/goods/after_sale",
        parentId: 50
    },
    {
        component: "BlankLayout",
        id: 40,
        meta: { title: '代理分销', icon: 'el-icon-copy-document', show: true },
        name: "proxy",
        path: "/proxy",
        parentId: 0
    },
    {
        component: "/proxy/my_proxy",
        id: 410,
        meta: { title: '我的代理商', icon: 'el-icon-menu', show: true },
        name: "my_proxy",
        path: "/proxy/my_proxy",
        parentId: 40
    },
    {
        component: "/proxy/proxy_goods",
        id: 420,
        meta: { title: '添加代理商品', icon: 'el-icon-menu', show: true },
        name: "proxy_goods",
        path: "/proxy/proxy_goods",
        parentId: 40
    },
    {
        component: "BlankLayout",
        id: 60,
        meta: { title: '文章管理', icon: 'el-icon-copy-document', show: true },
        name: "proxy",
        path: "/proxy",
        parentId: 0
    },
    {
        component: "/article/article_list",
        id: 610,
        meta: { title: '文章列表', icon: 'el-icon-menu', show: true },
        name: "article_list",
        path: "/article/article_list",
        parentId: 60
    },
    {
        component: "/article/article_create",
        id: 620,
        meta: { title: '添加文章', icon: 'el-icon-menu', show: true },
        name: "article_create",
        path: "/article/article_create",
        parentId: 60
    },




]



// 根级菜单
const rootRouter = {
    path: '/',
    name: 'Home',
    component: 'BaseLayout',
    meta: {
        title: '首页'
    },
    redirect: '/myAccount/workplace',
    children: []
}



/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
function generator(routerMap, parent) {
    return routerMap.map(item => {
        const { title, show, hideChildren, hiddenHeaderContent, target, icon } = item.meta || {}
        const currentRouter = {
            // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
            path: item.path || `${(parent && parent.path) || ''}/${item.key}`,
            // 路由名称，建议唯一
            name: item.name || item.key || '',
            // 该路由对应页面的 组件 :方案1
            // component: constantRouterComponents[item.component || item.key],
            // 该路由对应页面的 组件 :方案2 (动态加载)

            component: constantRouterComponents[item.component || item.key] || (() => import(`@/views${item.component}`)),

            // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
            meta: {
                title: title,
                icon: icon || undefined,
                hiddenHeaderContent: hiddenHeaderContent,
                target: target,
                permission: item.name
            }
        }
        // 是否设置了隐藏菜单
        if (show === false) {
            currentRouter.hidden = true
        }
        // 是否设置了隐藏子菜单
        if (hideChildren) {
            currentRouter.hideChildrenInMenu = true
        }
        // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
        if (!currentRouter.path.startsWith('http')) {
            currentRouter.path = currentRouter.path.replace('//', '/')
        }
        // 重定向
        item.redirect && (currentRouter.redirect = item.redirect)
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
            // Recursion
            currentRouter.children = generator(item.children, currentRouter)
        }
        return currentRouter
    })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
function listToTree(list, tree, parentId) {
    list.forEach(item => {
        // 判断是否为父级菜单
        if (item.parentId === parentId) {
            const child = {
                ...item,
                key: item.key || item.name,
                children: []
            }
            // 迭代 list， 找到当前菜单相符合的所有子菜单
            listToTree(list, child.children, item.id)
            // 删掉不存在 children 值的属性
            if (child.children.length <= 0) {
                delete child.children
            }
            // 加入到树中
            tree.push(child)
        }
    })
}

let menuNav = []
let childrenNav = []
let routers = []

export default function generatorDynamicRouter() {


    //      后端数据, 根级树数组,  根级 PID
    listToTree(routes_data, childrenNav, 0)



    rootRouter.children = childrenNav
    menuNav.push(rootRouter)

    routers = generator(menuNav)


    console.log(menuNav[0].children )

    return { menuNav, childrenNav, routers, routes_data }
}