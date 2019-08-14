import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Tooltip from '../../components/tooltip';

const LikeDataEntry: React.FunctionComponent<any> = (props) => { // TODO: remove any
    const data_string = JSON.stringify({like: true});
    return (
        <Fragment>
            <dt>
                { props.title }
                { props.tooltip? <Tooltip text={ props.tooltip } /> : null }
                <div className="icon-buttons">
                    <NavLink
                        to={`/multi-edit/${props.cat}.html?data=${data_string}`}
                        className="icon-button copy">
                        Copy
                    </NavLink>
                </div>
            </dt>
            <dd>
                {
                    (props.value != null)?
                        (props.value === 1)?
                            `${props.value} person likes this building`
                            : `${props.value} people like this building`
                        : '\u00A0'
                }
            </dd>
            {
                (props.user_building_like)? <dd>&hellip;including you!</dd> : ''
            }
        </Fragment>
    );
}

LikeDataEntry.propTypes = {
    title: PropTypes.string,
    cat: PropTypes.string,
    tooltip: PropTypes.string,
    value: PropTypes.any,
    user_building_like: PropTypes.bool
}

export default LikeDataEntry;
