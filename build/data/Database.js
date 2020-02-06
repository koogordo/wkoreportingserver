"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var $PouchDB = __importStar(require("pouchdb"));
var PouchDB = $PouchDB['default'];
var pouchdb_find_1 = __importDefault(require("pouchdb-find"));
var PouchDBReplicationStream = require('pouchdb-replication-stream');
var Database = /** @class */ (function () {
    function Database(config) {
        this.config = config;
        PouchDB.plugin(pouchdb_find_1.default);
        PouchDB.plugin(PouchDBReplicationStream.plugin);
        PouchDB.adapter('writableStream', PouchDBReplicationStream.adapters.writableStream);
    }
    Database.prototype.familyDBInstance = function () {
        return new PouchDB(this.config.domain + "/families");
    };
    Database.prototype.userDBInstance = function () {
        return new PouchDB(this.config.domain + "/_users");
    };
    Database.prototype.archiveDBInstance = function () {
        return new PouchDB(this.config.domain + "/formarchive");
    };
    Database.prototype.formDBInstance = function () {
        return new PouchDB(this.config.domain + "/forms");
    };
    Database.prototype.reviewGroupDBInstance = function () {
        return new PouchDB(this.config.domain + "/reviewgroups");
    };
    Database.prototype.osDBInstance = function (osDbName) {
        return new PouchDB(this.config.domain + "/" + osDbName.toLowerCase());
    };
    Database.prototype.baseAddressInstance = function () {
        return "https://" + this.config.domain + "/couchdb";
    };
    Database.prototype.authBaseAddressInstance = function () {
        return "https://" + this.config.username + ":" + this.config.password + "@" + this.config.domain + "/couchdb";
    };
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=Database.js.map