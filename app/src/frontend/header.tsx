import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Logo } from './components/logo';
import './header.css';

/**
 * Render the main header using a responsive design
 */
class Header extends React.Component<any, any> { // TODO: add proper types
    static propTypes = { // TODO: generate propTypes from TS
        user: PropTypes.shape({
            username: PropTypes.string
        })
    };

    constructor(props) {
        super(props);
        this.state = {collapseMenu: true};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            collapseMenu: !state.collapseMenu
        }));
    }

    render() {
        return (
            <header className="main-header">
                <nav className="navbar navbar-light navbar-expand-lg">
                    <span className="navbar-brand align-self-start">
                        <NavLink to="/">
                            <Logo variant='animated'/>
                        </NavLink>
                    </span>
                    <button className="navbar-toggler navbar-toggler-right" type="button"
                        onClick={this.handleClick} aria-expanded={!this.state.collapseMenu} aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={this.state.collapseMenu ? 'collapse navbar-collapse' : 'navbar-collapse'}>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink to="/view/categories.html" className="nav-link">
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
                            {
                                this.props.user?
                                    (
                                        <li className="nav-item">
                                            <NavLink to="/my-account.html" className="nav-link">
                                                Account <span className="shorten-username">({this.props.user.username})</span>
                                            </NavLink>
                                        </li>
                                    ):
                                    (
                                        <Fragment>
                                            <li className="nav-item">
                                                <NavLink to="/login.html" className="nav-link">
                                                    Log in
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/sign-up.html" className="nav-link">
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
