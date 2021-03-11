import { Category } from './categories-config';

import AgeContainer from '../building/data-containers/age';
import CommunityContainer from '../building/data-containers/community';
import ConstructionContainer from '../building/data-containers/construction';
import DynamicsContainer from '../building/data-containers/dynamics/dynamics';
import LocationContainer from '../building/data-containers/location';
import PlanningContainer from '../building/data-containers/planning';
import SizeContainer from '../building/data-containers/size';
import StreetscapeContainer from '../building/data-containers/streetscape';
import SustainabilityContainer from '../building/data-containers/sustainability';
import TeamContainer from '../building/data-containers/team';
import TypeContainer from '../building/data-containers/type';
import UseContainer from '../building/data-containers/use';

import { DataContainerType } from '../building/data-container';

export const categoryUiConfig: {[key in Category]: DataContainerType} = {
    [Category.Location]: LocationContainer,
    [Category.LandUse]: UseContainer,
    [Category.Type]: TypeContainer,
    [Category.Age]: AgeContainer,
    [Category.Size]: SizeContainer,
    [Category.Construction]: ConstructionContainer,
    [Category.Streetscape]: StreetscapeContainer,
    [Category.Team]: TeamContainer,
    [Category.Planning]: PlanningContainer,
    [Category.Sustainability]: SustainabilityContainer,
    [Category.Dynamics]: DynamicsContainer,
    [Category.Community]: CommunityContainer,
};

