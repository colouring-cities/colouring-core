import React from 'react';
import { NavLink } from 'react-router-dom';

import { EditIcon, ViewIcon } from '../../components/icons';
import { Building } from '../../models/building';

import {t} from'i18next';

interface ViewEditControlProps {
    cat: string;
    mode: 'view' | 'edit';
    building: Building;
}

const ViewEditControl: React.FC<ViewEditControlProps> = props => (
    (props.mode === 'edit')?
                        <NavLink
                            className="icon-button view"
                            title={t("View data")}
                            to={`/view/${props.cat}/${props.building.building_id}`}>
                            {t("View")}
                            <ViewIcon />
                        </NavLink>
                        : <NavLink
                            className="icon-button edit"
                            title={t("Edit data")}
                            to={`/edit/${props.cat}/${props.building.building_id}`}>
                            {t("Edit")}
                            <EditIcon />
                        </NavLink>
);

export {
    ViewEditControl
};
