"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var AppError_1 = __importDefault(require("../../../../errors/AppError"));
var ImportCategoryUseCase_1 = __importDefault(require("./ImportCategoryUseCase"));
var ImportCategoryController = /** @class */ (function () {
    function ImportCategoryController() {
    }
    ImportCategoryController.prototype.handle = function (request, response) {
        var file = request.file;
        var importCategoryUseCase = tsyringe_1.container.resolve(ImportCategoryUseCase_1.default);
        if (!file) {
            throw new AppError_1.default('File is required');
        }
        importCategoryUseCase.execute(file);
        return response.status(201).send();
    };
    return ImportCategoryController;
}());
exports.default = ImportCategoryController;
