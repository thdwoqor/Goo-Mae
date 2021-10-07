'use strict'

const routes = [
    //===== User =====//
    { module: require('./main'), path: '/', method: 'main', type: 'get' },
    { module: require('./login'), path: '/login', method: 'output_login', type: 'get' },
    { module: require('./login'), path: '/login', method: 'process_login', type: 'post' },
    { module: require('./login'), path: '/register', method: 'output_register', type: 'get' },
    { module: require('./login'), path: '/register', method: 'process_register', type: 'post' },
    { module: require('./sub'), path: '/sub', method: 'output_redirect_list', type: 'get' },
    { module: require('./sub'), path: '/sub/prepared', method: 'output_prepared', type: 'get' },
    { module: require('./sub'), path: '/sub/list', method: 'output_list', type: 'get' },
    { module: require('./sub'), path: '/sub/list/:name', method: 'output_login', type: 'get' },
    { module: require('./sub'), path: '/sub/loading', method: 'output_loading', type: 'post' },
    { module: require('./sub'), path: '/sub/parsing', method: 'parsing', type: 'post' },
    { module: require('./sub'), path: '/sub/success', method: 'output_success', type: 'get' },
];


var route_loader = {};

route_loader.init = function (app, router) {
    console.log('route_loader.init 호출됨.');
    return initRoutes(app, router);
}

// route_info에 정의된 라우팅 정보 처리
function initRoutes(app, router) {
    for (var route of routes) {
        //  라우팅 처리
        if (route.type == 'get') {
            router.route(route.path).get(route.module[route.method]);
        } else if (route.type == 'post') {
            router.route(route.path).post(route.module[route.method]);
        } else {
            router.route(route.path).post(route.module[route.method]);
        }

        console.log('라우팅 모듈 [%s]이(가) 설정됨.', route.method);
    }

    // 라우터 객체 등록
    app.use('/', router);
}

module.exports = route_loader;
