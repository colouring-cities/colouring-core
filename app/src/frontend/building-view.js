import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Sidebar from './sidebar';
import Tooltip from './tooltip';
import InfoBox from './info-box';

const BuildingView = function(props){
    if (!props.building_id){
        return (
            <Sidebar title="Building Not Found">
                <InfoBox msg="We can't find that one anywhere - try the map again?" />
                <div className="buttons-container">
                    <Link to="/map/date_year.html" className="btn btn-secondary">Back to maps</Link>
                </div>
            </Sidebar>
        );
    }
    const hash = (props.location && props.location.hash)? props.location.hash: undefined;
    return (
        <Sidebar title={`View Building`}>
            <section className="data-section">
                <NavLink className="bullet-prefix" to="#location">
                    <h3 className="h3 location">Location</h3>
                </NavLink>
                {
                    ( hash.match('location') )
                    ? (
                        <Fragment>
                        <p className="data-intro">

                            Section introduction of up to roughly 100 characters will take
                            approx&shy;imately this much space.

                            <a href="/">Read more</a>.
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
                        </Fragment>
                    ) : null
                }
            </section>
            <section className="data-section">
                <NavLink className="bullet-prefix" to="#age">
                    <h3 className="h3 age">Age</h3>
                </NavLink>
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
            </section>
            <section className="data-section">
                <NavLink className="bullet-prefix" to="#size">
                    <h3 className="h3 size">Size</h3>
                </NavLink>
                <dl className="data-list">
                    <dt>Attic storeys</dt>
                    <dd>{props.size_storeys_attic? props.size_storeys_attic : '-'}</dd>
                    <dt>Core storeys</dt>
                    <dd>{props.size_storeys_core? props.size_storeys_core : '-'}</dd>
                    <dt>Basement storeys</dt>
                    <dd>{props.size_storeys_basement? props.size_storeys_basement : '-'}</dd>
                </dl>
            </section>
            <section className="data-section">
                <NavLink className="bullet-prefix" to="#like">
                    <h3 className="h3 like">Like Me!</h3>
                </NavLink>
                <dl className="data-list">
                    <dt>Likes</dt>
                    <dd>{props.likes ? props.likes.length : 0}</dd>
                </dl>
            </section>
            <div className="buttons-container">
                <Link to="/map/date_year.html" className="btn btn-secondary">Back to maps</Link>
                <Link to={`/building/${props.building_id}/edit.html`} className="btn btn-primary">Edit data</Link>
            </div>
        </Sidebar>
    );
}

export default BuildingView;
