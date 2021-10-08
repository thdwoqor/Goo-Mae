const Service = require('./service');

const url = 'https://auth.services.adobe.com/ko_KR/deeplink.html?deeplink=ssofirst&callback=https%3A%2F%2Fims-na1.adobelogin.com%2Fims%2Fadobeid%2FSunbreakWebUI1%2FAdobeID%2Ftoken%3Fredirect_uri%3Dhttps%253A%252F%252Faccount.adobe.com%252F%253Flang%253Dko%2523from_ims%253Dtrue%2526old_hash%253D%252523%2526api%253Dauthorize%2526reauth%253Dtrue%26code_challenge_method%3Dplain%26use_ms_for_expiry%3Dtrue&client_id=SunbreakWebUI1&scope=AdobeID%2Copenid%2Cacct_mgmt_api%2Cgnav%2Csao.cce_private%2Csao.digital_editions%2Ccreative_cloud%2Cread_countries_regions%2Csocial.link%2Cunlink_social_account%2Cadditional_info.address.mail_to%2Cclient.scopes.read%2Cpublisher.read%2Cadditional_info.account_type%2Cadditional_info.roles%2Cadditional_info.social%2Cadditional_info.screen_name%2Cadditional_info.optionalAgreements%2Cadditional_info.secondary_email%2Cadditional_info.secondary_email_verified%2Cadditional_info.phonetic_name%2Cadditional_info.dob%2Cupdate_profile.all%2Csecurity_profile.read%2Csecurity_profile.update%2Cadmin_manage_user_consent%2Cadmin_slo%2Cpiip_write%2Cmps%2Clast_password_update%2Cupdate_email%2Caccount_cluster.read%2Caccount_cluster.update%2Cadditional_info.authenticatingAccount%2Creauthenticated&denied_callback=https%3A%2F%2Fims-na1.adobelogin.com%2Fims%2Fdenied%2FSunbreakWebUI1%3Fredirect_uri%3Dhttps%253A%252F%252Faccount.adobe.com%252F%253Flang%253Dko%2523from_ims%253Dtrue%2526old_hash%253D%252523%2526api%253Dauthorize%2526reauth%253Dtrue%26response_type%3Dtoken&relay=5ce0b587-5d6b-4ec5-a99b-23ba4bc99d1c&locale=ko_KR&flow_type=token&ctx_id=accmgmt&idp_flow_type=login&reauthenticate=force#/';

module.exports = class AdobeService extends Service { 

    async login(id, pw) {
        //로그인
        console.dir("login 메소드 실행");

            await this.driver.get(url);    //get(url) 인거 보면 뭔지 알것같이 생겼다
            await this.driver.wait(this.until.elementLocated(this.By.xpath('//*[@id="EmailPage-EmailField"]')), 20000);
            
            let ID_Element = this.driver.findElement(this.By.xpath('//*[@id="EmailPage-EmailField"]'));
            await ID_Element.sendKeys(id);
            let next_Element = this.driver.findElement(this.By.xpath('//*[@id="EmailForm"]/section[2]/div[2]/button'));
            await next_Element.click();

            await this.driver.wait(this.until.elementLocated(this.By.xpath('//*[@id="PasswordPage-PasswordField"]')), 20000);
            
            let password_Element = this.driver.findElement(this.By.xpath('//*[@id="PasswordPage-PasswordField"]'));
            await password_Element.sendKeys(pw);

            await this.driver.wait(this.until.elementLocated(this.By.xpath('//*[@id="PasswordForm"]/section[2]/div[2]/button')), 20000);
            next_Element = this.driver.findElement(this.By.xpath('//*[@id="PasswordForm"]/section[2]/div[2]/button'));
            await next_Element.click();
  
    }

    get_subscription_fee(tier) {
        const fee={
            "포토그래피 플랜 (20GB)":"11000",
            "Creative Cloud 모든 앱":"62000",
            "1TB 용량 포함 Creative Cloud 포토그래피 플랜":"23100",
            "1TB 용량 포함 Lightroom 플랜":"11000",
            "Illustrator":"24000",
            "Premiere Pro 플랜":"24000",

        }
        return fee[tier];
    }

    async get_subscription_info() {
        console.dir("get_info 메소드 실행");

        let Information = { 
              subscription_company:"adobe" ,
              subscription_cycle:"1"
        };
            await this.driver.wait(this.until.elementLocated(this.By.xpath('//*[@id="app"]/div/div/div[2]/main/div/section[1]/div/div/div/div/div/div[3]/div/div/div[1]/ul/li[2]/div/span/div[1]')), 20000);
            
            let next_membership_Element = this.driver.findElement(this.By.xpath('//*[@id="app"]/div/div/div[2]/main/div/section[1]/div/div/div/div/div/div[3]/div/div/div[1]/ul/li[2]/div/span/div[1]'));
            let next_membership = await next_membership_Element.getText();
            next_membership = this.moment(next_membership, '다음 결제일: YYYY년 MM월 DD일');
            Information['next_membership'] = next_membership.format('DD');


            let subscription_fee_Element = this.driver.findElement(this.By.xpath('//*[@id="app"]/div/div/div[2]/main/div/section[1]/div/div/div/div/div/div[1]/div/div[2]/h5'));
            let subscription_fee = await subscription_fee_Element.getText();
            Information['subscription_fee'] = this.get_subscription_fee(subscription_fee); 

            console.log(Information);
            //await this.driver.quit();
            return Information;

    }
}