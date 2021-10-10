'use strict'

const netflex = require('../crawling/netflix');
const whatcha = require('../crawling/whatcha');
const db = require('../db/mariadb');

const fs = require('fs');
const dataBuffer = fs.readFileSync('public/subinfo.json');
const dataJSON = JSON.parse(dataBuffer);

const services = require('../crawling/services');

// console.log(dataJSON['adobe'].displayname);

const output = {
    prepared: (req, res) => {
        res.render('prepared.ejs');
    },
    redirect_list: (req, res) => {
        res.redirect("/sub/list")
        //console.log(req.session.user.id);
    },
    list: (req, res) => {
        res.render('sublist.ejs');
        //console.log(req.session.user.id);
    },
    login: (req, res) => {
        const name = req.params.name;
        if(dataJSON[name].implemented==false){
            res.render('prepared.ejs');
        }else{
            console.log(dataJSON[name].displayname);
            res.render('sublogin.ejs',{
                company:dataJSON[name].displayname
            });
        }
    },
    loading: (req, res) => {
        const id = req.body.id;
        const password = req.body.password;
        const company = req.body.company;
        console.log(req.body);
        res.render('loading.ejs', {
            id: id,
            password: password,
            company: company
        });
    },
    success: async (req, res) => {
        res.render('success.ejs', {
            company: req.query.company,
            // start : req.params.start,
            next: req.query.next,
            fee: req.query.fee,
            cycle: req.query.cycle
        });

        var sql = 'INSERT INTO sub_info (member_id, sub_company, sub_fee, sub_next , sub_cycle ) VALUES ( ?, ?, ?, ?, ?)';
        var params = [req.session.user.id, req.query.company, parseInt(req.query.fee), parseInt(req.query.next) , parseInt(req.query.cycle)];

        try {
            const insert = await db.query(sql, params);
            // console.log(insert);
        } catch (err) {
            console.log(err);
        }
    }
};


const parsing = async function (req, res) {
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

module.exports.output_redirect_list = output.redirect_list;
module.exports.output_list = output.list;
module.exports.output_login = output.login;
module.exports.output_loading = output.loading;
module.exports.output_success = output.success;
module.exports.output_prepared = output.prepared;
module.exports.parsing = parsing;
