import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import InfoBox from '../components/info-box';


interface BuildingNotFoundProps {
  mode: string;
}

const BuildingNotFound: React.FunctionComponent<BuildingNotFoundProps> = (props) => (
  <Fragment>
    <InfoBox msg="We can't find that one anywhere - try the map again?" />
    <div className="buttons-container ml-3 mr-3">
        <Link to={`/${props.mode}/categories`} className="btn btn-secondary">Back to categories</Link>
    </div>
  </Fragment>
);

export default BuildingNotFound;
