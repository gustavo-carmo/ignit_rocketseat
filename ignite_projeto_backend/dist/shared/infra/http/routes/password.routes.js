"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ResetPasswordController = _interopRequireDefault(require("../../../../modules/accounts/useCases/resetPassword/ResetPasswordController"));

var _SendForgotPasswordController = _interopRequireDefault(require("../../../../modules/accounts/useCases/sendForgotPassword/SendForgotPasswordController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordRoute = (0, _express.Router)();
const sendForgotPasswordController = new _SendForgotPasswordController.default();
const resetPasswordController = new _ResetPasswordController.default();
passwordRoute.post('/forgot', sendForgotPasswordController.handle);
passwordRoute.post('/reset', resetPasswordController.handle);
var _default = passwordRoute;
exports.default = _default;