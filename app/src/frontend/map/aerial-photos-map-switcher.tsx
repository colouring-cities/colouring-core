import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const AerialPhotosMapSwitcher: React.FC<{}> = (props) => {
    const { aerialPhotosMap, aerialPhotosMapSwitch, darkLightTheme } = useDisplayPreferences();

    return (
        <form className={`map-button ${aerialPhotosMap}-state ${darkLightTheme}`} onSubmit={aerialPhotosMapSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(aerialPhotosMap === 'enabled')? '1940s Aerial Photos on' : '1940s Aerial Photos off'}
            </button>
        </form>
    );
}