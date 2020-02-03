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
            <header className="main-header navbar navbar-light">
                <div className="nav-header">
                    <NavLink to="/">
                        <Logo variant={this.props.animateLogo ? 'animated' : 'default'}/>
                    </NavLink>
                    <button className="navbar-toggler" type="button"
                        onClick={this.handleClick} aria-expanded={!this.state.collapseMenu} aria-label="Toggle navigation">
                        Menu&nbsp;
                        {
                            this.state.collapseMenu ?
                                <span className="navbar-toggler-icon"></span>
                                : <span className="close">&times;</span>
                        }
                    </button>
                </div>
                <nav className={this.state.collapseMenu ? 'collapse navbar-collapse' : 'navbar-collapse'}>
                    <ul className="navbar-nav flex-column">
                        <li className="nav-item">
                            <NavLink to="/view/categories" className="nav-link" onClick={this.handleNavigate}>
                                View/Edit Maps
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/data-extracts.html" className="nav-link" onClick={this.handleNavigate}>
                                Downloads
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/showcase.html" className="nav-link" onClick={this.handleNavigate}>
                                Showcase
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/leaderboards.html" className="nav-link" onClick={this.handleNavigate}>
                                Leaderboards
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://discuss.colouring.london">
                                Discuss
                            </a>
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
                    <hr />
                    <ul className="navbar-nav flex-column">
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
                    </ul>
                    <hr />
                    <ul className="navbar-nav flex-column">
                        <li className="nav-item">
                            <NavLink to="/contact.html" className="nav-link" onClick={this.handleNavigate}>
                                Contact
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/privacy-policy.html" className="nav-link" onClick={this.handleNavigate}>
                                Privacy Policy
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/contributor-agreement.html" className="nav-link" onClick={this.handleNavigate}>
                                Contributor Agreement
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/code-of-conduct.html" className="nav-link" onClick={this.handleNavigate}>
                                Code of Conduct
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/data-accuracy.html" className="nav-link" onClick={this.handleNavigate}>
                                Data Accuracy Agreement
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/ordnance-survey-uprn.html" className="nav-link" onClick={this.handleNavigate}>
                                Ordnance Survey terms of UPRN usage
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
