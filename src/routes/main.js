'use strict'
const db = require('../db/mariadb');
const { info } = require('console');
const fs = require('fs');
const dataBuffer = fs.readFileSync('public/subinfo.json');
const dataJSON = JSON.parse(dataBuffer);
const controller = require('./controller');
const subscriptions = require('../entity/subscriptions');

class main extends controller{
    async Display(req, res){
        if(req.session.user){
            res.render("usermain.ejs",{
                name:req.session.user.name
            });
        }
        else
            res.render('main.html');
    }

    async System(req, res){
        const userSubscription = new subscriptions();
        await userSubscription.setSubscriptions(req.session.user.id);
        console.log(await userSubscription.getSubscriptions());
        res.json(await userSubscription.getSubscriptions());
    }
}

module.exports = new main();