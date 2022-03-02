"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthenticateUserController_1 = __importDefault(require("../modules/accounts/useCases/authenticateUser/AuthenticateUserController"));
var authenticateRoutes = express_1.Router();
var authenticateController = new AuthenticateUserController_1.default();
authenticateRoutes.post('/', authenticateController.handle);
exports.default = authenticateRoutes;
