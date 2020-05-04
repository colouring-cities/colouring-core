import React from 'react';
import { NavLink } from 'react-router-dom';

import './categories.css';

interface CategoriesProps {
    mode: 'view' | 'edit' | 'multi-edit';
    building_id?: number;
}

const Categories: React.FC<CategoriesProps> = (props) => (
    <ol className="data-category-list">
        <Category
            title="Location"
            slug="location"
            help="https://pages.colouring.london/location"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Current Use"
            slug="use"
            help="https://pages.colouring.london/use"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Original Use"
            slug="type"
            help="https://pages.colouring.london/buildingtypology"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Age"
            slug="age"
            help="https://pages.colouring.london/age"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Size &amp; Shape"
            slug="size"
            help="https://pages.colouring.london/shapeandsize"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Construction"
            slug="construction"
            help="https://pages.colouring.london/construction"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Streetscape"
            slug="streetscape"
            help="https://pages.colouring.london/greenery"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Team"
            slug="team"
            help="https://pages.colouring.london/team"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Planning"
            slug="planning"
            help="https://pages.colouring.london/planning"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Sustainability"
            slug="sustainability"
            help="https://pages.colouring.london/sustainability"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Dynamics"
            slug="dynamics"
            help="https://pages.colouring.london/dynamics"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Community"
            slug="community"
            help="https://pages.colouring.london/community"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
    </ol>
);

interface CategoryProps {
    mode: 'view' | 'edit' | 'multi-edit';
    building_id?: number;
    slug: string;
    title: string;
    help: string;
    inactive: boolean;
}

const Category: React.FC<CategoryProps> = (props) => {
    let categoryLink = `/${props.mode}/${props.slug}`;
    if (props.building_id != undefined) categoryLink += `/${props.building_id}`;

    return (
    <li className={`category-block ${props.slug} background-${props.slug}`}>
        <NavLink
            className="category-link"
            to={categoryLink}
            title={
                (props.inactive)?
                    'Coming soon… Click more info for details.'
                    : 'View/Edit Map'
            }>
                <div className="category-title-container">
                    <h3 className="category">{props.title}</h3>
                </div>
        </NavLink>
    </li>
    );
};

export default Categories;
