import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { BackIcon, EditIcon, ViewIcon }from '../components/icons';


const ContainerHeader: React.FunctionComponent<any> = (props) => (
    <header className={`section-header view ${props.cat} background-${props.cat}`}>
        <Link className="icon-button back" to={`/${props.mode}/categories${props.building != undefined ? `/${props.building.building_id}` : ''}`}>
            <BackIcon />
        </Link>
        <h2 className="h2">{props.title}</h2>
        <nav className="icon-buttons">
            {
                props.building != undefined && !props.inactive ?
                    props.copy.copying?
                        <Fragment>
                            <NavLink
                                to={`/multi-edit/${props.cat}?data=${props.data_string}`}
                                className="icon-button copy">
                                Copy selected
                            </NavLink>
                            <a
                                className="icon-button copy"
                                onClick={props.copy.toggleCopying}>
                                Cancel
                            </a>
                        </Fragment>
                    :
                        <a
                            className="icon-button copy"
                            onClick={props.copy.toggleCopying}>
                            Copy
                        </a>
                : null
            }
            {
                props.help && !props.copy.copying?
                    <a
                        className="icon-button help"
                        title="Find out more"
                        href={props.help}>
                        Info
                    </a>
                : null
            }
            {
                props.building != undefined && !props.inactive && !props.copy.copying?
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
                : null
            }
        </nav>
    </header>
)

export default ContainerHeader;
