require('chromedriver');
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const moment = require('moment');

module.exports = class Service {

    constructor() {
        console.log("생성자");
    }

    async quit(){
        this.driver.quit();
    }

    async launch() {
        this.moment=moment;
        this.Key=Key;
        this.By=By;
        this.until=  until;
        this.driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(
                new chrome.Options()
                // headless 모드 사용
                //.headless()
            )
            .build();  
        console.dir("1번 크롬"+this.driver);
    }

    async login(id, pw) { }

    get_subscription_fee(tier) { }

    async get_subscription_info() { }

    // async canel_subscription() { }

}
