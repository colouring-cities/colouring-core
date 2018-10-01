import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Sidebar from './sidebar';
import Tooltip from './tooltip';
import InfoBox from './info-box';
import { InfoIcon, EditIcon } from './icons';


const DataSection = function(props){
    const match = props.hash && props.slug.match(props.hash);
    return (
        <section className={(props.inactive)? "data-section inactive": "data-section"}>
            <header className="bullet-prefix section-header" isActive={() => match}>
                <NavLink to={(match)? '#': `#${props.slug}`}>
                    <h3 className="h3">{props.title}</h3>
                </NavLink>
                {
                    props.helpLink?
                    <a className="icon-button help" title="Find out more" href={props.helpLink} target="_blank" rel="noopener noreferrer">
                        <InfoIcon />
                    </a>
                    : null
                }
                {
                    !props.inactive?
                    <NavLink className="icon-button edit" title="Edit data" to={`/building/${props.building_id}/edit.html#${props.slug}`}>
                        <EditIcon />
                    </NavLink>
                    : null
                }
            </header>
            <Fragment>{ (match)? props.children : null }</Fragment>
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

const BuildingView = function(props){
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
    const hash = (props.location && props.location.hash)? props.location.hash.replace('#', ''): undefined;
    return (
        <Sidebar title={`View Building`}>
            <DataSection title="Location" slug="location" hash={hash}
                         helpLink="https://pollyhudson.wixsite.com/colouringlondon/location">
                <p className="data-intro">

                    Section introduction of up to roughly 100 characters will take
                    approx&shy;imately this much space.

                </p>
                <dl id="data-list-location" className="data-list collapse show">
                    <dt>
                        Building Name
                        <Tooltip text="Hint tooltip content should be ~40 chars." />
                    </dt>
                    <dd>{props.location_name ? props.location_name : '-'}</dd>
                    <dt>Building Number</dt>
                    <dd>{props.location_number ? props.location_number : '-'}</dd>
                    <dt>Street</dt>
                    <dd>{props.location_street ? props.location_street : '-'}</dd>
                    <dt>Address line 2</dt>
                    <dd>{props.location_line_two ? props.location_line_two : '-'}</dd>
                    <dt>Town</dt>
                    <dd>{props.location_town ? props.location_town : '-'}</dd>
                    <dt>Postcode</dt>
                    <dd>{props.location_postcode ? props.location_postcode : '-'}</dd>
                </dl>
            </DataSection>
            <DataSection inactive={true} title="Use" slug="use" hash={hash}
                         helpLink="https://pollyhudson.wixsite.com/colouringlondon/use">
                <p className="data-intro">Coming soon&hellip; Click the ? for more info.</p>
            </DataSection>
            <DataSection inactive={true} title="Type" slug="type" hash={hash}
                         helpLink="https://pollyhudson.wixsite.com/colouringlondon/type">
                <p className="data-intro">Coming soon&hellip; Click the ? for more info.</p>
            </DataSection>
            <DataSection title="Age" slug="age" hash={hash}
                         helpLink="https://pollyhudson.wixsite.com/colouringlondon/age">
                <dl className="data-list">
                    <dt>Year built (best estimate)</dt>
                    <dd>{props.date_year? props.date_year : '-'}</dd>
                    <dt>Year built (lower estimate)</dt>
                    <dd>{props.date_lower? props.date_lower : '-'}</dd>
                    <dt>Year built (upper estimate)</dt>
                    <dd>{props.date_upper? props.date_upper : '-'}</dd>
                    <dt>Date Source</dt>
                    <dd>{props.date_source? props.date_source : '-'}</dd>
                    <dt>Facade date</dt>
                    <dd>{props.date_facade? props.date_facade : '-'}</dd>
                </dl>
            </DataSection>
            <DataSection title="Size" slug="size" hash={hash}
                         helpLink="https://pollyhudson.wixsite.com/colouringlondon/shape">
                <dl className="data-list">
                    <dt>Total storeys</dt>
                    <dd>{(props.size_storeys_attic + props.size_storeys_basement + props.size_storeys_core)}</dd>
                    <dt>Attic storeys</dt>
                    <dd>{props.size_storeys_attic? props.size_storeys_attic : '-'}</dd>
                    <dt>Basement storeys</dt>
                    <dd>{props.size_storeys_basement? props.size_storeys_basement : '-'}</dd>
                </dl>
                <dl className="data-list">
                    <dt>Height to apex (m)</dt>
                    <dd>{props.size_height_apex? props.size_height_apex : '-'}</dd>
                    <dt>Ground floor area (m²)</dt>
                    <dd>{props.size_floor_area_ground? props.size_floor_area_ground : '-'}</dd>
                    <dt>Total floor area (m²)</dt>
                    <dd>{props.size_floor_area_total? props.size_floor_area_total : '-'}</dd>
                    <dt>Frontage Width (m)</dt>
                    <dd>{props.size_width_frontage? props.size_width_frontage : '-'}</dd>
                </dl>
            </DataSection>
            <DataSection inactive={true} title="Shape &amp; Position" slug="form" hash={hash}
                         helpLink="https://pollyhudson.wixsite.com/colouringlondon/form">
                <p className="data-intro">Coming soon&hellip; Click the ? for more info.</p>
            </DataSection>
            <DataSection inactive={true} title="Build Team" slug="build-team" hash={hash}
                         helpLink="https://pollyhudson.wixsite.com/colouringlondon/builder">
                <p className="data-intro">Coming soon&hellip; Click the ? for more info.</p>
            </DataSection>
            <DataSection inactive={true} title="Construction &amp; Design" slug="construction" hash={hash}
                         helpLink="https://pollyhudson.wixsite.com/colouringlondon/contstruction">
                <p className="data-intro">Coming soon&hellip; Click the ? for more info.</p>
            </DataSection>
            <DataSection inactive={true} title="Energy" slug="energy" hash={hash}
                         helpLink="https://pollyhudson.wixsite.com/colouringlondon/energy">
                <p className="data-intro">Coming soon&hellip; Click the ? for more info.</p>
            </DataSection>
            <DataSection inactive={true} title="Greenery" slug="greenery" hash={hash}
                         helpLink="https://pollyhudson.wixsite.com/colouringlondon/copy-of-street-context">
                <p className="data-intro">Coming soon&hellip; Click the ? for more info.</p>
            </DataSection>
            <DataSection inactive={true} title="Planning &amp; Protection" slug="planning" hash={hash}
                         helpLink="https://pollyhudson.wixsite.com/colouringlondon/planning">
                <p className="data-intro">Coming soon&hellip; Click the ? for more info.</p>
            </DataSection>
            <DataSection inactive={true} title="Demolition" slug="demolition" hash={hash}
                         helpLink="https://pollyhudson.wixsite.com/colouringlondon/demolitions">
                <p className="data-intro">Coming soon&hellip; Click the ? for more info.</p>
            </DataSection>
            <DataSection title="Like Me!" slug="like" hash={hash}
                         helpLink="https://pollyhudson.wixsite.com/colouringlondon/likeme">
                <dl className="data-list">
                    <dt>Likes</dt>
                    <dd>{props.likes ? props.likes.length : 0}</dd>
                </dl>
            </DataSection>
        </Sidebar>
    );
}

export default BuildingView;
