import React, { Component } from 'react';
import { Redirect } from 'react-router';

class MyAccountPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const logout = this.props.logout;
        event.preventDefault();
        fetch('/logout', {
            method: 'POST'
        }).then(
            res => res.json()
        ).then(function(res){
            if (res.error) {
                console.error(res.error);  // tell user
            } else {
                logout();
                console.log(res);  // redirect back
            }
        }).catch(
            err => console.error(err)
        );
    }

    render() {
        if (this.props && this.props.user) {
            return (
                <article>
                    <section className="main-col">
                        <h1 className="h3">Welcome, {this.props.user.username}</h1>
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
