'use strict'

// let Error = false;
const db = require('../db/mariadb');

const output = {
    login : (req, res) =>{
        res.render('login.ejs');
    },
    register : (req, res) =>{
        res.render('register.ejs');
    }

};

const process = {
    login : async (req, res) =>{
        console.log(req.body);
        const { id, pw } = req.body;
        
        let rows;
        try {
            [rows] = await db.query('select * from `member` where `member_id`=? and `member_pw`=?', [id, pw]);
            // [rows] = await connection.query("SELECT * FROM `member`");
            console.dir(rows);
        }
        catch(err) {
            console.log(err);
            return res.json({ success: false });
        }finally {
            if (rows.length === 0) {
                return res.json({ success: false });
            }

            req.session.user = {
                id: id,
                name: rows[0].member_name,
                authorized: true
            };
            return res.json({ success: true });
        }
    },
    register : async (req, res) =>{
        console.log(req.body);
        const { id, pw , name } = req.body;

        var sql = 'INSERT INTO member ( member_id, member_pw, member_name ) VALUES ( ?, ?, ? )'; 
        var params = [id,pw,name];

        try{
            const insert = await db.query(sql,params);
            console.log(insert);
        }catch(err){
            console.log(err);
        }

        res.redirect('/login');
    }
};





// const login_user = async function (req, res) {
//     const db = req.app.get('db');
//     // console.log(req.app);

//     //connection = req.app.get('connection');
    
//     const userId = req.body.id;
//     const userPw = req.body.password;

//     // MariaDB
//     db.query('select * from member where member_id=? and member_pw=?', [userId, userPw], function (err, rows, fields) {
//         if (!err) {
//             if(rows.length>0){
//                 req.session.user = {
//                     id: userId,
//                     authorized: true
//                 };
//                 res.redirect('/');
//             }else{
//                 res.redirect('/login');
//                 Error=true;
//             }
//         } else {
//             res.redirect('/login');
//             Error=true;
//         }
//     });


//     try {
//         // run query to get employee with employee_id
//         result = await connection.execute(`SELECT * FROM 사용자 where id=:id AND pw=:pw`, [userId, userPw]);

//     } catch (err) {
//         //send error message
//         Error = true;
//         return res.redirect('/login');
//     } finally {
//         if (connection) {
//             try {
//                 //Always close connections
//                 //await connection.close();
//             } catch (err) {
//                 return console.error(err.message);
//             }
//         }
//         if (result.rows.length == 0) {
//             //query return zero employees
//             Error = true;
//             return res.redirect('/login');
//         } else {
//             //send all employees
//             req.session.user = {
//                 id: userId,
//                 authorized: true
//             };
//             res.redirect('/');
//         }
//     }

// }

module.exports.process_login = process.login;
module.exports.output_login = output.login ;
module.exports.process_register = process.register ;
module.exports.output_register = output.register ;