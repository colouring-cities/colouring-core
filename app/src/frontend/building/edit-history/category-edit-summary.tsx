import React from 'react';
import { Link } from 'react-router-dom';

import './category-edit-summary.css';

import { categories, Category } from '../../data_fields';

import { FieldEditSummary } from './field-edit-summary';

interface CategoryEditSummaryProps {
    category: keyof typeof Category; // https://github.com/microsoft/TypeScript/issues/14106
    fields: {
        title: string;
        value: any;
        oldValue: any;
    }[];
    hyperlinkCategory: boolean;
    hyperlinkTemplate?: string;
}

const CategoryEditSummary : React.FunctionComponent<CategoryEditSummaryProps> = props => {
    const category = Category[props.category];
    const categoryInfo = categories[category] || {name: undefined, slug: undefined};
    const categoryName = categoryInfo.name || 'Unknown category';
    const categorySlug = categoryInfo.slug || 'categories';

    return (
        <div className='edit-history-category-summary'>
            <h3 className='edit-history-category-title'>
                {
                    props.hyperlinkCategory && props.hyperlinkTemplate != undefined ?
                        <Link to={props.hyperlinkTemplate.replace(/\$category/, categorySlug)}>{categoryName}</Link> :
                        categoryName
                }:
            </h3>
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
};

export {
    CategoryEditSummary
};
