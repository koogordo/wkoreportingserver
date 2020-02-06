import * as $PouchDB from 'pouchdb';
const PouchDB = $PouchDB['default'];
import PouchDBFind from 'pouchdb-find';
const PouchDBReplicationStream = require('pouchdb-replication-stream');
export interface IdbConfig {
    username: string;
    password: string;
    domain: string;
}
export class Database {
    private config: IdbConfig;
    constructor(config: IdbConfig) {
        this.config = config;
        PouchDB.plugin(PouchDBFind);
        PouchDB.plugin(PouchDBReplicationStream.plugin);
        (PouchDB as any).adapter(
            'writableStream',
            PouchDBReplicationStream.adapters.writableStream
        );
    }

    public familyDBInstance(): PouchDB.Database {
        return new PouchDB(`${this.config.domain}/families`);
    }

    public userDBInstance(): PouchDB.Database {
        return new PouchDB(`${this.config.domain}/_users`);
    }

    public archiveDBInstance(): PouchDB.Database {
        return new PouchDB(`${this.config.domain}/formarchive`);
    }

    public formDBInstance(): PouchDB.Database {
        return new PouchDB(`${this.config.domain}/forms`);
    }
    public reviewGroupDBInstance(): PouchDB.Database {
        return new PouchDB(`${this.config.domain}/reviewgroups`);
    }
    public osDBInstance(osDbName: string) {
        return new PouchDB(`${this.config.domain}/${osDbName.toLowerCase()}`);
    }

    private baseAddressInstance(): string {
        return `https://${this.config.domain}/couchdb`;
    }
    private authBaseAddressInstance(): string {
        return `https://${this.config.username}:${this.config.password}@${this.config.domain}/couchdb`;
    }
}
