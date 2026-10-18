import React from 'react';

import { CategoryLink } from './category-link';
import { ListWrapper } from '../components/list-wrapper';

import './categories.css';
import { categoriesOrder, categoriesConfig } from '../config/categories-config';

interface CategoriesProps {
    mode: 'view' | 'edit' | 'multi-edit';
    building_id?: number;
}

const Categories: React.FC<CategoriesProps> = (props) => (
    <ListWrapper className='data-category-list'>
        {categoriesOrder.map(category => {
            const {
                name,
                slug,
                aboutUrl
            } = categoriesConfig[category];

            return <CategoryLink
                key={category}
                title={name}
                slug={slug}
                help={aboutUrl}
                mode={props.mode}
                building_id={props.building_id}
            />
        })}
    </ListWrapper>
);

export default Categories;
