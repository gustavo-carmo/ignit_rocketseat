"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

require("express-async-errors");

require("@shared/container");

var _upload = _interopRequireDefault(require("@config/upload"));

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

var _swagger = _interopRequireDefault(require("../../../swagger.json"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _typeorm.default)('172.16.238.10');
const app = (0, _express.default)();
app.use(_express.default.json());
app.use('/avatar', _express.default.static(`${_upload.default.tmpFolder}/avatar`));
app.use('/car', _express.default.static(`${_upload.default.tmpFolder}/car`));
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.use(_routes.default);
app.use((err, request, response, next) => {
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  });
});
var _default = app;
exports.default = _default;