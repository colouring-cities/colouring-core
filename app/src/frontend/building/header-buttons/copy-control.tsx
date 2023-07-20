import React from 'react';
import { NavLink } from 'react-router-dom';

import {t} from'i18next';

interface CopyControlProps {
    cat: string;
    data_string: string;
    copying: boolean;
    toggleCopying: () => void;
}

const CopyControl: React.FC<CopyControlProps> = props => (
    props.copying ?
        <>
            <NavLink
                to={`/multi-edit/${props.cat}?data=${props.data_string}`}
                className="icon-button copy">
                {t("Copy selected")}
            </NavLink>
            <a
                className="icon-button copy"
                onClick={props.toggleCopying}>
                {t("Cancel")}
            </a>
        </>
        :
        <a
            className="icon-button copy"
            onClick={props.toggleCopying}>
            {t("Copy")}
        </a>
);

export {
    CopyControl
};
