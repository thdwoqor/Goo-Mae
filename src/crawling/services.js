const NetflixService = require("./netflix");
const WatchaService = require("./whatcha");
const AdobeService=require("./adobe");


class Service {
    constructor() {
        this.registeredService = {
            '넷플릭스': NetflixService,
            '왓챠': WatchaService,
            "어도비 크리에이티브 클라우드":AdobeService
        };
    }

    get_service(name) {
        console.log(name+"불러오기 완료");
        return new this.registeredService[name];
    }

}
module.exports = new Service();