import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import Tooltip from '../../components/tooltip';
import { Category } from '../../config/categories-config';


interface LikeDataEntryProps {
    mode: 'view' | 'edit' | 'multi-edit';
    userLike: boolean;
    totalLikes: number;
    onLike: (userLike: boolean) => void;
}

const LikeDataEntry: React.FunctionComponent<LikeDataEntryProps> = (props) => {
    const data_string = JSON.stringify({like: true});
    return (
        <>
            <div className="data-title">
                <div className="data-title-actions icon-buttons">
                    <NavLink
                        to={`/multi-edit/${Category.Community}?data=${data_string}`}
                        className="icon-button like">
                        Like more
                    </NavLink>
                    <Tooltip text="People who like the building and think it contributes to the city." />
                </div>
                <label>Like</label>
            </div>
            <label className="form-check-label">
                <input className="form-check-input" type="checkbox"
                    name="like"
                    checked={!!props.userLike}
                    disabled={props.mode === 'view'}
                    onChange={e => props.onLike(e.target.checked)}
                />
                 I like this building and think it contributes to the city
            </label>
            <p>
                {
                    (props.totalLikes != null)?
                        (props.totalLikes === 1)?
                            `${props.totalLikes} person likes this building`
                            : `${props.totalLikes} people like this building`
                        : "0 people like this building so far - you could be the first!"
                }
            </p>
        </>
    );
};

export default LikeDataEntry;
