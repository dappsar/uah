#!/bin/sh
truffle migrate --reset
npm run build
#sudo rm -rf /opt/tomcat/webapps/uah/
#sudo mkdir /opt/tomcat/webapps/uah/
#sudo systemctl restart tomcat
sudo cp -R ./build/* /opt/tomcat/webapps/uah
