import { Category } from './categories-config';

import AgeContainer from '../building/data-containers/age-history';
import CommunityContainer from '../building/data-containers/community';
import ConstructionContainer from '../building/data-containers/construction';
import ResilienceContainer from '../building/data-containers/resilience';
import LocationContainer from '../building/data-containers/location';
import PlanningContainer from '../building/data-containers/planning';
import SizeContainer from '../building/data-containers/size';
import StreetscapeContainer from '../building/data-containers/street-context';
import SustainabilityContainer from '../building/data-containers/energy-performance';
import TeamContainer from '../building/data-containers/team';
import TypeContainer from '../building/data-containers/typology';
import UseContainer from '../building/data-containers/land-use';

import { DataContainerType } from '../building/data-container';

export const categoryUiConfig: {[key in Category]: DataContainerType} = {
    [Category.Location]: LocationContainer,
    [Category.LandUse]: UseContainer,
    [Category.Typology]: TypeContainer,
    [Category.Age]: AgeContainer,
    [Category.Size]: SizeContainer,
    [Category.Construction]: ConstructionContainer,
    [Category.StreetContext]: StreetscapeContainer,
    [Category.Team]: TeamContainer,
    [Category.Planning]: PlanningContainer,
    [Category.EnergyPerformance]: SustainabilityContainer,
    [Category.Resilience]: ResilienceContainer,
    [Category.Community]: CommunityContainer,
};

