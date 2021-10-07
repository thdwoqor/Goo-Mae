const app = require('./index.js');
const db = require('./db/mariadb.js');

const PORT = process.env.PORT || 3000;

const { prototype } = require('events');
const mysql = require('mysql2/promise'); // mysql 변수에 mysql 모듈을 할당
require('dotenv').config();

(async () => {
    // const connection = await mysql.createConnection({
    //     host    : process.env.HOST,   //host객체 - 마리아DB가 존재하는 서버의 주소
    //     user    : process.env.USER, //user객체 - 마리아DB의 계정
    //     password    : process.env.PASSWORD,   //password객체 - 마리아DB 계정의 비밀번호
    //     database    : process.env.DATABASE,   //database객체 - 접속 후 사용할 DB명
    //     port    : process.env.PORT
    // });

    await db.connect();

    //app.set('connection', connection);
    app.listen(PORT, () =>{
    console.log("server start");
    
    // db.init(app);
});
})();

