import urlapi from 'url';
import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

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
                    <Link to="/view/age.html" className="btn btn-secondary">Back to maps</Link>
                </div>
            </Sidebar>
        );
    }
    const cat = props.match.params.cat;
    return (
        <Sidebar title={'Data available for this building'} back={`/view/${cat}.html`}>
            {
                CONFIG.map(section => (
                    <DataSection
                        key={section.slug} cat={cat}
                        building_id={props.building_id}
                        {...section}>
                        {
                            section.fields.map(field => {

                                switch (field.type) {
                                case 'uprn_list':
                                    return <UPRNsDataEntry
                                        key={field.slug}
                                        title={field.title}
                                        value={props.uprns}
                                        tooltip={field.tooltip} />
                                case 'text_multi':
                                    return <MultiDataEntry
                                        key={field.slug}
                                        title={field.title}
                                        value={props[field.slug]}
                                        tooltip={field.tooltip} />
                                case 'like':
                                    return <LikeDataEntry
                                        key={field.slug}
                                        title={field.title}
                                        value={props[field.slug]}
                                        user_building_like={props.building_like}
                                        tooltip={field.tooltip} />
                                default:
                                    return <DataEntry
                                        key={field.slug}
                                        title={field.title}
                                        value={props[field.slug]}
                                        tooltip={field.tooltip} />
                                }
                            })
                        }
                    </DataSection>
                ))
            }
        </Sidebar>
    );
}

BuildingView.propTypes = {
    building_id: PropTypes.string,
    match: PropTypes.object,
    uprns: PropTypes.arrayOf(PropTypes.shape({
        uprn: PropTypes.string.isRequired,
        parent_uprn: PropTypes.string
    })),
    building_like: PropTypes.bool
}

const DataSection = (props) => {
    const match = props.cat === props.slug;
    return (
        <section id={props.slug} className={(props.inactive)? 'data-section inactive': 'data-section'}>
            <header className={`section-header view ${props.slug} ${(match? 'active' : '')}`}>
                <NavLink
                    to={`/view/${props.slug}/building/${props.building_id}.html`}
                    title={(props.inactive)? 'Coming soon… Click the ? for more info.' :
                        (match)? 'Hide details' : 'Show details'}
                    isActive={() => match}>
                    <h3 className="h3">{props.title}</h3>
                </NavLink>
                <nav className="icon-buttons">
                    {
                        props.help?
                            <a className="icon-button help" title="Find out more" href={props.help}>
                        Info
                            </a>
                            : null
                    }
                    {
                        !props.inactive?
                            <NavLink className="icon-button edit" title="Edit data"
                                to={`/edit/${props.slug}/building/${props.building_id}.html`}>
                        Edit
                                <EditIcon />
                            </NavLink>
                            : null
                    }
                </nav>
            </header>
            {
                match?
                    !props.inactive?
                        <dl className="data-list">{props.children}</dl>
                        : <p className="data-intro">{props.intro}</p>
                    : null
            }
        </section>
    );
}

DataSection.propTypes = {
    title: PropTypes.string,
    cat: PropTypes.string,
    slug: PropTypes.string,
    intro: PropTypes.string,
    help: PropTypes.string,
    inactive: PropTypes.bool,
    building_id: PropTypes.string,
    children: PropTypes.node
}

const DataEntry = (props) => (
    <Fragment>
        <dt>
            { props.title }
            { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
        </dt>
        <dd>{
            (props.value != null && props.value !== '')?
                (typeof(props.value) === 'boolean')?
                    (props.value)? 'Yes' : 'No'
                    : props.value
                : '\u00A0'}</dd>
    </Fragment>
);

DataEntry.propTypes = {
    title: PropTypes.string,
    tooltip: PropTypes.string,
    value: PropTypes.any
}

const LikeDataEntry = (props) => (
    <Fragment>
        <dt>
            { props.title }
            { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
        </dt>
        <dd>
            {
                (props.value != null)?
                    (props.value === 1)?
                        `${props.value} person likes this building`
                        : `${props.value} people like this building`
                    : '\u00A0'
            }
        </dd>
        {
            (props.user_building_like)? <dd>&hellip;including you!</dd> : null
        }
    </Fragment>
);

LikeDataEntry.propTypes = {
    title: PropTypes.string,
    tooltip: PropTypes.string,
    value: PropTypes.any,
    user_building_like: PropTypes.bool
}

const MultiDataEntry = (props) => {
    let content;

    if (props.value && props.value.length) {
        content = <ul>{
            props.value.map((item, index) => {
                return <li key={index}><a href={sanitiseURL(item)}>{item}</a></li>
            })
        }</ul>
    } else {
        content = '\u00A0'
    }

    return (
        <Fragment>
            <dt>
                { props.title }
                { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
            </dt>
            <dd>{ content }</dd>
        </Fragment>
    );
}

MultiDataEntry.propTypes = {
    title: PropTypes.string,
    tooltip: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string)
}

function sanitiseURL(string){
    let url_

    // http or https
    if (!(string.substring(0, 7) === 'http://' || string.substring(0, 8) === 'https://')){
        return null
    }

    try {
        url_ = document.createElement('a')
        url_.href = string
    } catch (error) {
        try {
            url_ = urlapi.parse(string)
        } catch (error) {
            return null
        }
    }

    // required (www.example.com)
    if (!url_.hostname || url_.hostname === '' || url_.hostname === 'localhost'){
        return null
    }

    // optional (/some/path)
    // url_.pathname;

    // optional (?name=value)
    // url_.search;

    // optional (#anchor)
    // url_.hash;

    return `${url_.protocol}//${url_.hostname}${url_.pathname || ''}${url_.search || ''}${url_.hash || ''}`
}

const UPRNsDataEntry = (props) => {
    const uprns = props.value || [];
    const noParent = uprns.filter(uprn => uprn.parent_uprn == null);
    const withParent = uprns.filter(uprn => uprn.parent_uprn != null);

    return (
        <Fragment>
            <dt>
                { props.title }
                { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
            </dt>
            <dd><ul className="uprn-list">
                <Fragment>{
                    noParent.length?
                        noParent.map(uprn => (
                            <li key={uprn.uprn}>{uprn.uprn}</li>
                        ))
                        : '\u00A0'
                }</Fragment>
                {
                    withParent.length?
                        <details>
                            <summary>Children</summary>
                            {
                                withParent.map(uprn => (
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

UPRNsDataEntry.propTypes = {
    title: PropTypes.string,
    tooltip: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.shape({
        uprn: PropTypes.string.isRequired,
        parent_uprn: PropTypes.string
    }))
}

export default BuildingView;
