// import { IAppConfig } from './server/WKOServer';
import { IdbConfig } from './data/Database'

// export const AppConfig: IAppConfig = {
//     host: 'localhost',
//     middleware: [],
//     port: 3000,
// };
export const DbConfig: IdbConfig = {
    // domain: 'https://admin:wK0mI55ghBU9pp@www.hfatracking.net/couchdb', // prod
    domain: 'http://admin:admin@localhost:5984', // dev
    // password: 'wK0mI55ghBU9pp', // prod
    password: 'admin', // dev
    username: 'admin', // dev prod,
}
export const jwtSecret =
    '89fdajkl4b&$b$*$(bB#&kbhbj3kakdhbkajdnfu84r7834tr3o487bk4b23khjbe2k3brkhref'
