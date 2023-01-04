import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const VistaSwitcher: React.FC<{}> = () => {
    const { vista, vistaSwitch, darkLightTheme } = useDisplayPreferences();
    return (
    <form className={`vista-switcher map-button ${darkLightTheme}`} onSubmit={vistaSwitch}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            {(vista === 'enabled')? 'Switch off Protected Vistas' : 'Switch on Protected Vistas'}
        </button>
    </form>
    );
}