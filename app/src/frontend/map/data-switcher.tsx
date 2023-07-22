import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';
import { t } from 'i18next';

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
        <form className={`data-switcher map-button ${darkLightTheme}`} onSubmit={handleSubmit}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(showLayerSelection === 'enabled')? t('Clear layer options') : t('Show layer options')}
            </button>
        </form>
    );
}

export default DataLayerSwitcher;
