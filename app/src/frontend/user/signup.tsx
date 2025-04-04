import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../auth-context';
import ErrorBox from '../components/error-box';
import { SpinnerIcon } from '../components/icons';
import InfoBox from '../components/info-box';
import SupporterLogos from '../components/supporter-logos';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

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

    const msgName = `Welcome to Colouring ${config.cityName}. You're one of the first people to sign up!`;
    const issuesURL = config.githubURL + "/issues";
    const discussURL = config.githubURL + "/discussions";

    return (
        <article>
            <section className="main-col">
                <h1 className="h2">Sign up</h1>
                <InfoBox msg={msgName}>
                    <br/>Please <a href={discussURL}>discuss suggestions for improvements</a> and {' '}
                    <a href={issuesURL}>report issues or problems</a>.
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
                        placeholder="name-you-would-like-shown-on-the-edit-history-and-active-contributors-list" required
                        minLength={4}
                        maxLength={29}
                        pattern="\w+"
                        title="Usernames can contain only letters, numbers and the underscore"
                    />

                    <label htmlFor="email">Email (optional)</label>
                    <input name="email" id="email"
                        className="form-control" type="email"
                        value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="someone@example.com"
                    />
                    <InfoBox msg="Our policy is to avoid collecting personal data wherever possible. An email address is only necessary if you wish to be able to recover your account should you forget your password." />
                    
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
                            I confirm that I have read and agree to the {' '}  
                                <a href="https://github.com/colouring-cities/manual/wiki/F2.-PROTOCOLS-&-CODES-OF-CONDUCT#ccrp-contributor-privacy-policy">privacy policy</a>,{' and the '}  
                                <a href="https://github.com/colouring-cities/manual/wiki/F2.-PROTOCOLS-&-CODES-OF-CONDUCT#ccrp-contributor--data-user-data-accuracy--ethical-use-agreement">contributor & data user data accuracy & ethical use agreement</a>.
                        </label>
                    </div>

                    <div className="buttons-container with-space">
                        <input type="submit" disabled={isLoading} value="Sign Up" className="btn btn-primary" />
                        {isLoading && <span><SpinnerIcon/>Sending sign up data...</span>}
                    </div>
                    <InfoBox msg="">
                        Please also read our <a href="https://github.com/colouring-cities/manual/wiki/ETHICAL-FRAMEWORK#ccrp-data-ethics-policies">data ethics policy</a> before using or sharing our data
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
