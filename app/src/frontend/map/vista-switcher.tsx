import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const VistaSwitcher: React.FC<{}> = () => {
    const { vista, vistaSwitch, darkLightTheme } = useDisplayPreferences();
    return (
    <form className={`map-button ${vista}-state ${darkLightTheme}`} onSubmit={vistaSwitch}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            {(vista === 'enabled')? 'Protected Vistas on' : 'Protected Vistas off'}
        </button>
    </form>
    );
}