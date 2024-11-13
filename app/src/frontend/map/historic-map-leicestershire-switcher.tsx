import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const HistoricMapLeicestershireSwitcher: React.FC<{}> = (props) => {
    const { historicMapLeicestershire, historicMapLeicestershireSwitch, darkLightTheme } = useDisplayPreferences();

    return (
        <form className={`historic-map-switcher map-button ${historicMapLeicestershire}-state ${darkLightTheme}`} onSubmit={historicMapLeicestershireSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(historicMapLeicestershire === 'enabled')? 'OS Leicestershire 1900s Map on' : 'OS Leicestershire 1900s Map off'}
            </button>
        </form>
    );
}