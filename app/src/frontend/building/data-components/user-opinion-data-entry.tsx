import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { AggregationDescriptionConfig, buildingUserFields, dataFields } from '../../config/data-fields-config';
import { CopyProps } from '../data-containers/category-view-props';
import { DataTitleCopyable } from './data-title';


interface UserOpinionEntryProps {
    slug: string;
    title: string;
    mode: 'view' | 'edit' | 'multi-edit';
    userValue: boolean;
    aggregateValue: number;
    aggregationDescriptions: AggregationDescriptionConfig;
    copy: CopyProps;
    onChange: (key: string, value: boolean) => void;
}

const UserOpinionEntry: React.FunctionComponent<UserOpinionEntryProps> = (props) => {

    return (
        <>
        <DataTitleCopyable
            slug={props.slug}
            title={props.title}
            copy={props.copy}
        />
            <label className="form-check-label">
                <input className="form-check-input" type="checkbox"
                    name={props.slug}
                    checked={!!props.userValue}
                    disabled={props.mode === 'view'}
                    onChange={e => props.onChange(props.slug, e.target.checked)}
                /> Yes
            </label>
            <p>
                {
                    (props.aggregateValue)?
                        (props.aggregateValue === 1)?
                            `1 person ${props.aggregationDescriptions.one}`
                            : `${props.aggregateValue} people ${props.aggregationDescriptions.many}`
                        : `0 people ${props.aggregationDescriptions.zero}`
                }
            </p>
        </>
    );
};

export default UserOpinionEntry;
