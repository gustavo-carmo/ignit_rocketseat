"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ensureIsAdmin = async (request, response, next) => {
  if (!request.user) {
    throw new _AppError.default('You must have being loged!');
  }

  const {
    is_admin
  } = request.user;

  if (!is_admin) {
    throw new _AppError.default('User is not an Admin');
  }

  next();
};

var _default = ensureIsAdmin;
exports.default = _default;