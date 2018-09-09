import React from 'react';

const BuildingView = () => (
    <div id="legend" class="info-container">
        <h2 class="h2">Building data</h2>
        <section class="data-section">
            <h3 class="h3 bullet-prefix location toggled-on"
                data-toggle="collapse"
                data-target="#data-list-location">
                Location
            </h3>
            <p class="data-intro">

                Section introduction of up to roughly 100 characters will take
                approx&shy;imately this much space.

                <a href="#">Read more</a>.
            </p>
            <dl id="data-list-location" class="data-list collapse show">
            <dt>
                Building Name

                <span class="tooltip-hook" data-toggle="tooltip">
                    ?
                    <div class="tooltip bs-tooltip-bottom">
                        <div class="arrow"></div>
                        <div class="tooltip-inner">

                        Hint tooltip content should be ~40 chars.

                        </div>
                    </div>
                </span>
            </dt>
            <dd><span class="no-data">no data</span></dd>
            <dt>Building Number</dt>
            <dd><span class="no-data">no data</span></dd>
            <dt>Street</dt>
            <dd><span class="no-data">no data</span></dd>
            <dt>Address line 2</dt>
            <dd><span class="no-data">no data</span></dd>
            <dt>Town</dt>
            <dd><span class="no-data">no data</span></dd>
            <dt>Postcode</dt>
            <dd><span class="no-data">no data</span></dd>
            </dl>
        </section>
        <section class="data-section">
            <h3 class="h3 bullet-prefix age"
                data-toggle="collapse"
                data-target="#data-list-age">Age</h3>
            <dl id="data-list-age" class="data-list collapse">
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
        <section class="data-section">
            <h3 class="h3 bullet-prefix size"
                data-toggle="collapse"
                data-target="#data-list-size">Size</h3>
            <dl id="data-list-size" class="data-list collapse">
            <dt>Attic storeys</dt>
            <dd>0</dd>
            <dt>Core storeys</dt>
            <dd>3</dd>
            <dt>Basement storeys</dt>
            <dd>1</dd>
            </dl>
        </section>
        <section class="data-section">
            <h3 class="h3 bullet-prefix like"
                data-toggle="collapse"
                data-target="#data-list-like">Like Me!</h3>
            <dl id="data-list-like" class="data-list collapse">
            <dt>Likes</dt>
            <dd> 25</dd>
            </dl>
        </section>
        <div class="buttons-container">
            <a href="/maps" class="btn btn-secondary">Back to maps</a>
            <a href="/building/id/edit" class="btn btn-primary">Edit data</a>
        </div>
    </div>
);

export default BuildingView;
