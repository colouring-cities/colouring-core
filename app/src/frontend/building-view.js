import React from 'react';
import { Link } from 'react-router-dom';

const BuildingView = (props) => (
    <div id="legend" className="info-container">
        <h2 className="h2">Building data</h2>
        <section className="data-section">
            <h3 className="h3 bullet-prefix location toggled-on"
                data-toggle="collapse"
                data-target="#data-list-location">
                Location
            </h3>
            <p className="data-intro">

                Section introduction of up to roughly 100 characters will take
                approx&shy;imately this much space.

                <a href="#">Read more</a>.
            </p>
            <dl id="data-list-location" className="data-list collapse show">
            <dt>
                Building Name

                <span className="tooltip-hook" data-toggle="tooltip">
                    ?
                    <div className="tooltip bs-tooltip-bottom">
                        <div className="arrow"></div>
                        <div className="tooltip-inner">

                        Hint tooltip content should be ~40 chars.

                        </div>
                    </div>
                </span>
            </dt>
            <dd><span className="no-data">no data</span></dd>
            <dt>Building Number</dt>
            <dd><span className="no-data">no data</span></dd>
            <dt>Street</dt>
            <dd><span className="no-data">no data</span></dd>
            <dt>Address line 2</dt>
            <dd><span className="no-data">no data</span></dd>
            <dt>Town</dt>
            <dd><span className="no-data">no data</span></dd>
            <dt>Postcode</dt>
            <dd><span className="no-data">no data</span></dd>
            </dl>
        </section>
        <section className="data-section">
            <h3 className="h3 bullet-prefix age"
                data-toggle="collapse"
                data-target="#data-list-age">Age</h3>
            <dl id="data-list-age" className="data-list collapse">
            <dt>Year built (best estimate)</dt>
            <dd>2018</dd>
            <dt>Year built (lower estimate)</dt>
            <dd>2018</dd>
            <dt>Year built (upper estimate)</dt>
            <dd>2018</dd>
            <dt>Date Source</dt>
            <dd>Pevsner</dd>
            <dt>Facade date</dt>
            <dd>2018</dd>
            </dl>
        </section>
        <section className="data-section">
            <h3 className="h3 bullet-prefix size"
                data-toggle="collapse"
                data-target="#data-list-size">Size</h3>
            <dl id="data-list-size" className="data-list collapse">
            <dt>Attic storeys</dt>
            <dd>0</dd>
            <dt>Core storeys</dt>
            <dd>3</dd>
            <dt>Basement storeys</dt>
            <dd>1</dd>
            </dl>
        </section>
        <section className="data-section">
            <h3 className="h3 bullet-prefix like"
                data-toggle="collapse"
                data-target="#data-list-like">Like Me!</h3>
            <dl id="data-list-like" className="data-list collapse">
            <dt>Likes</dt>
            <dd> 25</dd>
            </dl>
        </section>
        <div className="buttons-container">
            <Link to="/map/date_year.html" className="btn btn-secondary">Back to maps</Link>
            <Link to={`/building/${props.id}/edit.html`} className="btn btn-primary">Edit data</Link>
        </div>
    </div>
);

export default BuildingView;
