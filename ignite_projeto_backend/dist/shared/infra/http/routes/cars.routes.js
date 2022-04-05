"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _CreateCarController = _interopRequireDefault(require("../../../../modules/cars/useCases/createCar/CreateCarController"));

var _CreateSpecificationCarController = _interopRequireDefault(require("../../../../modules/cars/useCases/createSpecificationCar/CreateSpecificationCarController"));

var _ListAvailableCarController = _interopRequireDefault(require("../../../../modules/cars/useCases/listCar/ListAvailableCarController"));

var _UploadCarImagesController = _interopRequireDefault(require("../../../../modules/cars/useCases/uploadCarImage/UploadCarImagesController"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _ensureIsAdmin = _interopRequireDefault(require("../middlewares/ensureIsAdmin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carsRouter = (0, _express.Router)();
const createCarsController = new _CreateCarController.default();
const listAvailableCarController = new _ListAvailableCarController.default();
const createSpecificationCarController = new _CreateSpecificationCarController.default();
const uploadCarImagesController = new _UploadCarImagesController.default();
const uploadCarImages = (0, _multer.default)(_upload.default);
carsRouter.get('/available', listAvailableCarController.handle);
carsRouter.use(_ensureAuthenticated.default, _ensureIsAdmin.default);
carsRouter.post('/:id/images', uploadCarImages.array('images'), uploadCarImagesController.handle);
carsRouter.post('/:id/specifications', createSpecificationCarController.handle);
carsRouter.post('/', createCarsController.handle);
var _default = carsRouter;
exports.default = _default;