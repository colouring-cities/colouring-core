import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const ParcelSwitcher: React.FC<{}> = () => {
    const { parcel, parcelSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`parcel-switcher map-button ${parcel}-state ${darkLightTheme}`} onSubmit={parcelSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(parcel === 'enabled')? 'Parcel overlay (sample) on' : 'Parcel overlay (sample) off'}
            </button>
        </form>
    );
}