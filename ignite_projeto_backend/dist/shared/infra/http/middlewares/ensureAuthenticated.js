"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = require("@config/auth");

var _UsersRepository = _interopRequireDefault(require("@modules/accounts/infra/typeorm/repositories/UsersRepository"));

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ensureAuthenticated = async (request, response, next) => {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    throw new _AppError.default('Token missing!', 401);
  }

  const [, token] = authorizationHeader.split(' ');

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.secret_token);
    const usersRepository = new _UsersRepository.default();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('User does not exists', 401);
    }

    request.user = {
      id: user_id,
      is_admin: user.is_admin
    };
    next();
  } catch (error) {
    throw new _AppError.default('Invalid token!', 401);
  }
};

var _default = ensureAuthenticated;
exports.default = _default;