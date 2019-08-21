import express from 'express';

import userController from '../controllers/userController';

const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };

const router = express.Router();

router.post('/', userController.createUser);

router.route('/me')
    .get(userController.getCurrentUser)
    .delete(userController.deleteCurrentUser);

router.put('/password', asyncMiddleware(userController.resetPassword));

export default router;