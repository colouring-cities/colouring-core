import React from 'react';

import BuildingNotFound from './building-not-found';

import LocationContainer from './data-containers/location';
import UseContainer from './data-containers/use';
import TypeContainer from './data-containers/type';
import AgeContainer from './data-containers/age';
import SizeContainer from './data-containers/size';
import ConstructionContainer from './data-containers/construction';
import TeamContainer from './data-containers/team';
import SustainabilityContainer from './data-containers/sustainability';
import StreetscapeContainer from './data-containers/streetscape';
import CommunityContainer from './data-containers/community';
import PlanningContainer from './data-containers/planning';
import LikeContainer from './data-containers/like';

/**
 * Top-level container for building view/edit form
 *
 * @param props
 */
const BuildingView = (props) => {
    switch (props.cat) {
        case 'location':
            return <LocationContainer
                {...props}
                key={props.building && props.building.building_id}
                title="Location"
                help="https://pages.colouring.london/location"
                intro="Where are the buildings? Address, location and cross-references."
            />
        case 'use':
            return <UseContainer
                {...props}
                key={props.building && props.building.building_id}
                inactive={true}
                title="Land Use"
                intro="How are buildings used, and how does use change over time? Coming soon…"
                help="https://pages.colouring.london/use"
            />
        case 'type':
            return <TypeContainer
                {...props}
                key={props.building && props.building.building_id}
                inactive={true}
                title="Type"
                intro="How were buildings previously used? Coming soon…"
                help="https://www.pages.colouring.london/buildingtypology"
            />
        case 'age':
            return <AgeContainer
                {...props}
                key={props.building && props.building.building_id}
                title="Age"
                help="https://pages.colouring.london/age"
                intro="Building age data can support energy analysis and help predict long-term change."
            />
        case 'size':
            return <SizeContainer
                {...props}
                key={props.building && props.building.building_id}
                title="Size &amp; Shape"
                intro="How big are buildings?"
                help="https://pages.colouring.london/shapeandsize"
            />
        case 'construction':
            return <ConstructionContainer
                {...props}
                key={props.building && props.building.building_id}
                title="Construction"
                intro="How are buildings built? Coming soon…"
                help="https://pages.colouring.london/construction"
                inactive={true}
            />
        case 'team':
            return <TeamContainer
                {...props}
                key={props.building && props.building.building_id}
                title="Team"
                intro="Who built the buildings? Coming soon…"
                help="https://pages.colouring.london/team"
                inactive={true}
            />
        case 'sustainability':
            return <SustainabilityContainer
                {...props}
                key={props.building && props.building.building_id}
                title="Sustainability"
                intro="Are buildings energy efficient?"
                help="https://pages.colouring.london/sustainability"
                inactive={false}
            />
        case 'streetscape':
            return <StreetscapeContainer
                {...props}
                key={props.building && props.building.building_id}
                title="Streetscape"
                intro="What's the building's context? Coming soon…"
                help="https://pages.colouring.london/streetscape"
                inactive={true}
            />
        case 'community':
            return <CommunityContainer
                {...props}
                key={props.building && props.building.building_id}
                title="Community"
                intro="How does this building work for the local community?"
                help="https://pages.colouring.london/community"
                inactive={true}
            />
        case 'planning':
            return <PlanningContainer
                {...props}
                key={props.building && props.building.building_id}
                title="Planning"
                intro="Planning controls relating to protection and reuse."
                help="https://pages.colouring.london/planning"
            />
        case 'like':
            return <LikeContainer
                {...props}
                key={props.building && props.building.building_id}
                title="Like Me!"
                intro="Do you like the building and think it contributes to the city?"
                help="https://pages.colouring.london/likeme"
            />
        default:
            return <BuildingNotFound mode="view" />
    }
}

export default BuildingView;
