'use strict'
class subscription {
    title;
    icon;
    name;
    fee;
    start;
    constructor(title,icon,name,fee,start) {
       this.title=title;
       this.icon=icon;
       this.name=name;
       this.fee=fee;
       this.start=start;
    }
    
    getTitle(){
        return this.title;
    }
    getIcon(){
        return this.icon;
    }
    getName(){
        return this.name;
    }
    getFee(){
        return this.fee;
    }
    getstart(){
        return this.start;
    }
};

module.exports = subscription