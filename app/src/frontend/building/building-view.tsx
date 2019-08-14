import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Tooltip from '../components/tooltip';
import { sanitiseURL } from '../helpers';

import BuildingNotFound from './building-not-found';
import ContainerHeader from './container-header';
import Sidebar from './sidebar';

import LocationContainer from './data-containers/location';
import UseContainer from './data-containers/use';
import TypeContainer from './data-containers/type';
import AgeContainer from './data-containers/age';
import SizeContainer from './data-containers/size';
import ConstructionContainer from './data-containers/construction';
import TeamContainer from './data-containers/team';
import SustainabilityContainer from './data-containers/sustainability';
import GreeneryContainer from './data-containers/greenery';
import CommunityContainer from './data-containers/community';
import PlanningContainer from './data-containers/planning';
import LikeContainer from './data-containers/like';

/**
 * Top-level container for building view/edit form
 *
 * @param props
 */
const BuildingView = (props) => {
    switch (props.cat) {
        case 'location':
            return <LocationContainer
                {...props}
                title="Location"
                help="https://pages.colouring.london/location"
                intro="Where are the buildings? Address, location and cross-references."
            />
        case 'use':
            return <UseContainer
                {...props}
                inactive={true}
                title="Land Use"
                intro="How are buildings used, and how does use change over time? Coming soon…"
                help="https://pages.colouring.london/use"
            />
        case 'type':
            return <TypeContainer
                {...props}
                inactive={true}
                title="Type"
                intro="How were buildings previously used? Coming soon…"
                help="https://www.pages.colouring.london/buildingtypology"
            />
        case 'age':
            return <AgeContainer
                {...props}
                title="Age"
                help="https://pages.colouring.london/age"
                intro="Building age data can support energy analysis and help predict long-term change."
            />
        case 'size':
            return <SizeContainer
                {...props}
                title="Size &amp; Shape"
                intro="How big are buildings?"
                help="https://pages.colouring.london/shapeandsize"
            />
        case 'construction':
            return <ConstructionContainer
                {...props}
                title="Construction"
                intro="How are buildings built? Coming soon…"
                help="https://pages.colouring.london/construction"
                inactive={true}
            />
        case 'team':
            return <TeamContainer
                {...props}
                title="Team"
                intro="Who built the buildings? Coming soon…"
                help="https://pages.colouring.london/team"
                inactive={true}
            />
        case 'sustainability':
            return <SustainabilityContainer
                {...props}
                title="Sustainability"
                intro="Are buildings energy efficient? Coming soon…"
                help="https://pages.colouring.london/sustainability"
                inactive={true}
            />
        case 'greenery':
            return <GreeneryContainer
                {...props}
                title="Greenery"
                intro="Is there greenery nearby? Coming soon…"
                help="https://pages.colouring.london/greenery"
                inactive={true}
            />
        case 'community':
            return <CommunityContainer
                {...props}
                title="Community"
                intro="How does this building work for the local community?"
                help="https://pages.colouring.london/community"
                inactive={true}
            />
        case 'planning':
            return <PlanningContainer
                {...props}
                title="Planning"
                intro="Planning controls relating to protection and reuse."
                help="https://pages.colouring.london/planning"
            />
        case 'like':
            return <LikeContainer
                {...props}
                title="Like Me!"
                intro="Do you like the building and think it contributes to the city?"
                help="https://pages.colouring.london/likeme"
            />
        default:
            return <BuildingNotFound mode="view" />
    }
}

/**
 * Shared functionality for view/edit forms
 *
 * See React Higher-order-component docs for the pattern
 * - https://reactjs.org/docs/higher-order-components.html
 *
 * @param WrappedComponent
 */
function  withCopyEdit(WrappedComponent) {
    return class extends React.Component<any, any> { // TODO: add proper types
        static propTypes = { // TODO: generate propTypes from TS
            title: PropTypes.string,
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
            const data_string = JSON.stringify(this.state.values_to_copy);
            const copy = {
                copying: this.state.copying,
                toggleCopyAttribute: this.toggleCopyAttribute,
                copyingKey: (key) => Object.keys(this.state.values_to_copy).includes(key)
            }
            return this.props.building?
                <Sidebar>
                    <section id={this.props.slug} className="data-section">
                        <ContainerHeader {...this.props} data_string={data_string} copy={copy} />
                        <WrappedComponent {...this.props} copy={copy} />
                    </section>
                </Sidebar>
            : <BuildingNotFound mode="view" />
        }
    }
}


const DataEntry: React.FunctionComponent<any> = (props) => { // TODO: remove any
    return (
        <Fragment>
            <dt>
                { props.title }
                { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
                { (props.copy.copying && props.cat && props.slug && !props.disabled)?
                    <div className="icon-buttons">
                        <label className="icon-button copy">
                            Copy
                            <input
                                type="checkbox"
                                checked={props.copy.copyingThis(props.slug)}
                                onChange={() => props.copy.toggleCopyAttribute(props.slug)}/>
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
export { withCopyEdit };
