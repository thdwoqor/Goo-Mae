'use strict'

// let Error = false;
const db = require('../db/mariadb');
const controller = require('./controller');
const user = require('../entity/user');

class login extends controller{
    async Display(req, res){
        res.render('login.ejs');
    }

    async System(req, res){
        
        const { id, pw } = req.body;
        const User = new user(id, pw);
        let rows;
        try {
            [rows] = await db.query('select * from `member` where `member_id`=? and `member_pw`=?', [User.getID(), User.getPW()]);
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
            console.log("로그인 성공");
            return res.json({ success: true });
        }
    }
}

module.exports = new login();