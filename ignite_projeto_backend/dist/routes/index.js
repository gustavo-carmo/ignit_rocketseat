"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authenticate_routes_1 = __importDefault(require("./authenticate.routes"));
var categories_routes_1 = __importDefault(require("./categories.routes"));
var specifications_routes_1 = __importDefault(require("./specifications.routes"));
var users_routes_1 = __importDefault(require("./users.routes"));
var routes = express_1.Router();
routes.use('/categories', categories_routes_1.default);
routes.use('/specifications', specifications_routes_1.default);
routes.use('/users', users_routes_1.default);
routes.use('/session', authenticate_routes_1.default);
exports.default = routes;
