import React from 'react';

import './category-edit-summary.css';

import { FieldEditSummary } from './field-edit-summary';

interface CategoryEditSummaryProps {
    category: string;
    fields: {
        title: string;
        value: string;
        oldValue: string;
    }[];
}

const CategoryEditSummary : React.FunctionComponent<CategoryEditSummaryProps> = props => (
    <div className='edit-history-category-summary'>
        <h3 className='edit-history-category-title'>{props.category}:</h3>
        <ul>
        {
            props.fields.map(x => 
                <li key={x.title}>
                    <FieldEditSummary title={x.title} value={x.value} oldValue={x.oldValue} />
                </li>)
        }
        </ul>
    </div>
);

export {
    CategoryEditSummary
};
