import React from 'react';
import { Link } from 'react-router-dom';

const BuildingEdit = (props) => (
  <div id="legend" className="info-container">
    <h2 className="h2">Edit building data</h2>
    <form action="building-view.html" method="GET">
        <fieldset className="data-section">
            <legend
                className="h3 bullet-prefix location toggled-on"
                data-toggle="collapse"
                data-target="#data-list-location">Location</legend>
            <div id="data-list-location" className="data-list collapse show">
                <label htmlFor="">Building name</label>
                <input className="form-control" type="text" value="" />
                <label htmlFor="">Building number</label>
                <input className="form-control" type="text" value="" />
                <label htmlFor="">Street</label>
                <input className="form-control" type="text" value="" />
                <label htmlFor="">Address line 2</label>
                <input className="form-control" type="text" value="" />
                <label htmlFor="">Town</label>
                <input className="form-control" type="text" value="" />
                <label htmlFor="">Postcode</label>
                <input className="form-control" type="text" value="" />
            </div>
        </fieldset>
        <fieldset className="data-section">
            <legend
                className="h3 bullet-prefix age"
                data-toggle="collapse"
                data-target="#data-list-age">Age</legend>
            <div id="data-list-age" className="data-list collapse">
                <label htmlFor="">Year built (best estimate)</label>
                <input className="form-control" type="number" step="1" value="2018" />
                <label htmlFor="">Year built (upper estimate)</label>
                <input className="form-control" type="number" step="1" value="2018" />
                <label htmlFor="">Year built (lower estimate)</label>
                <input className="form-control" type="number" step="1" value="2018" />
                <label htmlFor="">Facade date</label>
                <input className="form-control" type="number" step="1" value="" />
                <label htmlFor="">Source</label>
                <input className="form-control" type="text" />
            </div>
        </fieldset>
        <fieldset className="data-section">
            <legend
                className="h3 bullet-prefix size"
                data-toggle="collapse"
                data-target="#data-list-size">Size</legend>
            <div id="data-list-size" className="data-list collapse">
                <label htmlFor="">Attic storeys</label>
                <input className="form-control" type="number" step="1" value="0" />
                <label htmlFor="">Core storeys</label>
                <input className="form-control" type="number" step="1" value="3" />
                <label htmlFor="">Basement storeys</label>
                <input className="form-control" type="number" step="1" value="1" />
            </div>
        </fieldset>
        <fieldset className="data-section">
            <legend
                className="h3 bullet-prefix like"
                data-toggle="collapse"
                data-target="#data-list-like">Like Me!</legend>
            <div id="data-list-like" className="data-list collapse">
                <label htmlFor="">Like this building?</label>
                <div className="form-check">
                <input className="form-check-input position-static" type="checkbox" checked />
                </div>
            </div>
        </fieldset>
        <div className="buttons-container">
            <Link to={`/building/${props.id}.html`} className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary">Save</button>
        </div>
    </form>
    </div>
);

export default BuildingEdit;
