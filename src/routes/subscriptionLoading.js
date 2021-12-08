'use strict'


// const netflex = require('../crawling/netflix');
// const whatcha = require('../crawling/whatcha');
// const db = require('../db/mariadb');

const services = require('../crawling/services');

const controller = require('./controller');

class subscriptionLoading extends controller{
    async Display(req,res){
        const id = req.body.id;
        const password = req.body.password;
        const company = req.body.company;
        console.log(req.body);
        res.render('loading.ejs', {
            id: id,
            password: password,
            company: company
        });
    }

    async System(req, res){
        const id = req.body.id;
        const password = req.body.password;
        const company = req.body.company;

        // TODO: Fix korean company name
        const service = services.get_service(company);

        try{
            await service.launch();
        }catch(err){
            console.log(err);
            //service.quit();
        }

        try{
            await service.login(id, password);
        }catch(err){
            console.log(err);
            //service.quit();
        }

        let subscription;
        try{
            subscription = await service.get_subscription_info();
        }catch(err){
            console.log(err);
            //service.quit();
        }

        return res.json({
            success: true,
            next: subscription.next_membership,
            fee: subscription.subscription_fee,
            company: subscription.subscription_company,
            cycle: subscription.subscription_cycle,
        });
    }

}

module.exports = new subscriptionLoading();