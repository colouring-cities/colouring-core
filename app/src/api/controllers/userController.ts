import * as userService from '../services/user';

function createUser(req, res) {
    const user = req.body;
    if (req.session.user_id) {
        res.send({ error: 'Already signed in' });
        return;
    }

    if (user.email) {
        if (user.email != user.confirm_email) {
            res.send({ error: 'Email did not match confirmation.' });
            return;
        }
    } else {
        user.email = null;
    }

    userService.createUser(user).then(function (result) {
        if (result.user_id) {
            req.session.user_id = result.user_id;
            res.send({ user_id: result.user_id });
        } else {
            req.session.user_id = undefined;
            res.send({ error: result.error });
        }
    }).catch(function (err) {
        console.error(err);
        res.send(err);
    });
}

function getCurrentUser(req, res) {
    if (!req.session.user_id) {
        res.send({ error: 'Must be logged in' });
        return;
    }

    userService.getUserById(req.session.user_id).then(function (user) {
        res.send(user);
    }).catch(function (error) {
        res.send(error);
    });
}

function deleteCurrentUser(req, res) {
    if (!req.session.user_id) {
        return res.send({ error: 'Must be logged in' });
    }
    console.log(`Deleting user ${req.session.user_id}`);

    userService.deleteUser(req.session.user_id).then(
        () => userService.logout(req.session)
    ).then(() => {
        res.send({ success: true });
    }).catch(err => {
        res.send({ error: err });
    });
}

export default {
    createUser,
    getCurrentUser,
    deleteCurrentUser,
};