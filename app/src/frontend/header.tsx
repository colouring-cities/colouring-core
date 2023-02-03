import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';

import { Logo } from './components/logo';
import { WithSeparator } from './components/with-separator';
import { useAuth } from './auth-context';

import { CCConfig } from '../cc-config';
let config: CCConfig = require('../cc-config.json')

interface MenuLink {
    to: string;
    text: string;
    external?: boolean;
    disabled?: boolean;
    note?: string;
}


function getCurrentMenuLinks(username: string): MenuLink[][] {
    return [
        [
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
                to: "/view/categories",
                text: "View Maps"
            },
            {
                to: "/edit/categories",
                text: "Edit Maps"
            },
            {
                to: "/data-extracts.html",
                text: "Download data"
            },
            {
                to: "https://github.com/colouring-cities/manual/wiki",
                text: "Open Manual - Wiki",
                external: true
            },
            {
                to: config.githubURL,
                text: "Open code",
                external: true
            },
            {
                to: "https://github.com/colouring-cities/manual/wiki",
                text: "Colouring Cities Open Manual/Wiki",
                disabled: false,
                external: true
            },
            {
                to: "/showcase.html",
                text: "Case Study Showcase",
                disabled: true,
            },
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
                to: "/leaderboard.html",
                text: "Top Contributors"
            },
            {
                to: "https://discuss.colouring.london",
                text: "Discussion Forum",
                external: true
            },
            {
                to: "https://discuss.colouring.london/c/blog/9",
                text: "Blog",
                external: true
            },
        ],
        [
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
        [
            {
                to: "/contact.html",
                text: "Contact"
            },
        ],
    ];
}

const Menu: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
    const { user } = useAuth();

    const menuLinkSections = getCurrentMenuLinks(user?.username);
    return (
        <WithSeparator separator={<hr />}>
            {menuLinkSections.map((section, idx) =>
                <ul key={`menu-section-${idx}`} className="navbar-nav flex-container">
                    {section.map(item => (
                        <li className='nav-item' key={`${item.to}-${item.text}`}>
                            {
                                item.disabled ?
                                    <LinkStub note={item.note}>{item.text}</LinkStub> :
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
};

const InternalNavLink: React.FC<{to: string; onClick: () => void}> = ({ to, onClick, children}) => (
    <NavLink className="nav-link" to={to} onClick={onClick}>
        {children}
    </NavLink>
);

const ExternalNavLink: React.FC<{to: string}> = ({ to, children }) => (
    <a className="nav-link" href={to}>
        {children}
    </a>
);

const LinkStub: React.FC<{note: string}> = ({note, children}) => (
    <a className="nav-link disabled">
        {children}
        <span className="link-note">{note}</span>
    </a>
);

export const Header: React.FC<{
    animateLogo: boolean;
}> = ({ animateLogo }) => {
    const [collapseMenu, setCollapseMenu] = useState(true);

    const toggleCollapse = () => setCollapseMenu(!collapseMenu);
    const handleNavigate = () => setCollapseMenu(true);

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
            <Menu onNavigate={handleNavigate}></Menu>
        </nav>
    </header>
    );
}
