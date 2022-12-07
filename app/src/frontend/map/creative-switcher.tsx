import React from 'react';

import './creative-switcher.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const CreativeSwitcher: React.FC<{}> = () => {
    const { creative, creativeSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`creative-switcher ${darkLightTheme}`} onSubmit={creativeSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(creative === 'enabled')? 'Switch off Creative Enterprise Zones' : 'Switch on Creative Enterprise Zones'}
            </button>
        </form>
    );
}
