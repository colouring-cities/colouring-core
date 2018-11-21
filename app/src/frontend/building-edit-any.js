
import React from 'react';
import Sidebar from './sidebar';
import InfoBox from './info-box';
import { Redirect } from 'react-router-dom';

const BuildingEditAny = (props) => {
    if (!props.user){
        return <Redirect to="/sign-up.html" />
    }
    return (
        <Sidebar title="Edit data">
            <InfoBox msg="Select a building to edit by clicking on the map&hellip;" />
        </Sidebar>
    );
}
export default BuildingEditAny;
