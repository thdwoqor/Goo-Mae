'use strict'

const db = require('../db/mariadb');
const controller = require('./controller');
const user = require('../entity/user');
class register extends controller{
    async Display(req, res){
        res.render('register.ejs');
    }

    async System(req, res){
        console.log(req.body);
        const { id, pw , name } = req.body;
        const User = new user(id,pw,name);

        var sql = 'INSERT INTO member ( member_id, member_pw, member_name ) VALUES ( ?, ?, ? )'; 
        var params = [User.getID(),User.getPW(),User.getNAME()];
        try{
            const insert = await db.query(sql,params);
            console.log(insert);
        }catch(err){
            console.log(err);
        }

        res.redirect('/login');
    }
}

module.exports = new register();