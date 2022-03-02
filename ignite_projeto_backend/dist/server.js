"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
require("express-async-errors");
require("./database");
require("./shared/container");
var AppError_1 = __importDefault(require("./errors/AppError"));
var routes_1 = __importDefault(require("./routes"));
var swagger_json_1 = __importDefault(require("./swagger.json"));
var app = express_1.default();
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use(routes_1.default);
app.use(function (err, request, response, next) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            message: err.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: "Internal server error - " + err.message,
    });
});
app.listen(3333, function () {
    console.log('Server running!');
});
