import React, { Fragment } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Sidebar from './sidebar';
import { EditIcon } from './icons';
import CONFIG from './fields-config.json';

const Overview = (props) => {
    var dataLayer = 'age'; // always default
    if (props.match && props.match.params && props.match.params.cat) {
        dataLayer = props.match.params.cat;
    }

    if (props.mode === 'edit' && !props.user){
        return <Redirect to="/sign-up.html" />
    }

    const title = (props.mode === 'view')? 'View maps' : 'Add or edit data';
    const back = (props.mode === 'edit')? `/view/${dataLayer}.html` : undefined;

    return (
        <Sidebar title={title} back={back}>
            {
                CONFIG.map((dataGroup) => (
                    <OverviewSection {...dataGroup}
                        dataLayer={dataLayer} key={dataGroup.slug} mode={props.mode} />
                ))
            }
        </Sidebar>
    );
}

Overview.propTypes = {
    match: PropTypes.object,
    mode: PropTypes.string,
    user: PropTypes.object
}

const OverviewSection = (props) => {
    const match = props.dataLayer === props.slug;
    const inactive = props.inactive;

    return (
        <section className={(inactive? 'inactive ': '') + 'data-section legend'}>
            <header className={`section-header ${props.mode} ${props.slug} ${(match? 'active' : '')}`}>
                <NavLink
                    to={`/${props.mode}/${props.slug}.html`}
                    isActive={() => match}
                    title={(inactive)? 'Coming soon… Click the ? for more info.' :
                        (match)? '' : 'Show on map'}>
                    <h3 className="h3">{props.title}</h3>
                </NavLink>
                <nav className="icon-buttons">
                    {
                        props.help?
                            <a className="icon-button help" href={props.help}>
                            Info
                            </a>
                            : null
                    }
                    {
                        props.mode === 'view'?
                            <NavLink className="icon-button edit" title="Edit data"
                                to={`/edit/${props.slug}.html`}>
                            Edit
                                <EditIcon />
                            </NavLink>
                            : null
                    }
                </nav>
            </header>
            {
                (match && props.intro)?
                    (
                        <Fragment>
                            <p className="data-intro">{props.intro}</p>
                            <ul>
                                {
                                    props.fields.map((field) => {
                                        return (<li key={field.slug}>{field.title}</li>)
                                    })
                                }
                            </ul>
                        </Fragment>
                    )
                    : null
            }
        </section>
    )
};

OverviewSection.propTypes = {
    title: PropTypes.string,
    slug: PropTypes.string,
    intro: PropTypes.string,
    help: PropTypes.string,
    dataLayer: PropTypes.string,
    mode: PropTypes.string,
    inactive: PropTypes.bool,
    fields: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        slug: PropTypes.string
    }))
}

export default Overview;
