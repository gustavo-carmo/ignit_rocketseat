"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var UsersRepository_1 = __importDefault(require("../../modules/accounts/repositories/implementations/UsersRepository"));
var CategoriesRepository_1 = __importDefault(require("../../modules/cars/repositories/implementations/CategoriesRepository"));
var SpecificationsRepository_1 = __importDefault(require("../../modules/cars/repositories/implementations/SpecificationsRepository"));
tsyringe_1.container.registerSingleton('CategoriesRepository', CategoriesRepository_1.default);
tsyringe_1.container.registerSingleton('SpecificationsRepository', SpecificationsRepository_1.default);
tsyringe_1.container.registerSingleton('UsersRepository', UsersRepository_1.default);
