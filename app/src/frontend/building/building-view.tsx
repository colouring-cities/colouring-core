import React from 'react';
import { useAuth } from '../auth-context';

import { categoriesConfig, Category } from '../config/categories-config';
import { categoryUiConfig } from '../config/category-ui-config';
import { Building, UserVerified } from '../models/building';
import { BuildingMapTileset } from '../config/tileserver-config';

import BuildingNotFound from './building-not-found';

interface BuildingViewProps {
    cat: Category;
    mode: 'view' | 'edit';
    building?: Building;
    user_verified?: any;
    onBuildingUpdate: (buildingId: number, updatedData: Building) => void;
    onUserVerifiedUpdate: (buildingId: number, updatedData: UserVerified) => void;
    mapColourScale: BuildingMapTileset;
    onMapColourScale: (x: BuildingMapTileset) => void;
    category_id:number;
}

/**
 * Top-level container for building view/edit form
 *
 * @param props
 */
const BuildingView: React.FunctionComponent<BuildingViewProps> = (props) => {
    const { user } = useAuth();
    const DataContainer = categoryUiConfig[props.cat];
    
    const categoryConfig = categoriesConfig[props.cat];

    if(categoryConfig == undefined) {
        return <BuildingNotFound mode="view" />;
    }

    const {
        name,
        aboutUrl,
        intro,
        inactive = false
    } = categoryConfig;

    return <DataContainer
        {...props}
        title={name}
        help={aboutUrl}
        intro={intro}
        inactive={inactive}
        user={user}
        mapColourScale={props.mapColourScale}
        onMapColourScale={props.onMapColourScale}
    />; 
};

export default BuildingView;
