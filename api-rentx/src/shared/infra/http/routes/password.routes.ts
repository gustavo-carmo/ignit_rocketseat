import { Router } from 'express';

import ResetPasswordController from '@modules/accounts/useCases/resetPassword/ResetPasswordController';
import SendForgotPasswordController from '@modules/accounts/useCases/sendForgotPassword/SendForgotPasswordController';

const passwordRoute = Router();

const sendForgotPasswordController = new SendForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoute.post('/forgot', sendForgotPasswordController.handle);
passwordRoute.post('/reset', resetPasswordController.handle);

export default passwordRoute;
