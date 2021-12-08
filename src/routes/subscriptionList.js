'use strict'

const controller = require('./controller');

class subscriptionList extends controller{
    async Display(req,res){
        res.render('sublist.ejs');
    }
}

module.exports = new subscriptionList();
