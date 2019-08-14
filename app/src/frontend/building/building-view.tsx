import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Sidebar from './sidebar';
import Tooltip from '../components/tooltip';
import InfoBox from '../components/info-box';
import { EditIcon } from '../components/icons';
import { sanitiseURL } from '../helpers';

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
                        {...section} {...props} />
                ))
            }
        </Sidebar>
    );
}

BuildingView.propTypes = {
    building_id: PropTypes.number,
    match: PropTypes.object,
    uprns: PropTypes.arrayOf(PropTypes.shape({
        uprn: PropTypes.string.isRequired,
        parent_uprn: PropTypes.string
    })),
    building_like: PropTypes.bool
}

class DataSection extends React.Component<any, any> { // TODO: add proper types
    static propTypes = { // TODO: generate propTypes from TS
        title: PropTypes.string,
        cat: PropTypes.string,
        slug: PropTypes.string,
        intro: PropTypes.string,
        help: PropTypes.string,
        inactive: PropTypes.bool,
        building_id: PropTypes.number,
        children: PropTypes.node
    };

    constructor(props) {
        super(props);
        this.state = {
            copying: false,
            values_to_copy: {}
        };
        this.toggleCopying = this.toggleCopying.bind(this);
        this.toggleCopyAttribute = this.toggleCopyAttribute.bind(this);
    }

    /**
     * Enter or exit "copying" state - allow user to select attributes to copy
     */
    toggleCopying() {
        this.setState({
            copying: !this.state.copying
        })
    }

    /**
     * Keep track of data to copy (accumulate while in "copying" state)
     *
     * @param {string} key
     */
    toggleCopyAttribute(key) {
        const value = this.props[key];
        const values = this.state.values_to_copy;
        if(Object.keys(this.state.values_to_copy).includes(key)){
            delete values[key];
        } else {
            values[key] = value;
        }
        this.setState({
            values_to_copy: values
        })
    }

    render() {
        const props = this.props;
        const match = props.cat === props.slug;
        const data_string = JSON.stringify(this.state.values_to_copy);
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
                            (match && !props.inactive)?
                                this.state.copying?
                                    <Fragment>
                                        <NavLink
                                            to={`/multi-edit/${props.cat}.html?data=${data_string}`}
                                            className="icon-button copy">
                                            Copy selected
                                        </NavLink>
                                        <a className="icon-button copy" onClick={this.toggleCopying}>Cancel</a>
                                    </Fragment>
                                :
                                    <a className="icon-button copy" onClick={this.toggleCopying}>Copy</a>
                            : null
                        }
                        {
                            props.help && !this.state.copying?
                                <a className="icon-button help" title="Find out more" href={props.help}>
                            Info
                                </a>
                                : null
                        }
                        {
                            !props.inactive && !this.state.copying?
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
                            <dl className="data-list">
                                {
                                    props.fields.map(field => {

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
                                                slug={field.slug}
                                                disabled={field.disabled}
                                                cat={props.cat}
                                                title={field.title}
                                                value={props[field.slug]}

                                                copying={this.state.copying}
                                                toggleCopyAttribute={this.toggleCopyAttribute}
                                                copy={Object.keys(this.state.values_to_copy).includes(field.slug)}

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
                                                slug={field.slug}
                                                disabled={field.disabled}
                                                cat={props.cat}
                                                title={field.title}
                                                value={props[field.slug]}

                                                copying={this.state.copying}
                                                toggleCopyAttribute={this.toggleCopyAttribute}
                                                copy={Object.keys(this.state.values_to_copy).includes(field.slug)}

                                                tooltip={field.tooltip} />
                                        }
                                    })
                                }

                            </dl>
                            : <p className="data-intro">{props.intro}</p>
                        : null
                }
            </section>
        );
    }
}

const DataEntry: React.FunctionComponent<any> = (props) => { // TODO: remove any
    return (
        <Fragment>
            <dt>
                { props.title }
                { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
                { (props.copying && props.cat && props.slug && !props.disabled)?
                    <div className="icon-buttons">
                        <label className="icon-button copy">
                            Copy
                            <input type="checkbox" checked={props.copy}
                                onChange={() => props.toggleCopyAttribute(props.slug)}/>
                        </label>
                    </div>
                    : null
                }
            </dt>
            <dd>{
                (props.value != null && props.value !== '')?
                    (typeof(props.value) === 'boolean')?
                        (props.value)? 'Yes' : 'No'
                        : props.value
                    : '\u00A0'}</dd>
        </Fragment>
    );
}

DataEntry.propTypes = {
    title: PropTypes.string,
    cat: PropTypes.string,
    slug: PropTypes.string,
    tooltip: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.any
}

const LikeDataEntry: React.FunctionComponent<any> = (props) => { // TODO: remove any
    const data_string = JSON.stringify({like: true});
    return (
        <Fragment>
            <dt>
                { props.title }
                { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
                <div className="icon-buttons">
                    <NavLink
                        to={`/multi-edit/${props.cat}.html?data=${data_string}`}
                        className="icon-button copy">
                        Copy
                    </NavLink>
                </div>
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
                (props.user_building_like)? <dd>&hellip;including you!</dd> : ''
            }
        </Fragment>
    );
}

LikeDataEntry.propTypes = {
    title: PropTypes.string,
    cat: PropTypes.string,
    tooltip: PropTypes.string,
    value: PropTypes.any,
    user_building_like: PropTypes.bool
}

const MultiDataEntry: React.FunctionComponent<any> = (props) => { // TODO: remove any
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
                { (props.copying && props.cat && props.slug && !props.disabled)?
                    <div className="icon-buttons">
                        <label className="icon-button copy">
                            Copy
                            <input type="checkbox" checked={props.copy}
                                onChange={() => props.toggleCopyAttribute(props.slug)}/>
                        </label>
                    </div>
                    : null
                }
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
