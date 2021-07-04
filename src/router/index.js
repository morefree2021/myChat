import Vue from 'vue';
import Router from 'vue-router';
import {
  Message
} from 'element-ui';
//懒加载
const Home = () => import('../view/home/Home');
const Container = () => import('../view/container/Container');
const Board = () => import('../view/board/Board');
const ChatRoom = () => import('../view/chatroom/ChatRoom');
const Music = () => import('../view/music/Music');
const Login = () => import('../view/login/Login');
const Register = () => import('../view/login/Register');



//解决vue重复点击路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: Container,
    meta: {
      requireAuth: false
    },
    children: [
      {
        path: '/',
        component: Home,
        meta: {
          requireAuth: false
        },
      },
      {
        path: '/board',
        component: Board,
        meta: {
          requireAuth: false
        },
      },
      {
        path: '/chatroom',
        component: ChatRoom,
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/music',
        component: Music,
        meta: {
          requireAuth: false
        },
      },
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: {
      requireAuth: false
    },
  },
  {
    path: '/register',
    component: Register,
    meta: {
      requireAuth: false
    },
  },
];


const router = new Router({
  routes
})


// router.beforeEach((to, from, next) => {
//   if(to.path === '/login' || to.path === '/register') return next()
//   const tokenStr = windows.sessionStorage.getItem('token')
//   if(!tokenStr && to.meta.requireAuth) {
//     Message.warning('请先登录')
//     next('/login')
//   } else {
//     next()
//   }
// })

router.beforeEach((to, form, next) => {
  if (to.path === '/login' || to.path === '/register') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr && to.meta.requireAuth) {
    Message.warning('请先登录')
    next('/login')
  } else {
    next()
  }
})

export default router




