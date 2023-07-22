import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';
import { t } from 'i18next';

export const ConservationAreaSwitcher: React.FC<{}> = (props) => {
    const { conservation, conservationSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`conservation-switcher map-button ${conservation}-state ${darkLightTheme}`} onSubmit={conservationSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(conservation === 'enabled')? t('Conservation Areas on') : t('Conservation Areas off')}
            </button>
        </form>
    );
}