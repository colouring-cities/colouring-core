import React, { Fragment } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import Sidebar from './sidebar';
import { EditIcon } from './icons';
import CONFIG from './fields-config.json';

const Overview = (props) => {
    var data_layer = 'age'; // always default
    if (props.match && props.match.params && props.match.params.cat) {
        data_layer = props.match.params.cat;
    }

    if (props.mode === 'edit' && !props.user){
        return <Redirect to="/sign-up.html" />
    }

    let title = (props.mode === 'view')? 'View maps' : 'Add or edit data';
    let back = (props.mode === 'edit')? `/view/${data_layer}.html` : undefined;

    return (
        <Sidebar title={title} back={back}>
            {
                CONFIG.map((data_group) => (
                    <OverviewSection {...data_group}
                        data_layer={data_layer} key={data_group.slug} mode={props.mode} />
                ))
            }
        </Sidebar>
    );
}

const OverviewSection = (props) => {
    const match = props.data_layer === props.slug;
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

export default Overview;
