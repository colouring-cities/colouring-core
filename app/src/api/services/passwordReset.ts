import url, { URL } from 'url';
import { errors } from 'pg-promise';
import nodemailer from 'nodemailer';

import db from '../../db';
import * as userService from './user';
import { transporter } from './email';
import { validatePassword } from '../validation';


/**
 * Generate a password reset token for the specified account and send the password reset link by email
 * @param email the email address for which to generate a password reset token
 * @param siteOrigin the origin of the website, without a path element - e.g. https://beta.colouring.london
 */
async function sendPasswordResetToken(email: string, siteOrigin: string): Promise<void> {
    const user = await userService.getUserByEmail(email);

    // if no user found for email, do nothing
    if (user == undefined) return;

    const token = await createPasswordResetToken(user.user_id);
    const message = getPasswordResetEmail(email, token, siteOrigin);
    await transporter.sendMail(message);
}

async function resetPassword(passwordResetToken: string, newPassword: string): Promise<void> {
    validatePassword(newPassword);
    const userId = await verifyPasswordResetToken(passwordResetToken);
    if (userId != undefined) {
        await updatePasswordForUser(userId, newPassword);
        //TODO: expire other tokens of the user?
    } else {
        throw new TokenVerificationError('Password reset token could not be verified');
    }
}

class TokenVerificationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TokenVerificationError";
    }
}

function getPasswordResetEmail(email: string, token: string, siteOrigin: string): nodemailer.SendMailOptions {
    const linkUrl = new URL(siteOrigin);
    linkUrl.pathname = '/password-reset.html';
    linkUrl.search = `?token=${token}`;

    const linkString = url.format(linkUrl);

    const messageBody = `Hi there,

    Someone has requested a password reset for the Colouring London account associated with this email address.
    Click on the following link within the next 24 hours to reset your password:

    ${linkString}
    `;

    return {
        text: messageBody,
        subject: 'Reset your Colouring London password',
        to: email,
        from: 'no-reply@colouring.london'
    };
}

async function createPasswordResetToken(userId: string) {
    const { token } = await db.one(
        `INSERT INTO
            user_password_reset_tokens (user_id, expires_on)
        VALUES
            ($1::uuid, now() at time zone 'utc' + INTERVAL '$2 day')
        RETURNING
            token
        `, [userId, 1]
    );

    return token;
}

/**
 * Verify that the password reset token is valid and expire the token
 * @param token password reset token to verify and use
 * @returns the UUID of the user whose token was used
 */
async function verifyPasswordResetToken(token: string): Promise<string> {
    try {
        // verify and deactivate the token in one operation
        const usedToken = await db.one(
            `UPDATE
                user_password_reset_tokens
            SET used = true
            WHERE
            token = $1::uuid
            AND NOT used
            AND now() at time zone 'utc' < expires_on
            RETURNING *`, [token]
            );
        console.log('verified');

        return usedToken.user_id;
    } catch (err) {
        if (err instanceof errors.QueryResultError)  {
            console.log(err.code);
            if (err.code === errors.queryResultErrorCode.noData) return undefined;
        }

        throw err;
    }
}

async function updatePasswordForUser(userId: string, newPassword: string): Promise<null> {
    return db.none(
        `UPDATE
            users
        SET
            pass = crypt($1, gen_salt('bf'))
        WHERE
            user_id = $2::uuid
        `, [newPassword, userId]);
}

export {
    sendPasswordResetToken,
    resetPassword,
    TokenVerificationError
};
