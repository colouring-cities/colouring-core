import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { apiGet, apiPost } from '../apiHelpers';
import ErrorBox from '../components/error-box';
import InfoBox from '../components/info-box';
import SupporterLogos from '../components/supporter-logos';
import { User } from '../models/user';

interface SignUpProps {
    login: (user: User) => void;
    user: User;
}

interface SignUpState {
    username: string;
    email: string;
    confirm_email: string;
    show_password: boolean;
    password: string;
    confirm_conditions: boolean;
    error: string;
}

class SignUp extends Component<SignUpProps, SignUpState> {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            confirm_email: '',
            password: '',
            show_password: false,
            confirm_conditions: false,
            error: undefined
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name: keyof SignUpState = target.name;

        this.setState({
            [name]: value
        } as Pick<SignUpState, keyof SignUpState>);
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({error: undefined});

        try {
            const res = await apiPost('/api/users', this.state);
            if(res.error) {
                this.setState({ error: res.error });
            } else {
                const user = await apiGet('/api/users/me');
                this.props.login(user);
            }
        } catch(err) {
            this.setState({error: err});
        }
    }

    render() {
        if (this.props.user) {
            return <Redirect to="/my-account.html" />;
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
                    <ErrorBox msg={this.state.error} />
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="username">Username*</label>
                        <input name="username" id="username"
                            className="form-control" type="text"
                            value={this.state.username} onChange={this.handleChange}
                            placeholder="not-your-real-name" required
                            minLength={4}
                            maxLength={30}
                            pattern="\w+"
                            title="Usernames can contain only letters, numbers and the underscore"
                        />

                        <label htmlFor="email">Email (optional)</label>
                        <input name="email" id="email"
                            className="form-control" type="email"
                            value={this.state.email} onChange={this.handleChange}
                            placeholder="someone@example.com"
                        />
                        <InfoBox msg="Please note that if you forget your password, you will only be able to recover your account if you provide an email address." />
                        <label htmlFor="confirm_email">Confirm email (optional)</label>
                        <input name="confirm_email" id="confirm_email"
                            className="form-control" type="email"
                            value={this.state.confirm_email} onChange={this.handleChange}
                        />

                        <label htmlFor="password">Password (at least 8 characters)</label>
                        <input name="password" id="password"
                            className="form-control"
                            type={(this.state.show_password)? 'text': 'password'}
                            value={this.state.password} onChange={this.handleChange}
                            required
                            minLength={8}
                            maxLength={128}
                        />

                        <div className="form-check">
                            <input id="show_password" name="show_password"
                                className="form-check-input" type="checkbox"
                                checked={this.state.show_password}
                                onChange={this.handleChange}
                            />
                            <label className="form-check-label" htmlFor="show_password">
                                Show password?
                            </label>
                        </div>

                        <div className="form-check">
                            <input id="confirm_conditions" name="confirm_conditions"
                                className="form-check-input" type="checkbox"
                                checked={this.state.confirm_conditions}
                                onChange={this.handleChange}
                                required />
                            <label className="form-check-label" htmlFor="confirm_conditions">
                                I confirm that I have read and agree to the <Link
                                    to="/privacy-policy.html">privacy policy</Link>, <Link
                                    to="/contributor-agreement.html">contributor agreement</Link> and <Link
                                    to="/data-accuracy.html">data accuracy agreement</Link>.
                            </label>
                        </div>

                        <div className="buttons-container with-space">
                            <input type="submit" value="Sign Up" className="btn btn-primary" />
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
    }
}

export default SignUp;
