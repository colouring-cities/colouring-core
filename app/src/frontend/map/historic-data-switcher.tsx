import React from 'react';

import './historic-data-switcher.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const HistoricDataSwitcher: React.FC<{}> = (props) => {
    const { historicData, historicDataSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`historic-data-switcher ${darkLightTheme}`} onSubmit={historicDataSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(historicData === 'enabled')? 'Switch off the OS 1890s Historical Map' : 'Switch on the OS 1890s Historical Map'}
            </button>
        </form>
    );
}