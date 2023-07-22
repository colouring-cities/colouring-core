import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';
import { t } from 'i18next';

export const HousingSwitcher: React.FC<{}> = () => {
    const { housing, housingSwitch, darkLightTheme } = useDisplayPreferences();
    return (
    <form className={`housing-switcher map-button ${housing}-state ${darkLightTheme}`} onSubmit={housingSwitch}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            {(housing === 'enabled')? t('Housing Zones on') : t('Housing Zones off')}
        </button>
    </form>
    );
}
