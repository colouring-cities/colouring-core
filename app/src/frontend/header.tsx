import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';

import { Logo } from './components/logo';
import { User } from './models/user';


interface HeaderProps {
    user: User;
    animateLogo: boolean;
}

interface HeaderState {
    collapseMenu: boolean;
}

/**
 * Render the main header using a responsive design
 */
class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props) {
        super(props);
        this.state = {collapseMenu: true};
        this.handleClick = this.handleClick.bind(this);
        this.handleNavigate = this.handleNavigate.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            collapseMenu: !state.collapseMenu
        }));
    }

    handleNavigate() {
        this.setState({
            collapseMenu: true
        });
    }

    render() {
        return (
            <header className="main-header">
                <nav className="navbar navbar-light">
                    <span className="navbar-brand">
                        <NavLink to="/">
                            <Logo variant={this.props.animateLogo ? 'animated' : 'default'}/>
                        </NavLink>
                    </span>
                    <button className="navbar-toggler navbar-toggler-right" type="button"
                        onClick={this.handleClick} aria-expanded={!this.state.collapseMenu} aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={this.state.collapseMenu ? 'collapse navbar-collapse' : 'navbar-collapse'}>
                        <ul className="navbar-nav flex-column">
                            <li className="nav-item">
                                <NavLink to="/view/categories" className="nav-link" onClick={this.handleNavigate}>
                                    View/Edit Maps
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://pages.colouring.london">
                                    About
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://pages.colouring.london/buildingcategories">
                                    Data Categories
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://pages.colouring.london/whoisinvolved">
                                    Who&rsquo;s Involved?
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://pages.colouring.london/data-ethics">
                                    Data Ethics
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://discuss.colouring.london">
                                    Discuss
                                </a>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/data-extracts.html" className="nav-link" onClick={this.handleNavigate}>
                                    Downloads
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact.html" className="nav-link" onClick={this.handleNavigate}>
                                    Contact
                                </NavLink>
                            </li>
                            {
                                this.props.user?
                                    (
                                        <li className="nav-item">
                                            <NavLink to="/my-account.html" className="nav-link" onClick={this.handleNavigate}>
                                                Account <span className="shorten-username">({this.props.user.username})</span>
                                            </NavLink>
                                        </li>
                                    ):
                                    (
                                        <Fragment>
                                            <li className="nav-item">
                                                <NavLink to="/login.html" className="nav-link" onClick={this.handleNavigate}>
                                                    Log in
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/sign-up.html" className="nav-link" onClick={this.handleNavigate}>
                                                    Sign up
                                                </NavLink>
                                            </li>
                                        </Fragment>
                                    )
                            }
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
