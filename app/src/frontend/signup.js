import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import ErrorBox from './error-box';
import InfoBox from './info-box';
import SupporterLogos from './supporter-logos';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            confirm_email: '',
            password: '',
            show_password: '',
            confirm_conditions: false,
            error: undefined
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({error: undefined})

        fetch('/users', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(
            res => res.json()
        ).then(function(res){
            if (res.error) {
                this.setState({error: res.error})
            } else {
                fetch('/users/me', {
                    credentials: 'same-origin'
                }).then(
                    (res) => res.json()
                ).then(
                    (user) => this.props.login(user)
                ).catch(
                    (err) => this.setState({error: err})
                )
            }
        }.bind(this)).catch(
            (err) => this.setState({error: err})
        );
    }

    render() {
        if (this.props.user) {
            return <Redirect to="/my-account.html" />
        }
        return (
            <article>
                <section className="main-col">
                    <h1 className="h2">Sign up</h1>
                    <InfoBox msg="Welcome to Colouring London. You're one of the first people to sign up!  ">
                        <br/>Please <a href="https://discuss.colouring.london/">discuss
                        suggestions for improvements</a> and <a
                        href="https://github.com/tomalrussell/colouring-london/issues">
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
                               />

                        <label htmlFor="email">Email (optional)</label>
                        <input name="email" id="email"
                               className="form-control" type="email"
                               value={this.state.email} onChange={this.handleChange}
                               placeholder="someone@example.com"
                               />

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
                                I confirm that I have read and agree to the <a
                                href="/privacy-policy">privacy policy</a> and <a
                                href="/user-agreement">contributor agreement</a>.
                            </label>
                        </div>

                        <div className="buttons-container">
                            <input type="submit" value="Sign Up" className="btn btn-primary" />
                        </div>

                        Do you already have an account?

                        <div className="buttons-container">
                            <Link to="login.html" className="btn btn-outline-dark">Log in</Link>
                        </div>

                    </form>
                </section>
                <hr />
                <section className="main-col">
                    <SupporterLogos />
                </section>
            </article>
        )
    }
}

export default SignUp;
