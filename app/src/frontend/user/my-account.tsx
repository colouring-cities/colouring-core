import React, { Component, FormEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';

import ConfirmationModal from '../components/confirmation-modal';
import ErrorBox from '../components/error-box';
import { User } from '../models/user';

interface MyAccountPageProps {
    user: User;
    updateUser: (user: User) => void;
    logout: () => void;
}

interface MyAccountPageState {
    showDeleteConfirm: boolean;
    error: string;
}


class MyAccountPage extends Component<MyAccountPageProps, MyAccountPageState> {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            showDeleteConfirm: false
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.handleGenerateKey = this.handleGenerateKey.bind(this);
    }

    handleLogout(event) {
        event.preventDefault();
        this.setState({error: undefined});

        fetch('/api/logout', {
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

        fetch('/api/api/key', {
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

    confirmDelete(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({ showDeleteConfirm: true });
    }

    hideConfirmDelete() {
        this.setState({ showDeleteConfirm: false });
    }

    async handleDelete() {
        this.setState({ error: undefined });

        try {
            const res = await fetch('/api/users/me', {
                method: 'DELETE',
                credentials: 'same-origin'
            });
            const data = await res.json();

            if(data.error) {
                this.setState({ error: data.error });
            } else {
                this.props.logout();
            }
        } catch (err) {
            this.setState({ error: err });
        } finally {
            this.hideConfirmDelete();
        }
    }

    render() {
        if (this.props.user && !this.props.user.error) {
            return (
                <article>
                    <section className="main-col">
                        <h1 className="h1">Welcome, {this.props.user.username}!</h1>
                        <p>

                        Colouring London is under active development. Please <a href="https://discuss.colouring.london/">discuss
                        suggestions for improvements</a> and <a
                                href="https://github.com/tomalrussell/colouring-london/issues">
                        report issues or problems</a>.

                        </p>
                        <p>
                        For reference, here are the <Link
                        to="/privacy-policy.html">privacy policy</Link>, <Link
                        to="/contributor-agreement.html">contributor agreement</Link> and <Link
                        to="/data-accuracy.html">data accuracy agreement</Link>.
                        </p>
                        <ErrorBox msg={this.state.error} />
                        <form onSubmit={this.handleLogout}>
                            <div className="buttons-container">
                                <Link to="/edit/age" className="btn btn-warning">Start colouring</Link>
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

                        <h2 className="h2">Technical details</h2>
                        <p>Are you a software developer? If so, you might be interested in these.</p>
                        <h3 className="h3">API key</h3>
                        <p>{this.props.user.api_key? this.props.user.api_key : '-'}</p>
                        <form onSubmit={this.handleGenerateKey} className="form-group mb-3">
                            <input className="btn btn-warning" type="submit" value="Generate API key"/>
                        </form>

                        <h3 className="h3">Open Source Code</h3>
                        Colouring London site code is developed at <a href="http://github.com/tomalrussell/colouring-london/">colouring-london</a> on Github

                        <hr />

                        <h2 className="h2">Account actions</h2>
                        <form
                            onSubmit={e => this.confirmDelete(e)}
                            className="form-group mb-3"
                        >
                            <input className="btn btn-danger" type="submit" value="Delete account" />
                        </form>

                        <ConfirmationModal
                            show={this.state.showDeleteConfirm}
                            title="Confirm account deletion"
                            description="Are you sure you want to delete your account? This cannot be undone."
                            confirmButtonText="Delete account"
                            confirmButtonClass="btn-danger"
                            onConfirm={() => this.handleDelete()}
                            onCancel={() => this.hideConfirmDelete()}
                        />

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
