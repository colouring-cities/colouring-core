import React from 'react';

import { CategoryLink } from './category-link';
import { ListWrapper } from '../components/list-wrapper';

import './categories.css';
import { categoriesOrder, categoriesConfig } from '../config/categories-config';
import { useTranslation } from 'react-i18next';

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
                aboutUrl,
                inactive = false
            } = categoriesConfig[category];

            const {t} = useTranslation();
            return <CategoryLink
                key={category}
                title={t(name)}
                slug={slug}
                help={aboutUrl}
                inactive={inactive}
                mode={props.mode}
                building_id={props.building_id}
            />
        })}
    </ListWrapper>
);

export default Categories;
