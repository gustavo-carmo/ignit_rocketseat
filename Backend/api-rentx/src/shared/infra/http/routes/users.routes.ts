import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateUserController from '@modules/accounts/useCases/createUser/CreateUserControler';
import ProfileUserController from '@modules/accounts/useCases/profileUser/ProfileUserController';
import UpdateUserAvatarController from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const profileUserController = new ProfileUserController();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.use(ensureAuthenticated);

usersRoutes.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

usersRoutes.get('/profile', profileUserController.handle);

export default usersRoutes;
