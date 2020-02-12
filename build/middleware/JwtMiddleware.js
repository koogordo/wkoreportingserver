"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = __importStar(require("jsonwebtoken"));
var config_1 = require("../config");
function extractTokenFromAuthHeader(auth) {
    if (!auth) {
        throw new Error('Could not extract token from header');
    }
    return auth.split(' ')[1];
}
exports.extractTokenFromAuthHeader = extractTokenFromAuthHeader;
exports.checkJwt = function (req, res, next) {
    var token = extractTokenFromAuthHeader(req.headers['authorization']);
    var jwtPayload;
    //Try to validate the token and get data
    try {
        jwtPayload = jwt.verify(token, config_1.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).json({ err: error });
    }
    //The token is valid for 1 hour
    //We want to send a new token on every request
    var roles = jwtPayload.roles, username = jwtPayload.username;
    var newToken = jwt.sign({ roles: roles, username: username }, config_1.jwtSecret, {
        expiresIn: '1h',
    });
    res.setHeader('token', newToken);
    //Call the next middleware or controller
    next();
};
exports.checkRole = function (role) {
    return function (req, res, next) {
        var token = extractTokenFromAuthHeader(req.headers['authorization']);
        var jwtPayload;
        //Try to validate the token and get data
        try {
            jwtPayload = jwt.verify(token, config_1.jwtSecret);
            res.locals.jwtPayload = jwtPayload;
        }
        catch (error) {
            //If token is not valid, respond with 401 (unauthorized)
            res.status(401).json({
                err: new Error("User doesn't have correct role"),
                roles: jwtPayload.roles,
            });
            return;
        }
        //The token is valid for 1 hour
        //We want to send a new token on every request
        var roles = jwtPayload.roles, username = jwtPayload.username;
        if (roles.indexOf(role) > -1) {
            next();
        }
        else {
            res.status(309).json(new Error('User does not have appropriate role'));
        }
    };
};
//# sourceMappingURL=JwtMiddleware.js.map