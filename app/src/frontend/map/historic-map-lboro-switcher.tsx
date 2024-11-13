import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const HistoricMapLboroSwitcher: React.FC<{}> = (props) => {
    const { historicMapLboro, historicMapLboroSwitch, darkLightTheme } = useDisplayPreferences();

    return (
        <form className={`historic-map-switcher map-button ${historicMapLboro}-state ${darkLightTheme}`} onSubmit={historicMapLboroSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(historicMapLboro === 'enabled')? 'Leicestershire Historical Map on' : 'Leicestershire Historical Map off'}
            </button>
        </form>
    );
}