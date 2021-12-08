'use strict'
class user {
    constructor(id,pw,name) {
       this.id=id;
       this.pw=pw;
       this.name=name;
    }
    
    getID(){
        return this.id;
    }
    getPW(){
        return this.pw;
    }
    getNAME(){
        return this.name;
    }
};

module.exports = user