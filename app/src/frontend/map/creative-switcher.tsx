import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';
import { t } from 'i18next';

export const CreativeSwitcher: React.FC<{}> = () => {
    const { creative, creativeSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`creative-switcher map-button ${creative}-state ${darkLightTheme}`} onSubmit={creativeSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(creative === 'enabled')? t('Enterprise Zones on') : t('Creative Enterprise Zones off')}
            </button>
        </form>
    );
}
