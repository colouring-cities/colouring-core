import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import ErrorBox from './error-box';

class MyAccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.handleGenerateKey = this.handleGenerateKey.bind(this);
    }

    handleLogout(event) {
        event.preventDefault();
        this.setState({error: undefined});

        fetch('/logout', {
            method: 'POST',
            credentials: 'same-origin'
        }).then(
            res => res.json()
        ).then(function(res){
            if (res.error) {
                this.setState({error: res.error})
            } else {
                this.props.logout();
            }
        }.bind(this)).catch(
            (err) => this.setState({error: err})
        );
    }

    handleGenerateKey(event) {
        event.preventDefault();
        this.setState({error: undefined});

        fetch('/api/key', {
            method: 'POST',
            credentials: 'same-origin'
        }).then(
            res => res.json()
        ).then(function(res){
            if (res.error) {
                this.setState({error: res.error})
            } else {
                this.props.updateUser(res);
            }
        }.bind(this)).catch(
            (err) => this.setState({error: err})
        );
    }

    render() {
        if (this.props.user && !this.props.user.error) {
            return (
                <article>
                    <section className="main-col">
                        <h1 className="h1">Welcome, {this.props.user.username}!</h1>
                        <p>

                        Colouring London is under active development, Please <a href="https://discuss.colouring.london/">discuss
                        suggestions for improvements</a> and <a
                        href="https://github.com/tomalrussell/colouring-london/issues">
                        report issues or problems</a>.

                        </p>
                        <ErrorBox msg={this.state.error} />
                        <form method="POST" action="/logout" onSubmit={this.handleLogout}>
                            <div className="buttons-container">
                                <Link to="/edit/age.html" className="btn btn-primary">Start colouring</Link>
                                <input className="btn btn-secondary" type="submit" value="Log out"/>
                            </div>
                        </form>

                        <hr/>

                        <h2 className="h2">My Details</h2>
                        <h3 className="h3">Username</h3>
                        <p>{this.props.user.username}</p>
                        <h3 className="h3">Email Address</h3>
                        <p>{this.props.user.email? this.props.user.email : '-'}</p>
                        <h3 className="h3">Registered</h3>
                        <p>{this.props.user.registered.toString()}</p>

                        <hr/>

                        <h2 className="h2">Experimental features</h2>
                        <h3 className="h3">API key</h3>
                        <p>{this.props.user.api_key? this.props.user.api_key : '-'}</p>
                        <form method="POST" action="/api/key" onSubmit={this.handleGenerateKey}>
                            <input className="btn btn-primary" type="submit" value="Generate API key"/>
                        </form>

                    </section>
                </article>
            );
        } else {
            return (
                <Redirect to="/login.html" />
            )
        }
    }
}

export default MyAccountPage;
