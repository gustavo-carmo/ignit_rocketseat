"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _CreateRentalController = _interopRequireDefault(require("../../../../modules/rentals/useCases/CreateRental/CreateRentalController"));

var _DevolutionRentalController = _interopRequireDefault(require("../../../../modules/rentals/useCases/DevolveRental/DevolutionRentalController"));

var _ListRentalsByUserController = _interopRequireDefault(require("../../../../modules/rentals/useCases/ListRentalsByUser/ListRentalsByUserController"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createRentalController = new _CreateRentalController.default();
const devolutionRentalController = new _DevolutionRentalController.default();
const listRentalsByUserUseCase = new _ListRentalsByUserController.default();
const rentalsRouter = (0, _express.Router)();
rentalsRouter.use(_ensureAuthenticated.default);
rentalsRouter.post('/', createRentalController.handle);
rentalsRouter.post('/:id/devolutions', devolutionRentalController.handle);
rentalsRouter.get('/user', listRentalsByUserUseCase.handle);
var _default = rentalsRouter;
exports.default = _default;