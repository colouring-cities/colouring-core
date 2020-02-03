import React from 'react';

import { Building } from '../models/building';

import BuildingNotFound from './building-not-found';
import AgeContainer from './data-containers/age';
import CommunityContainer from './data-containers/community';
import ConstructionContainer from './data-containers/construction';
import DynamicsContainer from './data-containers/dynamics';
import LocationContainer from './data-containers/location';
import PlanningContainer from './data-containers/planning';
import SizeContainer from './data-containers/size';
import StreetscapeContainer from './data-containers/streetscape';
import SustainabilityContainer from './data-containers/sustainability';
import TeamContainer from './data-containers/team';
import TypeContainer from './data-containers/type';
import UseContainer from './data-containers/use';


interface BuildingViewProps {
    cat: string;
    mode: 'view' | 'edit';
    building?: Building;
    building_like?: boolean;
    user?: any;
    selectBuilding: (building: Building) => void;
}

/**
 * Top-level container for building view/edit form
 *
 * @param props
 */
const BuildingView: React.FunctionComponent<BuildingViewProps> = (props) => {
    switch (props.cat) {
        case 'location':
            return <LocationContainer
                {...props}
                title="Location"
                help="https://pages.colouring.london/location"
                intro="Where are the buildings? Address, location and cross-references."
            />;
        case 'use':
            return <UseContainer
                {...props}
                inactive={false}
                title="Current Use"
                intro="How are buildings used, and how does use change over time? Coming soon…"
                help="https://pages.colouring.london/use"
            />;
        case 'type':
            return <TypeContainer
                {...props}
                inactive={false}
                title="Original Use"
                intro="How were buildings previously used?"
                help="https://www.pages.colouring.london/buildingtypology"
            />;
        case 'age':
            return <AgeContainer
                {...props}
                title="Age"
                help="https://pages.colouring.london/age"
                intro="Building age data can support energy analysis and help predict long-term change."
            />;
        case 'size':
            return <SizeContainer
                {...props}
                title="Size &amp; Shape"
                intro="How big are buildings?"
                help="https://pages.colouring.london/shapeandsize"
            />;
        case 'construction':
            return <ConstructionContainer
                {...props}
                title="Construction"
                intro="How are buildings built? Coming soon…"
                help="https://pages.colouring.london/construction"
                inactive={true}
            />;
        case 'team':
            return <TeamContainer
                {...props}
                title="Team"
                intro="Who built the buildings? Coming soon…"
                help="https://pages.colouring.london/team"
                inactive={true}
            />;
        case 'sustainability':
            return <SustainabilityContainer
                {...props}
                title="Sustainability"
                intro="Are buildings energy efficient?"
                help="https://pages.colouring.london/sustainability"
                inactive={false}
            />;
        case 'streetscape':
            return <StreetscapeContainer
                {...props}
                title="Streetscape"
                intro="What's the building's context? Coming soon…"
                help="https://pages.colouring.london/streetscape"
                inactive={true}
            />;
        case 'community':
            return <CommunityContainer
                {...props}
                title="Community"
                intro="How does this building work for the local community?"
                help="https://pages.colouring.london/community"
            />;
        case 'planning':
            return <PlanningContainer
                {...props}
                title="Planning"
                intro="Planning controls relating to protection and reuse."
                help="https://pages.colouring.london/planning"
            />;
        case 'dynamics':
            return <DynamicsContainer
                {...props}
                title="Dynamics"
                intro="How has the site of this building changed over time?"
                help="https://pages.colouring.london/buildingcategories"
                inactive={true}
            />;
        default:
            return <BuildingNotFound mode="view" />;
    }
};

export default BuildingView;
