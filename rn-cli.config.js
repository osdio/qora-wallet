var blacklist= require("react-native/packager/blacklist");
var config = {
    getBlacklistRE(platform) {
        return blacklist(platform,[/qora-wallet.+\/node_modules\/crypto.*/]);
    }
}
module.exports = config;
