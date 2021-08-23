import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { buildingUserFields, dataFields } from '../../config/data-fields-config';
import { CopyProps } from '../data-containers/category-view-props';
import { DataTitleCopyable } from './data-title';


interface LikeDataEntryProps {
    mode: 'view' | 'edit' | 'multi-edit';
    userValue: boolean;
    aggregateValue: number;
    copy: CopyProps;
    onChange: (key: string, value: boolean) => void;
}

const LikeDataEntry: React.FunctionComponent<LikeDataEntryProps> = (props) => {
    const fieldName = 'community_like';

    return (
        <>
        <DataTitleCopyable
            slug={fieldName}
            title={buildingUserFields.community_like.title}
            copy={props.copy}
        />
            <label className="form-check-label">
                <input className="form-check-input" type="checkbox"
                    name="like"
                    checked={!!props.userValue}
                    disabled={props.mode === 'view'}
                    onChange={e => props.onChange(fieldName, e.target.checked)}
                /> Yes
            </label>
            <p>
                {
                    (props.aggregateValue != null)?
                        (props.aggregateValue === 1)?
                            `${props.aggregateValue} person likes this building`
                            : `${props.aggregateValue} people like this building`
                        : "0 people like this building so far - you could be the first!"
                }
            </p>
        </>
    );
};

export default LikeDataEntry;
