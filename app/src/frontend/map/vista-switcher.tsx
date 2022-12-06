import React from 'react';

import './vista-switcher.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const VistaSwitcher: React.FC<{}> = () => {
    const { vista, vistaSwitch } = useDisplayPreferences();
    return (
    <form className={`vista-switcher ${vista}`} onSubmit={vistaSwitch}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            {(vista === 'enabled')? 'Switch off Protected Vistas' : 'Switch on Protected Vistas'}
        </button>
    </form>
    );
}