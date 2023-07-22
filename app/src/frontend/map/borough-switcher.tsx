import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';
import { t } from 'i18next';

export const BoroughSwitcher: React.FC<{}> = () => {
    const { borough, boroughSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`borough-switcher map-button ${borough}-state ${darkLightTheme}`} onSubmit={boroughSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(borough === 'enabled')? t('Borough Boundaries on') : t('Borough Boundaries off')}
            </button>
        </form>
    );
}