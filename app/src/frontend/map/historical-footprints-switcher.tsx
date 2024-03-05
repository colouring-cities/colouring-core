import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const HistoricalFootprintsSwitcher: React.FC<{}> = () => {
    const { historicalFootprints, historicalFootprintsSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`historical-footprints-switcher map-button ${historicalFootprints}-state ${darkLightTheme}`} onSubmit={historicalFootprintsSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(historicalFootprints === 'enabled')? 'Historical footprints on' : 'Historical footprints off'}
            </button>
        </form>
    );
}