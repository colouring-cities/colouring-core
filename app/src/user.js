import { query } from './db';


function createUser(user) {
    return query(
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
    ).then(function(data){
        return data.rows[0];
    }).catch(function(error){
        console.error('Error:', error)

        if (error.detail.indexOf('already exists') !== -1){
            if (error.detail.indexOf('username') !== -1){
                return {error:'Username already registered'};
            } else if (error.detail.indexOf('email') !== -1) {
                return {error: 'Email already registered'};
            }
        }
        return {error: 'Database error'}
    });
}

function authUser(username, password) {
    return query(
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
    ).then(function(data){
        const user = data.rows[0];
        if (user.auth_ok) {
            return {user_id: user.user_id}
        } else {
            return {error: 'Authentication failed'}
        }
    }).catch(function(err){
        console.error(err);
        return {error: 'Database error'};
    })
}

function getUserById(user_id) {
    return query(
        `SELECT
            username, email, registered
        FROM users
        WHERE
        user_id = $1
        `, [
            user_id
        ]
    ).then(function(data){
        return data.rows[0];
    }).catch(function(error){
        console.error('Error:', error)
        return undefined;
    });
}

export { getUserById, createUser, authUser }
