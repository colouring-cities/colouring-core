import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Tooltip from '../../components/tooltip';

const LikeDataEntry: React.FunctionComponent<any> = (props) => { // TODO: remove any
    const data_string = JSON.stringify({like: true});
    return (
        <Fragment>
            <div className="data-title">
                <Tooltip text="People who like the building and think it contributes to the city." />
                <div className="icon-buttons">
                    <NavLink
                        to={`/multi-edit/like?data=${data_string}`}
                        className="icon-button like">
                        Like more
                    </NavLink>
                </div>
                <label>Number of likes</label>
            </div>
            <p>
                {
                    (props.value != null)?
                        (props.value === 1)?
                            `${props.value} person likes this building`
                            : `${props.value} people like this building`
                        : "0 people like this building so far - you could be the first!"
                }
            </p>
            <label className="form-check-label">
                <input className="form-check-input" type="checkbox"
                    name="like"
                    checked={!!props.building_like}
                    disabled={props.mode === 'view'}
                    onChange={props.onLike}
                />
                I like this building and think it contributes to the city!
            </label>
        </Fragment>
    );
}

LikeDataEntry.propTypes = {
    value: PropTypes.any,
    user_building_like: PropTypes.bool
}

export default LikeDataEntry;
