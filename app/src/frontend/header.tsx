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
                text: "Colouring Cities Open Manual/Wiki",
                disabled: false,
                external: true
            },
            {
                to: config.githubURL,
                text: "Open code",
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
                to: "https://github.com/colouring-cities/manual/wiki/A.-What-is-the-CCRP%3F",
                text: "About the Colouring Cities Research Programme",
                external: true
            },
            {
                to: config.manualURL,
                text: "About the Colouring " + config.cityName + " Project",
                external: true
            },
            {
                to: "https://github.com/colouring-cities/manual/wiki/A2.-How-to%3F-Guides",
                text: "How to Use",
                external: true
            },
            {
                to: "https://github.com/colouring-cities/manual/wiki/I.--DATA",
                text: "Data Categories",
                external: true
            },
            {
                to: "https://pages.colouring.london/whoisinvolved",
                text: "Who's Involved?",
                external: true
            },
            {
                to: "https://github.com/colouring-cities/manual/wiki/C.-Ethical-framework-and-ethics-policies",
                text: "Ethical Framework",
                external: true
            }
        ],
        [
            {
                to: "/leaderboard.html",
                text: "Top Contributors"
            },
            {
                to: config.githubURL+"/discussions",
                text: "Discussion Forum",
                external: true
            },
            // {
            //     to: "https://discuss.colouring.london/c/blog/9",
            //     text: "Blog",
            //     external: true
            // },
        ],
        [
            {
                to: "https://github.com/colouring-cities/manual/wiki/C1.-Protocols,-codes-of-conduct-&-data-sharing-agreements#ccrp-contributor-privacy-statement",
                text: "Privacy Policy",
                external: true
            },
            {
                to: "https://github.com/colouring-cities/manual/wiki/C1.-Protocols,-codes-of-conduct-&-data-sharing-agreements#ccrp-contributor--data-user-data-accuracy--ethical-use-agreement",
                text: "Contributor Agreement",
                external: true
            },
            {
                to: "/code-of-conduct.html",
                text: "Code of Conduct"
            },
            {
                to: "https://github.com/colouring-cities/manual/wiki/C1.-Protocols,-codes-of-conduct-&-data-sharing-agreements#ccrp-contributor--data-user-data-accuracy--ethical-use-agreement",
                text: "Data Accuracy and Use Agreement",
                external: true
            },
            {
                to: "https://github.com/colouring-cities/manual/wiki/C1.-Protocols,-codes-of-conduct-&-data-sharing-agreements#ccrp-equality-diversity-and-inclusion-policy",
                text: "Equality, Diversity and Inclusion",
                external: true
            },
            {
                to: "https://github.com/colouring-cities/manual/wiki/C1.-Protocols,-codes-of-conduct-&-data-sharing-agreements#ccrp-protocols-for-international-academic-partners",
                text: "CCRP Academic Partner Protocols",
                external: true
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
    <a className="nav-link" href={to} target="_blank">
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
