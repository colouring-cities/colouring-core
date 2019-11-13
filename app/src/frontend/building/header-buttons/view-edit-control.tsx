import React from 'react';
import { NavLink } from 'react-router-dom';

import { EditIcon, ViewIcon } from '../../components/icons';
import { Building } from '../../models/building';

interface ViewEditControlProps {
    cat: string;
    mode: 'view' | 'edit';
    building: Building;
}

const ViewEditControl: React.FC<ViewEditControlProps> = props => (
    (props.mode === 'edit')?
                        <NavLink
                            className="icon-button view"
                            title="View data"
                            to={`/view/${props.cat}/${props.building.building_id}`}>
                            View
                            <ViewIcon />
                        </NavLink>
                        : <NavLink
                            className="icon-button edit"
                            title="Edit data"
                            to={`/edit/${props.cat}/${props.building.building_id}`}>
                            Edit
                            <EditIcon />
                        </NavLink>
);

export {
    ViewEditControl
};
