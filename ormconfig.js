import * as fs from'fs';
module.exports = {
   "type": "mysql",
   "host": "wkohfatrackingsql.mysql.database.azure.com",
   "port": 3306,
   "username": "wko@wkohfatrackingsql", 
   "password": "wK0mI55ghBU9pp",
   "database": "wkohfatracking",
   "ssl" : {
      "ca": fs.readFileSync(__dirname + '/BaltimoreCyberTrustRoot.crt.pem')
   },
   "synchronize": true,
   "logging": false,
   "entities": [
      "build/data/entity/**/*.js"
   ],
   "migrations": [
      "build/data/migration/**/*.js"
   ],
   "subscribers": [
      "build/data/subscriber/**/*.js"
   ],
   "cli": {
      "entitiesDir": "src/data/entity",
      "migrationsDir": "src/data/migration",
      "subscribersDir": "src/data/subscriber"
   }
}