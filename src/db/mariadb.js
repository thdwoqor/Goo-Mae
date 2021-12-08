'use strict'

const { prototype } = require('events');
const mysql = require('mysql2/promise'); // mysql 변수에 mysql 모듈을 할당
//require('dotenv').config();

// const db = mysql. createConnection({  //커넥션변수에 mysql변수에 있는 크리에이드커넥션 메소드를 호출(객체를 받음) 할당
//     //host    : 'localhost',   //host객체 - 마리아DB가 존재하는 서버의 주소
//     host    : process.env.HOST,   //host객체 - 마리아DB가 존재하는 서버의 주소
//     user    : process.env.USER, //user객체 - 마리아DB의 계정
//     password    : process.env.PASSWORD,   //password객체 - 마리아DB 계정의 비밀번호
//     database    : process.env.DATABASE,   //database객체 - 접속 후 사용할 DB명
//     port    : process.env.PORT
// });

const db = {
    async connect() {
        this.connection = await mysql.createConnection({
            host    : process.env.HOST,   //host객체 - 마리아DB가 존재하는 서버의 주소
            user    : process.env.USER, //user객체 - 마리아DB의 계정
            password    : process.env.PASSWORD,   //password객체 - 마리아DB 계정의 비밀번호
            database    : process.env.DATABASE,   //database객체 - 접속 후 사용할 DB명
            port    : process.env.DBPORT
        });
        
        console.log('MySQL connection is successfully established!');
    },

    query() {
        if (this.connection === undefined) {
            console.log('Warning: MySQL connection is not established yet!');
            return;
        }
        return this.connection.query(...arguments);
    }
};

module.exports=db;

