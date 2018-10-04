import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import queryString from 'query-string';

import Sidebar from './sidebar';
import Tooltip from './tooltip';
import InfoBox from './info-box';
import { HelpIcon, EditIcon } from './icons';

import CONFIG from './fields-config.json';


const BuildingView = (props) => {
    if (!props.building_id){
        return (
            <Sidebar title="Building Not Found">
                <InfoBox msg="We can't find that one anywhere - try the map again?" />
                <div className="buttons-container with-space">
                    <Link to="/map/date_year.html" className="btn btn-secondary">Back to maps</Link>
                </div>
            </Sidebar>
        );
    }
    const search = (props.location && props.location.search)? queryString.parse(props.location.search): {};
    return (
        <Sidebar title={`View Building`} back="/map/date_year.html">
            {
                CONFIG.map(section_props => (
                    <DataSection
                        key={section_props.slug} search={search}
                        building_id={props.building_id}
                        {...section_props}>
                        {
                            section_props.fields.map(field_props => (
                                <DataEntry
                                    key={field_props.slug}
                                    title={field_props.title}
                                    value={props[field_props.slug]}
                                    tooltip={field_props.tooltip} />
                            ))
                        }
                    </DataSection>
                ))
            }
        </Sidebar>
    );
}


const DataSection = (props) => {
    const match = props.search.cat === props.slug;
    return (
        <section id={props.slug} className={(props.inactive)? "data-section inactive": "data-section"}>
            <header className={(match? "active " : "") + "bullet-prefix section-header"}>
                <NavLink
                    to={`/building/${props.building_id}.html` + ((match)? '': `?cat=${props.slug}`)}
                    isActive={() => match}>
                    <h3 className="h3">{props.title}</h3>
                </NavLink>
                {
                    props.help?
                    <a className="icon-button help" title="Find out more" href={props.help} target="_blank" rel="noopener noreferrer">
                        <HelpIcon />
                    </a>
                    : null
                }
                {
                    !props.inactive?
                    <NavLink className="icon-button edit" title="Edit data"
                        to={`/building/${props.building_id}/edit.html?cat=${props.slug}`}>
                        <EditIcon />
                    </NavLink>
                    : null
                }
            </header>
            { (match && props.intro)? <p className="data-intro">{ props.intro }</p> : null }
            { match? <dl className="data-list">{props.children}</dl> : null }
            {
                (match && !props.inactive)?
                    <div className="buttons-container with-space">
                        <Link to={`/building/${props.building_id}/edit.html#${props.slug}`} className="btn btn-primary">Edit data</Link>
                    </div>
                : null
            }
        </section>
    );
}

const DataEntry = (props) => (
    <Fragment>
        <dt>
            { props.title }
            { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
        </dt>
        <dd>{props.value ? props.value : '-'}</dd>
    </Fragment>
);

export default BuildingView;
