import React from 'react';

import './parcel-switcher.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const ParcelSwitcher: React.FC<{}> = () => {
    const { parcel, parcelSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`parcel-switcher ${darkLightTheme}`} onSubmit={parcelSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(parcel === 'enabled')? 'Switch off Parcel (sample) overlay' : 'Switch on Parcel (sample) overlay'}
            </button>
        </form>
    );
}