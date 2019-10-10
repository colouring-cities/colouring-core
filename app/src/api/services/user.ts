/**
 * User data access
 *
 */
import { errors } from 'pg-promise';

import db from '../../db';
import { validateUsername, ValidationError, validatePassword } from '../validation';
import { promisify } from 'util';


async function createUser(user) {
    try {
        validateUsername(user.username);
        validatePassword(user.password);
    } catch(err) {
        if (err instanceof ValidationError) {
            throw { error: err.message };
        } else throw err;
    }
    
    try {
        return await db.one(
            `INSERT
            INTO users (
                user_id,
                username,
                email,
                pass
            ) VALUES (
                gen_random_uuid(),
                $1,
                $2,
                crypt($3, gen_salt('bf'))
            ) RETURNING user_id
            `, [
                user.username,
                user.email,
                user.password
            ]
        );
    } catch(error) {
        console.error('Error:', error);

        if (error.detail.includes('already exists')) {
            if (error.detail.includes('username')) {
                return { error: 'Username already registered' };
            } else if (error.detail.includes('email')) {
                return { error: 'Email already registered' };
            }
        }
        return { error: 'Database error' };
    }
}

async function authUser(username: string, password: string) {
    try {
        const user = await db.one(
            `SELECT
                user_id,
                (
                    pass = crypt($2, pass)
                ) AS auth_ok
            FROM users
            WHERE
            username = $1
            `, [
                username,
                password
            ]
        );

        if (user && user.auth_ok) {
            return { user_id: user.user_id }
        } else {
            return { error: 'Username or password not recognised' }
        }
    } catch(err) {
        if (err instanceof errors.QueryResultError) {
            console.error(`Authentication failed for user ${username}`);
            return { error: 'Username or password not recognised' };
        }
        console.error('Error:', err);
        return { error: 'Database error' }; 
    }
}

async function getUserById(id: string) {
    try {
        return await db.one(
            `SELECT
                username, email, registered, api_key
            FROM
                users
            WHERE
                user_id = $1
            `, [
                id
            ]
        );
    } catch(error) {
        console.error('Error:', error)
        return undefined;
    }
}

async function getUserByEmail(email: string) {
    try {
        return db.one(
            `SELECT
                user_id, username, email
            FROM
                users
            WHERE
                email = $1
            `, [email]
        );
    } catch(error) {
        console.error('Error:', error);
        return undefined;
    }
}

async function getNewUserAPIKey(id: string) {
    try{
        return db.one(
            `UPDATE
                users
            SET
                api_key = gen_random_uuid()
            WHERE
                user_id = $1
            RETURNING
                api_key
            `, [
                id
            ]
        );
    } catch(error) {
        console.error('Error:', error)
        return { error: 'Failed to generate new API key.' };
    }
}

async function authAPIUser(key: string) {
    try {
        return await db.one(
            `SELECT
                user_id
            FROM
                users
            WHERE
                api_key = $1
            `, [
                key
            ]
        );
    } catch(error) {
        console.error('Error:', error)
        return undefined;
    }
}

async function deleteUser(id: string) {
    try {
        return await db.none(
            `UPDATE users
            SET
                email = null,
                pass = null,
                api_key = null,
                username = concat('deleted_', cast(user_id as char(13))),
                is_deleted = true,
                deleted_on = now() at time zone 'utc'
            WHERE user_id = $1
            `, [id]
        );
    } catch(error) {
        console.error('Error:', error);
        return {error: 'Database error'};
    }
}

function logout(session: Express.Session): Promise<void> {
    session.user_id = undefined;

    return promisify(session.destroy.bind(session))();
}

export {
    getUserById,
    getUserByEmail,
    createUser,
    authUser,
    getNewUserAPIKey,
    authAPIUser,
    deleteUser,
    logout
};
