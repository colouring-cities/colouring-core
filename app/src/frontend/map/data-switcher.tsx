import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

interface DataLayerSwitcherProps {
}

const DataLayerSwitcher: React.FC<DataLayerSwitcherProps> = (props) => {
    const { showLayerSelection, showOverlayList, resetLayersAndHideTheirList, darkLightTheme } = useDisplayPreferences();
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (showLayerSelection === 'enabled') {
            resetLayersAndHideTheirList(evt)
        } else {
            showOverlayList(evt)
        }
    }
    return (
        <form className={`map-button ${darkLightTheme}`} onSubmit={handleSubmit}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(showLayerSelection === 'enabled')? 'Clear layer options' : 'Show layer options'}
            </button>
        </form>
    );
}

export default DataLayerSwitcher;
