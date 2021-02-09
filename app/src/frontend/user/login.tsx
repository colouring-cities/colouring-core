import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../auth-context';
import ErrorBox from '../components/error-box';
import { SpinnerIcon } from '../components/icons';
import InfoBox from '../components/info-box';
import SupporterLogos from '../components/supporter-logos';

export const Login: React.FC = () => {
    const {isLoading, login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState(undefined);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setError(undefined);

        login({ username, password });
    }, [username, password]);

    return (
        <article>
            <section className="main-col">
                <h1 className="h2">Log in</h1>
                <InfoBox msg="Welcome to Colouring London. You're one of the first people to use the site!  ">
                    <br/>Please <a href="https://discuss.colouring.london/">discuss
                    suggestions for improvements</a> and <a
                        href="https://github.com/colouring-london/colouring-london/issues">
                    report issues or problems</a>.
                </InfoBox>
                <ErrorBox msg={error} />
                <form onSubmit={onSubmit}>
                    <label htmlFor="username">Username*</label>
                    <input name="username" id="username"
                        className="form-control" type="text"
                        value={username} onChange={e => setUsername(e.target.value)}
                        placeholder="not-your-real-name" required
                    />

                    <label htmlFor="password">Password</label>
                    <input name="password" id="password"
                        className="form-control"
                        type={showPassword ? 'text' : 'password'}
                        value={password} onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <div className="form-check">
                        <input id="show_password" name="show_password"
                            className="form-check-input" type="checkbox"
                            checked={showPassword}
                            onChange={e => setShowPassword(e.target.checked)}
                        />
                        <label htmlFor="show_password" className="form-check-label">Show password?</label>
                    </div>

                    <Link to="/forgotten-password.html">Forgotten password?</Link>

                    <div className="buttons-container with-space">
                        <input type="submit" disabled={isLoading} value="Log In" className="btn btn-primary" />
                        {isLoading && <span><SpinnerIcon />Logging in...</span>}
                    </div>

                    Would you like to create an account instead?

                    <div className="buttons-container with-space">
                        <Link to="sign-up.html" className="btn btn-outline-dark">Sign Up</Link>
                    </div>
                </form>
            </section>
            <hr />
            <section className="main-col">
                <SupporterLogos />
            </section>
        </article>
    )

};
