# WebRTC Signaling Server 
- A very simple signaling server for video conferencing, chat, group video chatm screen share or file sharing peer to peer.

## requirements 
- Install node latest version 
- letsencrypt free certificate if available or cloudflare certificate (cert.pem, key.pem, bundle.pem)

## Install through NPM 
- mkdir signaling-server && cd signaling-server
- npm install webrtc-signaling-server
- nano server.js 
- write the following code 
- const server = require('webrtc-signaling-server');
- server.init();
- ctrl + o, ctrl + x 
- node server.js 
- config file and certificate folder will generated automatically, 
- put your certificate on the folder and link it on config.json 
- now you can run node server.js --ssl 

## install through github clone 
- git clone https://github.com/technicalheist/webrtc-signaling-server.git
- cd webrtc-signaling-server
- node server.js 
- config file and certificate folder will generated automatically, 
- put your certificate on the folder and link it on config.json 
- now you can run node server.js --ssl 

## for help 
- type node server.js --help 
