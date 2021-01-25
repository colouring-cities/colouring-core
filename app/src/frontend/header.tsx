import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';

import { Logo } from './components/logo';
import { User } from './models/user';


interface HeaderProps {
    user: User;
    animateLogo: boolean;
}

/**
 * Render the main header using a responsive design
 */

 const Header : React.FC<HeaderProps> = (props) => {
    const [collapseMenu, setCollapseMenu] = useState(true);

    const handleClick = () => setCollapseMenu(!collapseMenu);
    const handleNavigate = () => setCollapseMenu(true);


    return (
    <header className="main-header navbar navbar-light">
        <div className="nav-header">
            <NavLink to="/">
                <Logo variant={props.animateLogo ? 'animated' : 'default'}/>
            </NavLink>
            <button className="navbar-toggler" type="button"
                onClick={handleClick} aria-expanded={!collapseMenu} aria-label="Toggle navigation">
                Menu&nbsp;
                {
                    collapseMenu ?
                        <span className="navbar-toggler-icon"></span>
                        : <span className="close">&times;</span>
                }
            </button>
        </div>
        <nav className={collapseMenu ? 'collapse navbar-collapse' : 'navbar-collapse'}>
            <ul className="navbar-nav flex-column">
                <li className="nav-item">
                    <NavLink to="/view/categories" className="nav-link" onClick={handleNavigate}>
                        View/Edit Maps
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/data-extracts.html" className="nav-link" onClick={handleNavigate}>
                        Downloads
                    </NavLink>
                </li>
                {/*
                <li className="nav-item">
                    <NavLink to="/showcase.html" className="nav-link" onClick={this.handleNavigate}>
                        Showcase
                    </NavLink>
                </li>
                */}
                <li className="nav-item">
                    <NavLink to="/leaderboard.html" className="nav-link" onClick={handleNavigate}>
                        Leaderboard
                    </NavLink>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="https://discuss.colouring.london" target="_blank">
                        Discuss
                    </a>
                </li>
                {
                    props.user?
                    (
                        <li className="nav-item">
                            <NavLink to="/my-account.html" className="nav-link" onClick={handleNavigate}>
                                Account <span className="shorten-username">({props.user.username})</span>
                            </NavLink>
                        </li>
                    ):
                    (
                        <Fragment>
                            <li className="nav-item">
                                <NavLink to="/login.html" className="nav-link" onClick={handleNavigate}>
                                    Log in
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/sign-up.html" className="nav-link" onClick={handleNavigate}>
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
                    <a className="nav-link" href="https://pages.colouring.london" target="_blank">
                        About
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="https://pages.colouring.london/buildingcategories" target="_blank">
                        Data Categories
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="https://pages.colouring.london/whoisinvolved" target="_blank">
                        Who&rsquo;s Involved?
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="https://pages.colouring.london/data-ethics" target="_blank">
                        Data Ethics
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="https://pages.colouring.london/colouring-cities" target="_blank">
                        Colouring Cities Research Programme
                    </a>
                </li>
            </ul>
            <hr />
            <ul className="navbar-nav flex-column">
                <li className="nav-item">
                    <NavLink to="/contact.html" className="nav-link" onClick={handleNavigate}>
                        Contact
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/privacy-policy.html" className="nav-link" onClick={handleNavigate}>
                        Privacy Policy
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/contributor-agreement.html" className="nav-link" onClick={handleNavigate}>
                        Contributor Agreement
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/code-of-conduct.html" className="nav-link" onClick={handleNavigate}>
                        Code of Conduct
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/data-accuracy.html" className="nav-link" onClick={handleNavigate}>
                        Data Accuracy Agreement
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/ordnance-survey-uprn.html" className="nav-link" onClick={handleNavigate}>
                        Ordnance Survey terms of UPRN usage
                    </NavLink>
                </li>
            </ul>
        </nav>
    </header>
    );
}

export default Header;
