import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Sidebar from './sidebar';

const Categories = (props) => (
    <Sidebar>
        <Category
            title="Location"
            slug="location"
            help="https://pages.colouring.london/location"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Land Use"
            slug="use"
            help="https://pages.colouring.london/use"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Type"
            slug="type"
            help="https://pages.colouring.london/buildingtypology"
            inactive={true}
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
            title="Sustainability"
            slug="sustainability"
            help="https://pages.colouring.london/sustainability"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Greenery"
            slug="greenery"
            help="https://pages.colouring.london/greenery"
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
        <Category
            title="Planning"
            slug="planning"
            help="https://pages.colouring.london/planning"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Like Me!"
            slug="like"
            help="https://pages.colouring.london/likeme"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
    </Sidebar>
)

Categories.propTypes = {
    mode: PropTypes.string,
    building_id: PropTypes.number
}

const Category = (props) => (
    <section className={(props.inactive? 'inactive ': '') + 'data-section legend'}>
        <header className={`section-header ${props.mode} ${props.slug}`}>
            <NavLink
                to={`/${props.mode}/${props.slug}/building/${props.building_id}.html`}
                title={
                    (props.inactive)?
                        'Coming soon… Click the ? for more info.'
                        : 'Show on map'
                }>
                <h3 className="h3">{props.title}</h3>
            </NavLink>
            <nav className="icon-buttons">
                {
                    props.help?
                        <a className="icon-button help" href={props.help}>
                        Info
                        </a>
                        : null
                }
            </nav>
        </header>
    </section>
)

Category.propTypes = {
    title: PropTypes.string,
    slug: PropTypes.string,
    help: PropTypes.string,
    inactive: PropTypes.bool,
    mode: PropTypes.string,
    building_id: PropTypes.number
}

export default Categories;
