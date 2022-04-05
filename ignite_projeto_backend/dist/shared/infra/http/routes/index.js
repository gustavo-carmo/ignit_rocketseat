"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _authenticate = _interopRequireDefault(require("./authenticate.routes"));

var _cars = _interopRequireDefault(require("./cars.routes"));

var _categories = _interopRequireDefault(require("./categories.routes"));

var _password = _interopRequireDefault(require("./password.routes"));

var _rentals = _interopRequireDefault(require("./rentals.routes"));

var _specifications = _interopRequireDefault(require("./specifications.routes"));

var _users = _interopRequireDefault(require("./users.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/categories', _categories.default);
routes.use('/specifications', _specifications.default);
routes.use('/users', _users.default);
routes.use('/session', _authenticate.default);
routes.use('/cars', _cars.default);
routes.use('/rentals', _rentals.default);
routes.use('/password', _password.default);
var _default = routes;
exports.default = _default;