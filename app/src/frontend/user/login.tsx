import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import ErrorBox from '../components/error-box';
import InfoBox from '../components/info-box';
import SupporterLogos from '../components/supporter-logos';
import { User } from '../models/user';

interface LoginProps {
    user: User,
    login: (user: User) => void;
}

class Login extends Component<LoginProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            show_password: '',
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

        fetch('/api/login', {
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
                fetch('/api/users/me', {
                    credentials: 'same-origin'
                }).then(
                    (res) => res.json()
                ).then(user => {
                    if (user.error) {
                        this.setState({error: user.error})
                    } else {
                        this.props.login(user)
                    }
                }).catch(
                    (err) => this.setState({error: err})
                )
            }
        }.bind(this)).catch(
            (err) => this.setState({error: err})
        );
    }

    render() {
        if (this.props.user && !this.props.user.error) {
            return <Redirect to="/my-account.html" />
        }
        return (
            <article>
                <section className="main-col">
                    <h1 className="h2">Log in</h1>
                    <InfoBox msg="Welcome to Colouring London. You're one of the first people to use the site!  ">
                        <br/>Please <a href="https://discuss.colouring.london/">discuss
                        suggestions for improvements</a> and <a
                            href="https://github.com/tomalrussell/colouring-london/issues">
                        report issues or problems</a>.
                    </InfoBox>
                    <ErrorBox msg={this.state.error} />
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="username">Username*</label>
                        <input name="username" id="username"
                            className="form-control" type="text"
                            value={this.state.username} onChange={this.handleChange}
                            placeholder="not-your-real-name" required
                        />

                        <label htmlFor="password">Password</label>
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
                            <label htmlFor="show_password" className="form-check-label">Show password?</label>
                        </div>

                        <Link to="/forgotten-password.html">Forgotten password?</Link>

                        <div className="buttons-container with-space">
                            <input type="submit" value="Log In" className="btn btn-primary" />
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
    }
}

export default Login;
