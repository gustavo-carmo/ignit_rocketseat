"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var CreateSpecificationController_1 = __importDefault(require("../modules/cars/useCases/createSpecification/CreateSpecificationController"));
var specificationRoutes = express_1.Router();
var createSpecificationController = new CreateSpecificationController_1.default();
specificationRoutes.use(ensureAuthenticated_1.default);
// specificationRoutes.get('/', );
specificationRoutes.post('/', createSpecificationController.handle);
exports.default = specificationRoutes;
