import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from './logo';
import './header.css';

/**
 * Main Header
 */
function Header(props) {
    if (props.user) {
        return (
            <header className="main-header">
                <nav className="navbar navbar-light navbar-expand-md">
                    <Logo />
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to="/maps.html" className="nav-link">View Maps</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about.html" className="nav-link">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/my-account.html" className="nav-link">My account (Logged in as {props.user.username})</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    } else {
        return (
            <header className="main-header">
                <nav className="navbar navbar-light navbar-expand-md">
                    <Logo />
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to="/maps.html" className="nav-link">View Maps</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about.html" className="nav-link">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login.html" className="nav-link">Log in</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/sign-up.html" className="nav-link">Sign up</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}
export default Header;
