import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Sidebar from './sidebar';
import InfoBox from '../components/info-box';


interface BuildingNotFoundProps {
  mode: string
}

const BuildingNotFound: React.FunctionComponent<BuildingNotFoundProps> = (props) => (
  <Sidebar>
    <InfoBox msg="We can't find that one anywhere - try the map again?" />
    <div className="buttons-container ml-3 mr-3">
        <Link to={`/${props.mode}/categories.html`} className="btn btn-secondary">Back to categories</Link>
    </div>
  </Sidebar>
);

BuildingNotFound.propTypes = {
  mode: PropTypes.string
}

export default BuildingNotFound;
