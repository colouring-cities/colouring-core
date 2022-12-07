import React from 'react';

import './housing-switcher.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const HousingSwitcher: React.FC<{}> = () => {
    const { housing, housingSwitch, darkLightTheme } = useDisplayPreferences();
    return (
    <form className={`housing-switcher ${darkLightTheme}`} onSubmit={housingSwitch}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            {(housing === 'enabled')? 'Switch off Housing Zones' : 'Switch on Housing Zones'}
        </button>
    </form>
    );
}
