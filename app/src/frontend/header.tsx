import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';

import { Logo } from './components/logo';
import { WithSeparator } from './components/with-separator';
import { User } from './models/user';


interface MenuLink {
    to: string;
    text: string;
    external?: boolean;
}


function getCurrentMenuLinks(username: string): MenuLink[][] {
    return [
        [
            {
                to: "/view/categories",
                text: "View/Edit Maps"
            },
            {
                to: "/data-extracts.html",
                text: "Downloads"
            },
            // {
            //     to: "/showcase.html",
            //     text: "Showcase"
            // },
            {
                to: "/leaderboard.html",
                text: "Leaderboard"
            },
            {
                to: "https://discuss.colouring.london",
                text: "Discuss",
                external: true
            },
            ...(
                username != undefined ?
                    [
                        {
                            to: "/my-account.html",
                            text: `Account (${username})`
                        }
                    ] :
                    [
                        {
                            to: "/login.html",
                            text: "Log in"
                        },
                        {
                            to: "/sign-up.html",
                            text: "Sign up"
                        }
                    ]
            )
        ],
        [
            {
                to: "https://pages.colouring.london",
                text: "About",
                external: true
            },
            {
                to: "https://pages.colouring.london/buildingcategories",
                text: "Data Categories",
                external: true
            },
            {
                to: "https://pages.colouring.london/whoisinvolved",
                text: "Who's Involved?",
                external: true
            },
            {
                to: "https://pages.colouring.london/data-ethics",
                text: "Data Ethics",
                external: true
            },
            {
                to: "https://pages.colouring.london/colouring-cities",
                text: "Colouring Cities Research Programme",
                external: true
            },
        ],
        [
            {
                to: "/contact.html",
                text: "Contact"
            },
            {
                to: "/privacy-policy.html",
                text: "Privacy Policy"
            },
            {
                to: "/contributor-agreement.html",
                text: "Contributor Agreement"
            },
            {
                to: "/code-of-conduct.html",
                text: "Code of Conduct"
            },
            {
                to: "/data-accuracy.html",
                text: "Data Accuracy Agreement"
            },
            {
                to: "/ordnance-survey-uprn.html",
                text: "Ordnance Survey terms of UPRN usage"
            },
        ],
    ];
}

export const Header : React.FC<{
    user: User;
    animateLogo: boolean;
}> = ({ user, animateLogo }) => {
    const [collapseMenu, setCollapseMenu] = useState(true);

    const toggleCollapse = () => setCollapseMenu(!collapseMenu);
    const handleNavigate = () => setCollapseMenu(true);

    const currentMenuLinks = getCurrentMenuLinks(user?.username);

    return (
    <header className="main-header navbar navbar-light">
        <div className="nav-header">
            <NavLink to="/">
                <Logo variant={animateLogo ? 'animated' : 'default'}/>
            </NavLink>
            <button className="navbar-toggler" type="button"
                onClick={toggleCollapse} aria-expanded={!collapseMenu} aria-label="Toggle navigation">
                Menu&nbsp;
                {
                    collapseMenu ?
                        <span className="navbar-toggler-icon"></span>
                        : <span className="close">&times;</span>
                }
            </button>
        </div>
        <nav className={collapseMenu ? 'collapse navbar-collapse' : 'navbar-collapse'}>
            <Menu menuLinkSections={currentMenuLinks} onNavigate={handleNavigate}></Menu>
        </nav>
    </header>
    );
}



const Menu : React.FC<{
    menuLinkSections: MenuLink[][],
    onNavigate: () => void
}> = ({ menuLinkSections, onNavigate }) => (
    <WithSeparator separator={<hr />}>
        {menuLinkSections.map(section =>
            <ul className="navbar-nav flex-container">
                {section.map(item => (
                    <li className="nav-item">
                        {
                            item.external ?
                                <ExternalNavLink to={item.to}>{item.text}</ExternalNavLink> :
                                <InternalNavLink to={item.to} onClick={onNavigate}>{item.text}</InternalNavLink>
                        }
                    </li>
                ))}
            </ul>
        )}
    </WithSeparator>
);

const InternalNavLink: React.FC<{to: string, onClick: () => void}> = ({ to, onClick, children}) => (
    <NavLink className="nav-link" to={to} onClick={onClick}>
        {children}
    </NavLink>
);

const ExternalNavLink: React.FC<{to:string}> = ({ to, children }) => (
    <a className="nav-link" target="_blank" href={to}>
        {children}
    </a>
);
