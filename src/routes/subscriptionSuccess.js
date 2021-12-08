'use strict'

const controller = require('./controller');
const db = require('../db/mariadb');

class subscriptionSuccess extends controller{
    async Display(req,res){
        res.render('success.ejs', {
            company: req.query.company,
            next: req.query.next,
            fee: req.query.fee,
            cycle: req.query.cycle
        });

        var sql = 'INSERT INTO sub_info (member_id, sub_company, sub_fee, sub_next , sub_cycle ) VALUES ( ?, ?, ?, ?, ?)';
        var params = [req.session.user.id, req.query.company, parseInt(req.query.fee), parseInt(req.query.next) , parseInt(req.query.cycle)];

        try {
            await db.query(sql, params);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new subscriptionSuccess();