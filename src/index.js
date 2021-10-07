//  (async () => {

// Express 기본 모듈 불러오기
// https://nodejs.org/api/ 설치 필요 없음
const express = require('express')
    , http = require('http')
    , path = require('path')

// Express의 미들웨어 불러오기
// https://expressjs.com/ko/resources/middleware.html
const cookieParser = require('cookie-parser');

const bodyParser= require('body-parser');
// Session 미들웨어 불러오기
const expressSession = require('express-session');

// 모듈로 분리한 데이터베이스 파일 불러오기
// const db = require('./db/mariadb.js');
// const connection = require('./db/oracledb');

// 모듈로 분리한 라우팅 파일 불러오기
const route_loader = require('./routes');

// 익스프레스 객체 생성
const app = express();

// app.set('db', db);

app.use(express.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될경우 제대로 인식되지 않는 문제 해결
app.use(express.urlencoded({extended:true}));

// app.set('connection', await connection);

// res.render 엔진을 ejs로 설정
// 화면 engine을 ejs로 설정
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}))

// body-parser를 이용해 application/json 파싱
// Express 쓸 때, 바디 파서를 따로 임포트하지 않아도 된다
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 path를 /public으로 설정 (css, javascript등의 파일 사용을 위해)
app.use('/public', express.static(path.join(__dirname, '/../public')));

// 라우팅 정보를 읽어들여 라우팅 설정
route_loader.init(app, express.Router());

// 등록되지 않은 패스에 대해 페이지 오류 응답
app.all('*', function (req, res) {
    res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});

// http.createServer(app).listen(app.get('port'), function () {
//     console.log('Express server listening on port ' + app.get('port'));
//     // connection.init(app, config);
// });

module.exports =app;

// })();