import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';
import { t } from 'i18next';

export const FloodSwitcher: React.FC<{}> = () => {
    const { flood, floodSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`flood-switcher map-button ${flood}-state ${darkLightTheme}`} onSubmit={floodSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(flood === 'enabled')? t('Flood Zones on') : t('Flood Zones off')}
            </button>
        </form>
    );
}
