import React from 'react';
import { NavLink } from 'react-router-dom';

import './category-link.css';

interface CategoryLinkProps {
    mode: 'view' | 'edit' | 'multi-edit';
    building_id?: number;
    slug: string;
    title: string;
    help: string;
    inactive: boolean;
    color: string;
    category_id?:number;
    onClick: () => void;
}

const CategoryLink: React.FC<CategoryLinkProps> = (props) => {
    let categoryLink = `/${props.category_id}/${props.mode}/${props.slug}`;
    if (props.building_id != undefined) categoryLink += `/${props.building_id}`;

    let className = "category-title";
 console.log("CategoryLink")
 console.log(categoryLink)
 console.log(props.category_id)
    return (
        <NavLink
            className={`category-link background-${props.slug}`}
            to={categoryLink}
            style={{
                backgroundColor: props.color, // Apply the color dynamically
            }}
            title={
                (props.inactive)?
                    'Coming soon… Click more info for details.'
                    : 'View/Edit Map'
            }
            onClick={props.onClick}>
                <h3 className={className}>{props.title}</h3>
        </NavLink>
    );
};

export { CategoryLink };