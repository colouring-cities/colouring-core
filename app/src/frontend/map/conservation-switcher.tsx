import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const ConservationAreaSwitcher: React.FC<{}> = (props) => {
    const { conservation, conservationSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`conservation-switcher map-button ${conservation}-state ${darkLightTheme}`} onSubmit={conservationSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(conservation === 'enabled')? 'Conservation Areas on' : 'Conservation Areas off'}
            </button>
        </form>
    );
}