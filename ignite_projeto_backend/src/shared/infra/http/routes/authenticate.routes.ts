import { Router } from 'express';

import AuthenticateUserController from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const authenticateRoutes = Router();
const authenticateController = new AuthenticateUserController();

authenticateRoutes.post('/', authenticateController.handle);

export default authenticateRoutes;
