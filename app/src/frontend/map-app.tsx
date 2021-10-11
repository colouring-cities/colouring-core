import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

import { useRevisionId } from './api-data/use-revision';
import { useBuildingData } from './api-data/use-building-data';
import { useUserVerifiedData } from './api-data/use-user-verified-data';
import { useUrlBuildingParam } from './nav/use-url-building-param';
import { useUrlCategoryParam } from './nav/use-url-category-param';
import { useUrlModeParam } from './nav/use-url-mode-param';
import BuildingView from './building/building-view';
import Categories from './building/categories';
import { EditHistory } from './building/edit-history/edit-history';
import MultiEdit from './building/multi-edit';
import Sidebar from './building/sidebar';
import { Building, UserVerified } from './models/building';
import Welcome from './pages/welcome';
import { PrivateRoute } from './route';
import { useLastNotEmpty } from './hooks/use-last-not-empty';
import { Category } from './config/categories-config';
import { defaultMapCategory } from './config/category-maps-config';
import { useMultiEditData } from './hooks/use-multi-edit-data';
import { useAuth } from './auth-context';
import { sendBuildingUpdate } from './api-data/building-update';

/**
 * Load and render ColouringMap component on client-side only.
 * This is because leaflet and react-leaflet currently don't work on the server
 * (leaflet assumes the presence of browser-specific global `window` variable).
 * 
 * The previous solution involved installing react-leaflet-universal,
 * but that doesn't work with latest react-leaflet.
 * 
 * The limitation is that ColouringMap needs to be the single entry point in the whole app
 * to all modules that import leaflet or react-leaflet.
 */
const ColouringMap = loadable(
    async () => (await import('./map/map')).ColouringMap,
    { ssr: false }  
);

interface MapAppProps {
    building?: Building;
    revisionId?: string;
    user_verified?: object;
}

/** Returns first argument, unless it's equal to the second argument - then returns undefined */
function unless<V extends string, U extends V>(value: V, unlessValue: U): Exclude<V, U> {
    return value === unlessValue ? undefined : value as Exclude<V, U>;
}

/** Returns the new value, unless it is equal to the current value - then returns undefined */
function setOrToggle<T>(currentValue: T, newValue: T): T {
    if(newValue == undefined || newValue === currentValue){
        return undefined;
    } else {
        return newValue;
    }
}

export const MapApp: React.FC<MapAppProps> = props => {
    const { user } = useAuth();
    const [categoryUrlParam] = useUrlCategoryParam();

    const [currentCategory, setCategory] = useState<Category>();
    useEffect(() => setCategory(unless(categoryUrlParam, 'categories')), [categoryUrlParam]);
    
    const displayCategory = useLastNotEmpty(currentCategory) ?? defaultMapCategory;
    
    const [selectedBuildingId, setSelectedBuildingId] = useUrlBuildingParam('view', displayCategory);
    
    const [building, updateBuilding, reloadBuilding] = useBuildingData(selectedBuildingId, props.building, user != undefined);
    const [userVerified, updateUserVerified, reloadUserVerified] = useUserVerifiedData(selectedBuildingId, props.user_verified);
    
    const [revisionId, updateRevisionId] = useRevisionId(props.revisionId);
    useEffect(() => {
        updateRevisionId(building?.revision_id)
    }, [building]);
    
    const [mode] = useUrlModeParam();
    const viewEditMode = unless(mode, 'multi-edit');
    
    const [multiEditData, multiEditError] = useMultiEditData();

    const selectBuilding = useCallback((selectedBuilding: Building) => {
        const currentId = selectedBuildingId;
        updateBuilding(selectedBuilding);
        setSelectedBuildingId(setOrToggle(currentId, selectedBuilding?.building_id));
    }, [selectedBuildingId, setSelectedBuildingId, updateBuilding, building]);

    const colourBuilding = useCallback(async (building: Building) => {
        const buildingId = building?.building_id;

        if(buildingId != undefined && multiEditError == undefined) {
            try {
                const updatedBuilding = await sendBuildingUpdate(buildingId, multiEditData);
                updateRevisionId(updatedBuilding.revision_id);
            } catch(error) {
                console.error({ error });
            }
        }
    }, [multiEditError, multiEditData, currentCategory]);

    const handleBuildingUpdate = useCallback((buildingId: number, updatedData: Building) => {
        // only update current building data if the IDs match
        if(buildingId === selectedBuildingId) {
            updateBuilding(Object.assign({}, building, updatedData));
        } else {
            // otherwise, still update the latest revision ID
            updateRevisionId(updatedData.revision_id);
        }
    }, [selectedBuildingId, building, updateBuilding, updateRevisionId]);

    const handleUserVerifiedUpdate = useCallback((buildingId: number, updatedData: UserVerified) => {
        // only update current building data if the IDs match
        if(buildingId === selectedBuildingId) {
            updateUserVerified(Object.assign({}, userVerified, updatedData)); // quickly show added verifications
            reloadBuilding();
            reloadUserVerified(); // but still reload from server to reflect removed verifications
        }
    }, [selectedBuildingId, updateUserVerified, reloadBuilding, userVerified]);

    return (
        <>
            <PrivateRoute path="/:mode(edit|multi-edit)" /> {/* empty private route to ensure auth for editing */}
            <Sidebar>
                <Switch>
                    <Route exact path="/">
                        <Welcome />
                    </Route>
                    <Route exact path="/multi-edit/:cat">
                        <MultiEdit category={displayCategory} />
                    </Route>
                    <Route path="/:mode/:cat">
                        <Categories mode={mode || 'view'} building_id={selectedBuildingId} />
                        <Switch>
                            <Route exact path="/:mode/:cat/:building/history">
                                <EditHistory building={building} />
                            </Route>
                            <Route exact path="/:mode/:cat/:building?">
                                <BuildingView
                                    mode={viewEditMode}
                                    cat={displayCategory}
                                    building={building}
                                    user_verified={userVerified ?? {}}
                                    onBuildingUpdate={handleBuildingUpdate}
                                    onUserVerifiedUpdate={handleUserVerifiedUpdate}
                                />
                            </Route>
                        </Switch>
                    </Route>
                    <Route exact path="/:mode(view|edit|multi-edit)"
                        render={props => (<Redirect to={`/${props.match.params.mode}/categories`} />)}
                    />
                </Switch>
            </Sidebar>
            <ColouringMap
                selectedBuildingId={selectedBuildingId}
                mode={mode || 'basic'}
                category={displayCategory}
                revisionId={revisionId}
                onBuildingAction={mode === 'multi-edit' ? colourBuilding : selectBuilding}
            />
        </>
    );
};
