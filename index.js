// TechnicalHeist      - www.technicalheist.com
// MIT License    - https://github.com/technicalheist/webrtc-signaling-server/blob/master/LICENSE
// Documentation  - https://github.com/technicalheist/webrtc-signaling-server
var fs = require('fs');

//creating certificate folder
var createDir = () =>{
    var dir = './certificate';
    if (!fs.existsSync(dir)){
        console.log('Certificate Directory Created');
        fs.mkdirSync(dir);
    }
}

//generating Config file
var createConfig = () => {
    let config = {
        "socketURL": "/",
        "dirPath": "",
        "port": "8090",
        "enableLogs": "false",
        "autoRebootServerOnFailure": "false",
        "isUseHTTPs": "false",
        "sslKey": "",
        "sslCert": "",
        "sslCabundle": "",
        "enableAdmin": "false",
        "adminUserName": "admin",
        "adminPassword": "password"
      }

    let data = JSON.stringify(config);
    let configFile = './config.json';
    if (!fs.existsSync(configFile)){
        console.log('Config file generated');
        fs.writeFileSync('config.json', data);
    }
}


exports.init = () => {
    createDir(); createConfig();
const signalingServer = require('webrtc-signaling-helpers');
var PORT = 8090;
var isUseHTTPs = false;
const jsonPath = {
    config: 'config.json',
    logs: 'logs.json'
};

const BASH_COLORS_HELPER = signalingServer.BASH_COLORS_HELPER;
const getValuesFromConfigJson = signalingServer.getValuesFromConfigJson;
const getBashParameters = signalingServer.getBashParameters;
var config = getValuesFromConfigJson(jsonPath);
config = getBashParameters(config, BASH_COLORS_HELPER);

var cert = signalingServer.checkCertificate; //certificate check http or https 
var socket = signalingServer.socketScript;  //socket script 
// if user didn't modifed "PORT" object
// then read value from "config.json"
if(PORT === 8090) {
    PORT = config.port;
}

if(isUseHTTPs === false) {
    isUseHTTPs = config.isUseHTTPs;
}

var httpApp = cert.checkCertficate(config,isUseHTTPs); //getting whether to use http or https
signalingServer.beforeHttpListen(httpApp, config);

httpApp = httpApp.listen(process.env.PORT || PORT, process.env.IP || "0.0.0.0", function() {
    signalingServer.afterHttpListen(httpApp, config);
});

// --------------------------
// socket.io codes goes below
// --------------------------
var sock = socket.socket(signalingServer,config,httpApp);

}


