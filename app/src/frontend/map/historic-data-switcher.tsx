import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const HistoricDataSwitcher: React.FC<{}> = (props) => {
    const { historicData, historicDataSwitch, darkLightTheme } = useDisplayPreferences();
    
    return (
        <form className={`map-button ${historicData}-state ${darkLightTheme}`} onSubmit={historicDataSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(historicData === 'enabled')? 'OS 1890s Map + Modern Footprints on' : 'OS 1890s Map + Modern Footprints off'}
            </button>
        </form>
    );
}