/**
 * User data access
 *
 */
import db from '../db';

function createUser(user) {
    if (!user.password || user.password.length < 8) {
        return Promise.reject({ error: 'Password must be at least 8 characters' })
    }
    if (user.password.length > 70) {
        return Promise.reject({ error: 'Password must be at most 70 characters' })
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
        console.error(err);
        return { error: 'Username or password not recognised' };
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

export { getUserById, createUser, authUser, getNewUserAPIKey, authAPIUser }
