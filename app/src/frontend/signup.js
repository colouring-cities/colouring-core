import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            confirm_email: '',
            password: '',
            show_password: '',
            confirm_conditions: false
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
        fetch('/users', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(
            res => res.json()
        ).then(function(res){
            if (res.error) {
                console.error(res.error);  // tell user
            } else {
                console.log(res);  // redirect back
                fetch('/users/me').then(function(user){
                    this.props.login(user);
                }).catch(function(err){
                    console.error(err);
                })
            }
        }).catch(
            err => console.error(err)
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
                    <p>
                        Create an account to start colouring in.
                    </p>
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

                        <label htmlFor="password">Password</label>
                        <input name="password" id="password"
                               className="form-control"
                               type={(this.state.show_password)? 'text': 'password'}
                               value={this.state.password} onChange={this.handleChange}
                               required
                               />

                        <div className="form-check">
                            <input id="show_password" name="show_password"
                                   className="position-static" type="checkbox"
                                   checked={this.state.show_password}
                                   onChange={this.handleChange}
                                   />
                            <label htmlFor="show_password">Show password?</label>
                        </div>

                        <div className="form-check">
                            <input id="confirm_conditions" name="confirm_conditions"
                                   className="position-static" type="checkbox"
                                   checked={this.state.confirm_conditions}
                                   onChange={this.handleChange}
                                   required />
                            <label htmlFor="confirm_conditions">
                                I confirm that I have read and agree to the <a
                                href="/privacy-policy">privacy policy</a> and <a
                                href="/user-agreement">contributor agreement</a>.
                            </label>
                        </div>

                        <input type="submit" value="Sign Up" className="btn btn-primary" />
                        <Link to="login.html">Log in</Link>
                    </form>
                </section>
            </article>
        )
    }
}

export default SignUp;
