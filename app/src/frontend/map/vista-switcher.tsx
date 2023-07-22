import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';
import { t } from 'i18next';

export const VistaSwitcher: React.FC<{}> = () => {
    const { vista, vistaSwitch, darkLightTheme } = useDisplayPreferences();
    return (
    <form className={`vista-switcher map-button ${vista}-state ${darkLightTheme}`} onSubmit={vistaSwitch}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            {(vista === 'enabled')? t('Protected Vistas on') : t('Protected Vistas off')}
        </button>
    </form>
    );
}