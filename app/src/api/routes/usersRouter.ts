import express from 'express';

import userController from '../controllers/userController';

const router = express.Router();

router.post('/', userController.createUser);

router.route('/me')
    .get(userController.getCurrentUser)
    .delete(userController.deleteCurrentUser);

router.put('/password', userController.resetPassword);

export default router;
