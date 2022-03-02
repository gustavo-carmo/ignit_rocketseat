"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var CreateCategoryController_1 = __importDefault(require("../modules/cars/useCases/createCategory/CreateCategoryController"));
var ImportCategoryController_1 = __importDefault(require("../modules/cars/useCases/importCategory/ImportCategoryController"));
var ListCategoriesController_1 = __importDefault(require("../modules/cars/useCases/listCategories/ListCategoriesController"));
var categoriesRoutes = express_1.Router();
var upload = multer_1.default({
    dest: './tmp',
});
var createCategoryController = new CreateCategoryController_1.default();
var importCategoryController = new ImportCategoryController_1.default();
var listCategoriesController = new ListCategoriesController_1.default();
categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post('/', createCategoryController.handle);
categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle);
exports.default = categoriesRoutes;
