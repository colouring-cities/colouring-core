import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const CreativeSwitcher: React.FC<{}> = () => {
    const { creative, creativeSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`map-button ${creative}-state ${darkLightTheme}`} onSubmit={creativeSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(creative === 'enabled')? 'Enterprise Zones [on]' : 'Creative Enterprise Zones [off]'}
            </button>
        </form>
    );
}
