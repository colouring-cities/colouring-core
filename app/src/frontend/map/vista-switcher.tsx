import React from 'react';

import './vista-switcher.css';
import { useDisplayPreferences } from '../displayPreferences-context';

interface VistaSwitcherProps {
}

const VistaSwitcherProps: React.FC<VistaSwitcherProps> = (props) => {
    const { vista, vistaSwitch } = useDisplayPreferences();
    return (
    <form className={`vista-switcher ${vista}`} onSubmit={vistaSwitch}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            {(vista === 'enabled')? 'Switch off Protected Vistas overlay' : 'Switch on Protected Vistas overlay'}
        </button>
    </form>
    );
}

export default VistaSwitcherProps; // TODO remove
