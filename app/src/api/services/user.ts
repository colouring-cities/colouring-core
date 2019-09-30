/**
 * User data access
 *
 */
import { errors } from 'pg-promise';

import db from '../../db';
import { validateUsername, ValidationError, validatePassword } from '../validation';

function createUser(user) {
    try {
        validateUsername(user.username);
        validatePassword(user.password);
    } catch(err) {
        if (err instanceof ValidationError) {
            return Promise.reject({ error: err.message });
        } else throw err;
    }
    
    return db.one(
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
    ).catch(function (error) {
        console.error('Error:', error)

        if (error.detail.indexOf('already exists') !== -1) {
            if (error.detail.indexOf('username') !== -1) {
                return { error: 'Username already registered' };
            } else if (error.detail.indexOf('email') !== -1) {
                return { error: 'Email already registered' };
            }
        }
        return { error: 'Database error' }
    });
}

function authUser(username, password) {
    return db.one(
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
    ).then(function (user) {
        if (user && user.auth_ok) {
            return { user_id: user.user_id }
        } else {
            return { error: 'Username or password not recognised' }
        }
    }).catch(function (err) {
        if (err instanceof errors.QueryResultError) {
            console.error(`Authentication failed for user ${username}`);
            return { error: 'Username or password not recognised' };
        }
        console.error('Error:', err);
        return { error: 'Database error' }; 
    })
}

function getUserById(id) {
    return db.one(
        `SELECT
            username, email, registered, api_key
        FROM
            users
        WHERE
            user_id = $1
        `, [
            id
        ]
    ).catch(function (error) {
        console.error('Error:', error)
        return undefined;
    });
}

function getUserByEmail(email: string) {
    return db.one(
        `SELECT
            user_id, username, email
        FROM
            users
        WHERE
            email = $1
        `, [email]
    ).catch(function(error) {
        console.error('Error:', error);
        return undefined;
    });
}

function getNewUserAPIKey(id) {
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
    ).catch(function (error) {
        console.error('Error:', error)
        return { error: 'Failed to generate new API key.' };
    });
}

function authAPIUser(key) {
    return db.one(
        `SELECT
            user_id
        FROM
            users
        WHERE
            api_key = $1
        `, [
            key
        ]
    ).catch(function (error) {
        console.error('Error:', error)
        return undefined;
    });
}

function deleteUser(id) {
    return db.none(
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
    ).catch((error) => {
        console.error('Error:', error);
        return {error: 'Database error'};
    });
}

function logout(session: Express.Session) {
    return new Promise((resolve, reject) => {
        session.user_id = undefined;
        session.destroy(err => {
            if (err) return reject(err);
            return resolve();
        });
    });
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
