import VueRouter from "vue-router";
import Vue from "vue";

const routes=[
    {
        path:'/',
        name:'login',
        component:()=>import("../components/Login")
    },
    {
        path:'/Index',
        name:'index',
        component:()=>import("../components/Index"),
        children:[
            {
                path:'/Home',
                name:'/Home',
                meta: {
                    title: '首页'
                },
                component:()=>import("../components/Home.vue")
            },
            {
                path:'/Admin',
                name:'/Admin',
                meta: {
                    title: '用户管理'
                },
                component:()=>import("../components/Admin/UserManage.vue")
            },
            {
                path:'/STM',
                name:'/STM',
                meta: {
                    title: '仓库管理'
                },
                component:()=>import("../components/User/StorageManage.vue")
            },
            {
                path:'/ItM',
                name:'/ItM',
                meta: {
                    title: '仓库物品管理'
                },
                component:()=>import("../components/User/ItemManage.vue")
            }
        ]
    }
]

const router =new VueRouter(
    {
        mode:'history',
        routes
    }
)
const VueRouterPush = VueRouter.prototype.push
    VueRouter.prototype.push=function push(to){
    return VueRouterPush.call(this,to).catch(err=>err)
    }
export default router;