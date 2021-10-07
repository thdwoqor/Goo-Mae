// require('chromedriver');
// const moment = require('moment');
// const { Builder, this.By, Key, this.until } = require('selenium-webdriver');

// const chrome = require('selenium-webdriver/chrome');

// const {Builder, this.By, Key, this.until} = require('selenium-webdriver');

// (async function example() {
//   let this.driver = await new Builder().forBrowser('chrome').build();
//   try {
//     await this.driver.get('http://www.google.com/ncr');
//     await this.driver.findElement(this.By.name('q')).sendKeys('webdriver', Key.RETURN);
//     await this.driver.wait(this.until.titleIs('webdriver - Google Search'), 1000);
//   } finally {
//     await this.driver.get('http://www.naver.com/');
//   }
// })();

const Service = require('./service');

const url = 'https://watcha.com/sign_in';

const info_url = 'https://watcha.com/settings';

module.exports = class WatchaService extends Service { 

    async login(id, pw) {
        //로그인
        console.dir("login 메소드 실행");

            await this.driver.get(url);    //get(url) 인거 보면 뭔지 알것같이 생겼다
            let ID_Element = this.driver.findElement(this.By.xpath('//*[@id="root"]/div[1]/main/div[1]/main/div/form/div[1]/input'));

            await ID_Element.sendKeys(id);
            let password_Element = this.driver.findElement(this.By.xpath('//*[@id="root"]/div[1]/main/div[1]/main/div/form/div[2]/input'));

            await password_Element.sendKeys(pw);
            this.driver.sleep(2000);
            let enter_Element = this.driver.findElement(this.By.xpath('//*[@id="root"]/div[1]/main/div[1]/main/div/form/div[3]/button'));
            await enter_Element.click();
            
    }

    get_subscription_fee(tier) {
        const fee={
            "베이직 이용권":"7900",
            "프리미엄 이용권":"12900"
        }
        return fee[tier];
    }

    async get_subscription_info() {
        console.dir("get_info 메소드 실행");

        let Information = { 
              subscription_company:"watcha" ,
              subscription_cycle:"1"
        };

            await this.driver.wait(this.until.elementLocated(this.By.xpath('//*[@id="root"]/div[1]/main/div[1]/section/header/h1')), 10000);
            
            await this.driver.get(info_url);

            let next_membership_Element = this.driver.findElement(this.By.xpath('//*[@id="root"]/div[1]/main/section/section/section[1]/ul/li[1]/div[2]/p[1]'));
            let next_membership = await next_membership_Element.getText();
            next_membership = this.moment(next_membership, 'YYYY년 MM월 DD일');
            //console.log(next_membership.format('YYYY-MM-DD'));
            Information['next_membership'] = next_membership.format('DD');

            let subscription_fee_Element = this.driver.findElement(this.By.xpath('//*[@id="root"]/div[1]/main/section/section/section[1]/ul/li[1]/div[2]/div'));
            let subscription_fee = await subscription_fee_Element.getText();
    
            Information['subscription_fee'] = this.get_subscription_fee(subscription_fee); 

            console.log(Information);
            await this.driver.quit();
            return Information;

    }
}

// (async function whatcha_crawling() {
//     let this.driver = await new Builder().forBrowser('chrome').build();    
// })();

// exports.whatcha_crawling = async function(id,pw){
//     let this.driver = await new Builder()
//     .forBrowser('chrome')
//     .setChromeOptions(
//           new chrome.Options()
//           // headless 모드 사용
//           .headless()
//     )
//     .build();  
    
//     await login(this.driver,id,pw);

//     return Information;
// }
