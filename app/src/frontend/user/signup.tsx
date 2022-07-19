import React, { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useAuth } from '../auth-context';
import ErrorBox from '../components/error-box';
import { SpinnerIcon } from '../components/icons';
import InfoBox from '../components/info-box';
import SupporterLogos from '../components/supporter-logos';

export const SignUp: React.FC = () => {
    const { isLoading, signup } = useAuth();
    const [error, setError] = useState(undefined);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('')
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmConditions, setConfirmConditions] = useState(false);

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            signup({ username, email, confirmEmail, password }, setError);
        },
        [username, email, confirmEmail, password, confirmConditions, signup]
    );
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer) {
        return <Redirect to="/my-account.html" />
    }
    return (
        <article>
            <section className="main-col">
                <h1 className="h2">Sign up</h1>
                <InfoBox msg="Welcome to Colouring London. You're one of the first people to sign up!  ">
                    <br/>Please <a href="https://discuss.colouring.london/">discuss
                    suggestions for improvements</a> and <a
                        href="https://github.com/colouring-london/colouring-london/issues">
                    report issues or problems</a>.
                </InfoBox>
                <p>
                    Create an account to start colouring in.
                </p>
                <ErrorBox msg={error} />
                <form onSubmit={onSubmit}>
                    <label htmlFor="username">Username*</label>
                    <input name="username" id="username"
                        className="form-control" type="text"
                        value={username} onChange={e => setUsername(e.target.value)}
                        placeholder="not-your-real-name" required
                        minLength={4}
                        maxLength={30}
                        pattern="\w+"
                        title="Usernames can contain only letters, numbers and the underscore"
                    />

                    <label htmlFor="email">Email (optional)</label>
                    <input name="email" id="email"
                        className="form-control" type="email"
                        value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="someone@example.com"
                    />
                    <InfoBox msg="Please note that if you forget your password, you will only be able to recover your account if you provide an email address." />
                    
                    <label htmlFor="confirm_email">Confirm email (optional)</label>
                    <input name="confirm_email" id="confirm_email"
                        className="form-control" type="email"
                        value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password (at least 8 characters)</label>
                    <input name="password" id="password"
                        className="form-control"
                        type={(showPassword)? 'text': 'password'}
                        value={password} onChange={e => setPassword(e.target.value)}
                        required
                        minLength={8}
                        maxLength={128}
                    />

                    <div className="form-check">
                        <input id="show_password" name="show_password"
                            className="form-check-input" type="checkbox"
                            checked={showPassword}
                            onChange={e => setShowPassword(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="show_password">
                            Show password?
                        </label>
                    </div>

                    <div className="form-check">
                        <input id="confirm_conditions" name="confirm_conditions"
                            className="form-check-input" type="checkbox"
                            checked={confirmConditions}
                            onChange={e => setConfirmConditions(e.target.checked)}
                            required />
                        <label className="form-check-label" htmlFor="confirm_conditions">
                            I confirm that I have read and agree to the <Link
                                to="/privacy-policy.html">privacy policy</Link>, <Link
                                to="/contributor-agreement.html">contributor agreement</Link> and <Link
                                to="/data-accuracy.html">data accuracy agreement</Link>.
                        </label>
                    </div>

                    <div className="buttons-container with-space">
                        <input type="submit" disabled={isLoading} value="Sign Up" className="btn btn-primary" />
                        {isLoading && <span><SpinnerIcon/>Sending sign up data...</span>}
                    </div>
                    <InfoBox msg="">
                        Please also read our <a href="https://www.pages.colouring.london/data-ethics">data ethics policy</a> before using or sharing our data
                    </InfoBox>

                    Do you already have an account?

                    <div className="buttons-container with-space">
                        <Link to="login.html" className="btn btn-outline-dark">Log in</Link>
                    </div>

                </form>
            </section>
            <hr />
            <section className="main-col">
                <SupporterLogos />
            </section>
        </article>
    );
};
