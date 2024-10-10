import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const OpenStreetMapSwitcher: React.FC<{}> = () => {
    const { openStreetMap, openStreetMapSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`map-button ${openStreetMap}-state ${darkLightTheme}`} onSubmit={openStreetMapSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(openStreetMap === 'enabled')? 'OpenStreetMap on' : 'OpenStreetMap off'}
            </button>
        </form>
    );
}
