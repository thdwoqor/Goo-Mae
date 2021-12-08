'use strict'

const fs = require('fs');
const dataBuffer = fs.readFileSync('public/subinfo.json');
const dataJSON = JSON.parse(dataBuffer);

const controller = require('./controller');

class subscriptionLogin extends controller{
    async Display(req,res){
        const name = req.params.name;
        if(dataJSON[name].implemented==false){
            res.render('prepared.ejs');
        }else{
            console.log(dataJSON[name].displayname);
            res.render('sublogin.ejs',{
                company:dataJSON[name].displayname
            });
        }
    }
}

module.exports = new subscriptionLogin();