'use strict'

const db = require('../db/mariadb');
const subscription = require('./subscription');
const fs = require('fs');
const dataBuffer = fs.readFileSync('public/subinfo.json');
const dataJSON = JSON.parse(dataBuffer);

class subscriptions {
    constructor(){this.userSubscriptions =[];}
    
    async setSubscriptions(id) {
        let rows;
        try {
            [rows] = await db.query('select * from `sub_info` where `member_id`=? ', [id]);
            for(let index in rows){
                let start;
                const dt = new Date();
                if(rows[index].sub_next<10)
                    start = `${dt.getFullYear()}-${dt.getMonth()+1}-0${rows[index].sub_next}`;
                else
                    start = `${dt.getFullYear()}-${dt.getMonth()+1}-${rows[index].sub_next}`;
                this.userSubscriptions.push(new subscription(rows[index].sub_company, dataJSON[rows[index].sub_company].icon, dataJSON[rows[index].sub_company].displayname, rows[index].sub_fee, start))
            }
            // console.log(this.userSubscriptions);
            // console.log(JSON.stringify( this.userSubscriptions ));
        }catch(e1){
            console.log(e1)
        }finally{
            console.log("구독 데이터 불러오기 완료")
        }
    }
    getSubscriptions(){
        return JSON.parse(JSON.stringify( this.userSubscriptions ));
    }
};

module.exports =subscriptions;