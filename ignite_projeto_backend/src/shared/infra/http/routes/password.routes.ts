import { Router } from 'express';

import SendForgotPasswordController from '@modules/accounts/useCases/sendForgotPassword/SendForgotPasswordController';

const passwordRoute = Router();

const sendForgotPasswordController = new SendForgotPasswordController();

passwordRoute.post('/forgot', sendForgotPasswordController.handle);

export default passwordRoute;
