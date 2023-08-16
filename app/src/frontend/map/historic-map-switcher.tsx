import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const HistoricMapSwitcher: React.FC<{}> = (props) => {
    const { historicMap, historicMapSwitch, darkLightTheme } = useDisplayPreferences();

    return (
        <form className={`historic-map-switcher map-button ${historicMap}-state ${darkLightTheme}`} onSubmit={historicMapSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(historicMap === 'enabled')? 'OS 1890s Historical Map on' : 'OS 1890s Historical Map off'}
            </button>
        </form>
    );
}