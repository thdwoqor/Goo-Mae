'use strict'
const db = require('../db/mariadb');
const fs = require('fs');
const { info } = require('console');
const dataBuffer = fs.readFileSync('public/subinfo.json');
const dataJSON = JSON.parse(dataBuffer);

const process_main =async function (req, res) {
    //if(req.session.user){
        let rows;
        try {
            [rows] = await db.query('select * from `sub_info` where `member_id`=? ', [req.session.user.id]);
            // [rows] = await connection.query("SELECT * FROM `member`");
            // console.dir(rows);
        }
        catch(err) {
            console.log(err);
        }finally {
            for(let i in rows) {
                rows[i].title=rows[i].sub_company;
                delete rows[i].sub_company;

                const dt = new Date();
                let start;
                if(rows[i].sub_next<10)
                    start = `${dt.getFullYear()}-${dt.getMonth()+1}-0${rows[i].sub_next}`;
                else
                    start = `${dt.getFullYear()}-${dt.getMonth()+1}-${rows[i].sub_next}`;
                // rows[i].display='list-item';
                rows[i].fee=rows[i].sub_fee;
                rows[i].start=start;
                // rows[i].end=start;
                delete rows[i].sub_cycle;
                delete rows[i].sub_next;
                delete rows[i].sub_fee;
                delete rows[i].member_id;
            }
            console.log(rows);
            // const events = [
            //     {
            //         title: "Event 1",
            //         start: "2021-10-13", 
            //     },
            //     {
            //         title: "Event 2",
            //         start: "2021-10-09",
            //     },
            // ];
            
            const events=rows;
            res.json(events);
        }
    // }
    // else
    //     res.render('main.html');
}

const output_main =async function (req, res) {
    if(req.session.user){
        res.render("usermain.ejs",{
            name:req.session.user.name
        });
    }
    else
        res.render('main.html');
}

module.exports.process_main = process_main;
module.exports.output_main = output_main;