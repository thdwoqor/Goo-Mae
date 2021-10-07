const NetflixService = require("./netflix");
const WatchaService = require("./whatcha");

const registeredService = {
    '넷플릭스': NetflixService,
    '왓챠': WatchaService
}

const services =  {
    get_service(name) {
        console.log(name+"불러오기 완료");
        return new registeredService[name];
    }
};

module.exports = services;