import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import queryString from 'query-string';

import Sidebar from './sidebar';
import Tooltip from './tooltip';
import InfoBox from './info-box';
import { EditIcon } from './icons';

import CONFIG from './fields-config.json';


const BuildingView = (props) => {
    if (!props.building_id){
        return (
            <Sidebar title="Building Not Found">
                <InfoBox msg="We can't find that one anywhere - try the map again?" />
                <div className="buttons-container with-space">
                    <Link to="/map/age.html" className="btn btn-secondary">Back to maps</Link>
                </div>
            </Sidebar>
        );
    }
    const search = (props.location && props.location.search)? queryString.parse(props.location.search): {};
    return (
        <Sidebar title={`Data available for this building`} back={search.cat? `/map/${search.cat}.html` : "/map/age.html"}>
            {
                CONFIG.map(section_props => (
                    <DataSection
                        key={section_props.slug} search={search}
                        building_id={props.building_id}
                        {...section_props}>
                        {
                            section_props.fields.map(field_props => {
                                return (field_props.slug === 'uprns')?
                                <UPRNsDataEntry
                                    key={field_props.slug}
                                    title={field_props.title}
                                    value={props.uprns}
                                    tooltip={field_props.tooltip} />
                                :
                                <DataEntry
                                    key={field_props.slug}
                                    title={field_props.title}
                                    value={props[field_props.slug]}
                                    tooltip={field_props.tooltip} />
                            })
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
            <header className={(match? "active " : "") + " section-header view"}>
                <NavLink
                    to={`/building/${props.building_id}.html` + ((match)? '': `?cat=${props.slug}`)}
                    title={(props.inactive)? 'Coming soon… Click the ? for more info.' :
                        (match)? 'Hide details' : 'Show details'}
                    isActive={() => match}>
                    <h3 className="h3">{props.title}</h3>
                </NavLink>
                <nav className="icon-buttons">
                {
                    props.help?
                    <a className="icon-button help" title="Find out more" href={props.help}>
                        More info
                    </a>
                    : null
                }
                {
                    !props.inactive?
                    <NavLink className="icon-button edit" title="Edit data"
                        to={`/building/${props.building_id}/edit.html?cat=${props.slug}`}>
                        Edit
                        <EditIcon />
                    </NavLink>
                    : null
                }
                </nav>
            </header>
            { match? <dl className="data-list">{props.children}</dl> : null }
        </section>
    );
}

const DataEntry = (props) => (
    <Fragment>
        <dt>
            { props.title }
            { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
        </dt>
        <dd>{(props.value != null)? props.value : '\u00A0'}</dd>
    </Fragment>
);

const UPRNsDataEntry = (props) => {
    const uprns = props.value || [];
    const no_parent = uprns.filter(uprn => uprn.parent_uprn == null);
    const with_parent = uprns.filter(uprn => uprn.parent_uprn != null);

    return (
    <Fragment>
        <dt>
            { props.title }
            { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
        </dt>
        <dd><ul className="uprn-list">
            <Fragment>{
                no_parent.length?
                    no_parent.map(uprn => (
                        <li key={uprn.uprn}>{uprn.uprn}</li>
                    ))
                : '\u00A0'
            }</Fragment>
            {
                with_parent.length?
                <details>
                    <summary>Children</summary>
                    {
                    with_parent.map(uprn => (
                        <li key={uprn.uprn}>{uprn.uprn} (child of {uprn.parent_uprn})</li>
                        ))
                    }
                </details>
                : null
            }
        </ul></dd>
    </Fragment>
    )
}

export default BuildingView;
