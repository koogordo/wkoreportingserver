"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PouchDBReplicationStream = require('pouchdb-replication-stream');
var Repository = /** @class */ (function () {
    function Repository(dbo) {
        this.dbo = dbo;
    }
    Repository.prototype.create = function (doc) {
        return this.dbo.put(doc);
    };
    Repository.prototype.update = function (doc) {
        return this.dbo.put(doc);
    };
    Repository.prototype.find = function (id) {
        return this.dbo.get(id);
    };
    Repository.prototype.findBySelector = function (selector) {
        return this.dbo.find(selector).then(function (payload) {
            return payload.docs;
        });
    };
    Repository.prototype.delete = function (id) {
        var _this = this;
        return this.dbo.get(id).then(function (doc) {
            return _this.dbo.remove(doc);
        });
    };
    Repository.prototype.findAll = function (options) {
        return this.dbo.allDocs(options).then(function (payload) {
            return payload.rows
                .filter(function (row) {
                return (!row.doc._id.startsWith('_design') &&
                    row.doc._id !== 'clients');
            })
                .map(function (row) {
                return row.doc;
            });
        });
    };
    Repository.prototype.createAll = function (docs) {
        return this.dbo.bulkDocs(docs);
    };
    Repository.prototype.deleteAll = function (docs) {
        return this.dbo.bulkDocs(docs);
    };
    Repository.prototype.query = function (designView, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbo.query(designView, options, function (err, payload) {
                if (err) {
                    reject(err);
                }
                if (payload) {
                    resolve(payload);
                }
                else {
                    reject(new Error("Error querying view " + designView + " failed"));
                }
            });
        });
        //return this.dbo.query(designView, options);
    };
    Repository.prototype.stream = function (stream, options) {
        this.dbo.dump(stream, options);
    };
    Repository.prototype.repoDatabase = function () {
        return this.dbo;
    };
    return Repository;
}());
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map