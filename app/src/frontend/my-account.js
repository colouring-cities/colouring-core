import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import ErrorBox from './error-box';

class MyAccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({error: undefined});

        fetch('/logout', {
            method: 'POST'
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

    render() {
        if (this.props && this.props.user) {
            return (
                <article>
                    <section className="main-col">
                        <h1 className="h1">Welcome, {this.props.user.username}!</h1>
                        <p className="lead">

                        Colouring London is under active development, please report any
                        bugs on <a href="http://github.com/tomalrussell/colouring-london/issues">
                        GitHub</a>.

                        </p>
                        <Link to="/map/date_year.html" className="btn btn-primary">Start colouring</Link>
                        <ErrorBox msg={this.state.error} />
                        <form method="POST" action="/logout" onSubmit={this.handleSubmit}>
                            <input className="btn btn-secondary" type="submit" value="Log out"/>
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
