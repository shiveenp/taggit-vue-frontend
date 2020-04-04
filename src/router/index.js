import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Home from "../views/Home";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', component: Login},
    {path: '/user/:userId', component: Home},

    // otherwise redirect to home
    {path: '*', redirect: '/'}
  ]
});

// index.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const cookie = document.cookie;
//   const publicPages = ['/']
//   const authRequired = !publicPages.includes(to.path);
//
//   if (authRequired && !loggedIn) {
//     return next('/')
//   }
//
//   next()
// })
