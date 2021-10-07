'use strict'
const db = require('../db/mariadb');

const main =async function (req, res) {
    if(req.session.user){
        let rows;
        try {
            [rows] = await db.query('select * from `sub_info` where `member_id`=? ', [req.session.user.id]);
            // [rows] = await connection.query("SELECT * FROM `member`");
            console.dir(rows);
        }
        catch(err) {
            console.log(err);
        }finally {
            res.send(rows);
        }
    }
    else
        res.render('main.html');
}

module.exports.main = main;