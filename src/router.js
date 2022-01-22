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
import YourProfile from "@/components/YourProfile";
import CompletedMatches from "./components/CompletedMatches";
import YourMatches from "@/components/YourMatches";

Vue.use(Router);

const router = new Router ({
    mode: 'history',
    routes: [
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
            path: '/',
            component: Home,
            beforeEnter: guard
        },
        {
            path: '/initmatch/:userID/:matchUserID/',
            component: InitMatch,
            beforeEnter: guard
        },
        {
            path: '/match/:userID/:matchUserID/:genreID/:init',
            component: Match,
            beforeEnter: guard
        },
        {
            path: '/match/:userID/:matchUserID/:init',
            component: Match,
            beforeEnter: guard
        },
        {
            path: '/yourProfile',
            component: YourProfile,
            beforeEnter: guard
        },
        {
            path: "/yourMatches",
            component: YourMatches,
            beforeEnter: guard
        },
        {
            path: '/completedMatches/:otherUser',
            component: CompletedMatches,
            beforeEnter: guard
        }
    ]
});

function guard(to,from,next) {
    if(store.state.user === null) {
        next('/login');
    } else {
        next();
    }
}

export default router;