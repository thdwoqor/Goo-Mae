'use strict'
const login=require('./login')
const register=require('./register')
const main=require('./main')
const subscriptionLoading = require('./subscriptionLoading')
const subscriptionList=require('./subscriptionList')
const subscriptionLogin = require('./subscriptionLogin')
const subscriptionPrepared = require('./subscriptionPrepared')
const subscriptionSuccess = require('./subscriptionSuccess')
const subscriptionLoading = require('./subscriptionLoading')

class Routes {
    
    constructor() {
        this.routes = [
            //===== User =====//
            { path: '/', method: main.Display, type: 'get' },
            { path: '/', method: main.System, type: 'post' },
            { path: '/login', method: login.Display, type: 'get' },
            { path: '/login', method: login.System, type: 'post' },
            { path: '/register', method: register.Display, type: 'get' },
            { path: '/register', method: register.System, type: 'post' },
            { authorized:true ,path: '/sub', method: subscriptionList.Display, type: 'get' },
            { authorized:true ,path: '/sub/prepared', method: subscriptionPrepared.Display, type: 'get' },
            { authorized:true ,path: '/sub/list', method: subscriptionList.Display, type: 'get' },
            { authorized:true ,path: '/sub/list/:name', method: subscriptionLogin.Display, type: 'get' },
            { authorized:true ,path: '/sub/loading', method: subscriptionLoading.Display, type: 'post' },
            { authorized:true ,path: '/sub/parsing', method: subscriptionLoading.System, type: 'post' },
            { authorized:true ,path: '/sub/success', method: subscriptionSuccess.Display, type: 'get' },
        ];
        this.route_loader = {};
    }

    isAuthenticated(req, res, next) {
        if (req.session.user===undefined)
            res.redirect('/');
        else
            next();
    }

    initRoutes(app, router) {
        for (var route of this.routes) {
            //  라우팅 처리
            if (route.type == 'get') {
                if(route.authorized)
                    router.route(route.path).get(this.isAuthenticated, route.method);
                else
                    router.route(route.path).get(route.method);
            } else if (route.type == 'post') {
                if(route.authorized)
                    router.route(route.path).post(this.isAuthenticated, route.method);
                else
                    router.route(route.path).post(route.method);
            } else {
                router.route(route.path).post(route.method);
            }
    
            console.log('라우팅 모듈 [%s]이(가) 설정됨.', route.path);
        }
    
        // 라우터 객체 등록
        app.use('/', router);
    }

    getRouteLoader(){
        return this.route_loader
    }
}

module.exports = Routes;
