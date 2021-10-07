// require('chromedriver');
// const {Builder, By, Key, until} = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');

// const moment = require('moment');

const Service = require('./service');

const url = 'https://www.netflix.com/kr/login?nextpage=https%3A%2F%2Fwww.netflix.com%2FYourAccount';

// 구독 정보를 얻는다: 객체 생성 -> 로그인 -> 구독정보얻는함수호출 -> 끝! (객체 필요없음)
// 구독 취소

module.exports = class NetflixService extends Service { 

      async login(id, pw) {
            //로그인
            console.dir("login 메소드 실행");

            await this.driver.get('https://www.netflix.com/kr/login?nextpage=https%3A%2F%2Fwww.netflix.com%2FYourAccount');    
            
            await this.driver.wait(this.until.elementLocated(this.By.xpath("/html/body/div[1]/div/div[3]/div/div/div[1]/form/div[1]/div[1]/div/label/input")), 5000);

            let ID_Element = this.driver.findElement(this.By.xpath('/html/body/div[1]/div/div[3]/div/div/div[1]/form/div[1]/div[1]/div/label/input'));

            await ID_Element.sendKeys(id);
            let password_Element = this.driver.findElement(this.By.xpath('/html/body/div[1]/div/div[3]/div/div/div[1]/form/div[2]/div/div/label/input'));

            await password_Element.sendKeys(pw);
            let enter_Element = this.driver.findElement(this.By.xpath('/html/body/div[1]/div/div[3]/div/div/div[1]/form/button'));
            await enter_Element.click();

      }

      get_subscription_fee(tier) {
            const fee = {
                  "베이식":"9500",
                  "스탠다드":"12000",
                  "프리미엄":"14000"
            }
            return fee[tier];
      }

      async get_subscription_info() {
            console.dir("get_info 메소드 실행");

            let Information = { 
                  subscription_company:"netflix" ,
                  subscription_cycle:"1"
            };

            await this.driver.wait(this.until.elementLocated(this.By.xpath("/html/body/div[1]/div/div/div[2]/div/div/div[4]/div[1]/section/div[2]/div/div/div[1]/div[2]")), 5000);

            let next_membership_Element = this.driver.findElement(this.By.xpath('/html/body/div[1]/div/div/div[2]/div/div/div[4]/div[1]/section/div[2]/div/div/div[1]/div[2]'));
            let next_membership = await next_membership_Element.getText();
            next_membership = this.moment(next_membership,'다음 결제일은 YYYY년 MM월 DD일입니다.');

            Information['next_membership']=next_membership.format('DD');
            
            let subscription_fee_Element = this.driver.findElement(this.By.xpath('/html/body/div[1]/div/div/div[2]/div/div/div[4]/div[2]/section/div/div[1]/div[1]/div'));
            let subscription_fee=await subscription_fee_Element.getText();
            
            Information['subscription_fee'] = this.get_subscription_fee(subscription_fee);  

            console.dir(Information);

            this.driver.quit();
            return Information;
      }
}

/*
(async function myFunction() {
	let driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(
            new chrome.Options()
            // headless 모드 사용
            .headless()
        )
      .build();  

      await login(driver);
      await Search(driver);
      console.dir(Information);
})();
*/

// exports.netflix_crawling = async function(id,pw){
//       let driver = await new Builder()
//       .forBrowser('chrome')
//       .setChromeOptions(
//             new chrome.Options()
//             // headless 모드 사용
//             .headless()
//       )
//       .build();  
      
//       await login(driver,id,pw);
//       await Search(driver);
//       await driver.quit();
//       return Information;
// }


