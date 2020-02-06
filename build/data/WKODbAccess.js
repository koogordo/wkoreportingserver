"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = require("./Database");
var Repository_1 = require("./Repository");
var WKODbAccess = /** @class */ (function () {
    function WKODbAccess(config) {
        this.dbo = new Database_1.Database(config);
    }
    WKODbAccess.prototype.visits = function (osname) {
        return new Repository_1.Repository(this.dbo.osDBInstance(osname));
    };
    WKODbAccess.prototype.users = function () {
        return new Repository_1.Repository(this.dbo.userDBInstance());
    };
    WKODbAccess.prototype.families = function () {
        return new Repository_1.Repository(this.dbo.familyDBInstance());
    };
    WKODbAccess.prototype.osClients = function (osname) {
        return new Repository_1.Repository(this.dbo.osDBInstance(osname));
    };
    WKODbAccess.prototype.reviewGroups = function () {
        return new Repository_1.Repository(this.dbo.reviewGroupDBInstance());
    };
    WKODbAccess.prototype.forms = function () {
        return new Repository_1.Repository(this.dbo.formDBInstance());
    };
    WKODbAccess.prototype.archive = function () {
        return new Repository_1.Repository(this.dbo.archiveDBInstance());
    };
    return WKODbAccess;
}());
exports.WKODbAccess = WKODbAccess;
//# sourceMappingURL=WKODbAccess.js.map