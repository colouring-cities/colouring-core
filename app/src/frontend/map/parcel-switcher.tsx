import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';
import { t } from 'i18next';

export const ParcelSwitcher: React.FC<{}> = () => {
    const { parcel, parcelSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`parcel-switcher map-button ${parcel}-state ${darkLightTheme}`} onSubmit={parcelSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(parcel === 'enabled')? t('Parcel overlay (sample) on') : t('Parcel overlay (sample) off')}
            </button>
        </form>
    );
}