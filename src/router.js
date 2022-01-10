import Vue from 'vue';
import Router from 'vue-router';
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register";
import ForgotPassword from "@/components/ForgotPassword";
import Reset from "@/components/Reset";
import store from "@/store/vuex";
import InitMatch from "@/components/InitMatch";
import Match from "@/components/Match"

Vue.use(Router);

export default new Router ({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
            beforeEnter: (to, from, next) => {
                if(store.state.user === null) {
                    next('/login');
                } else {
                    next();
                }
            }
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/forgot-password',
            component: ForgotPassword
        },
        {
            path: '/passwordReset/:token/:id',
            component: Reset
        },
        {
            path: '/initmatch/:userID/:matchUserID/',
            component: InitMatch
        },
        {
            path: '/match/:userID/:matchUserID/:genreID/:init',
            component: Match
        }
    ]
});