'use strict'

const controller = require('./controller');

class subscriptionLogin extends controller{
    async Display(req,res){
        res.render('prepared.ejs');
    }
}

module.exports = new subscriptionLogin();