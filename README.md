# insuredmine_assignment

Assignment from Insuredmine

#API setup

1. "npm install" : installation of all packages
2. "npm install -g forever" : forever package is used for starting application even after crash
3. config/development/.js : configuration file (replace "mobngodb" with correct url - i have used localhost)
4. "npm start" : start the application, forever package is used. (if cpu usage % greater than 70 auto restart)
