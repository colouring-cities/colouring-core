import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const EditableBuildingsSwitcher: React.FC<{}> = () => {
    const { editableBuildings, editableBuildingsSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`map-button ${editableBuildings}-state ${darkLightTheme}`} onSubmit={editableBuildingsSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(editableBuildings === 'enabled')? 'Editable Buildings on' : 'Editable Buildings off'}
            </button>
        </form>
    );
}
