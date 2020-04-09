import express from 'express';

import asyncController from '../routes/asyncController';
import * as passwordResetService from '../services/passwordReset';
import { TokenVerificationError } from '../services/passwordReset';
import * as userService from '../services/user';
import { ValidationError } from '../validation';

const createUser = asyncController(async (req: express.Request, res: express.Response) => {
    const user = req.body;
    if (req.session.user_id) {
        return res.send({ error: 'Already signed in' });
    }

    if (user.email) {
        if (user.email != user.confirm_email) {
            return res.send({ error: 'Email did not match confirmation.' });
        }
    } else {
        user.email = null;
    }

    try {
        const result = await userService.createUser(user);
        if (result.user_id) {
            req.session.user_id = result.user_id;
            res.send({ user_id: result.user_id });
        } else {
            req.session.user_id = undefined;
            res.send({ error: result.error });
        }
    } catch(err) {
        console.error(err);
        res.send(err);
    }
});

const getCurrentUser = asyncController(async (req: express.Request, res: express.Response) => {
    if (!req.session.user_id) {
        return res.send({ error: 'Must be logged in' });
    }

    try {
        const user = await userService.getUserById(req.session.user_id);
        res.send(user);
    } catch(error) {
        res.send(error);
    }
});

const deleteCurrentUser = asyncController(async (req: express.Request, res: express.Response) => {
    if (!req.session.user_id) {
        return res.send({ error: 'Must be logged in' });
    }
    console.log(`Deleting user ${req.session.user_id}`);

    try {
        await userService.deleteUser(req.session.user_id);
        await userService.logout(req.session);

        res.send({ success: true });
    } catch(err) {
        res.send({ error: err });
    }
});

const resetPassword = asyncController(async function(req: express.Request, res: express.Response) {
    if(req.body == undefined || (req.body.email == undefined && req.body.token == undefined)) {
        return res.send({ error: 'Expected an email address or password reset token in the request body' });
    }

    if(req.body.email != undefined) {
        // first stage: send reset token to email address

        const origin = getWebAppOrigin();
        await passwordResetService.sendPasswordResetToken(req.body.email, origin);

        return res.status(202).send({ success: true });
    } else if (req.body.token != undefined) {
        // second stage: verify token and reset password
        if (req.body.password == undefined) {
            return res.send({ error: 'Expected a new password' });
        }
        try {
            await passwordResetService.resetPassword(req.body.token, req.body.password);
        } catch (err) {
            if (err instanceof TokenVerificationError) {
                return res.send({ error: 'Could not verify token' });
            } else if (err instanceof ValidationError) {
                return res.send({ error: err.message});
            }

            throw err;
        }

        return res.send({ success: true });
    }
});

function getWebAppOrigin() : string {
    const origin = process.env.WEBAPP_ORIGIN;
    if (origin == undefined) {
        throw new Error('WEBAPP_ORIGIN not defined');
    }
    return origin;
}

export default {
    createUser,
    getCurrentUser,
    deleteCurrentUser,
    resetPassword
};
