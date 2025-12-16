import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const WorldHeritageSitesSwitcher: React.FC<{}> = () => {
    const { worldHeritageSites, worldHeritageSitesSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`map-button ${worldHeritageSites}-state ${darkLightTheme}`} onSubmit={worldHeritageSitesSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(worldHeritageSites === 'enabled')? 'World Heritage Sites [on]' : 'World Heritage Sites [off]'}
            </button>
        </form>
    );
}
