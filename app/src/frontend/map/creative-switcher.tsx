import React from 'react';

import './creative-switcher.css';
import { useDisplayPreferences } from '../displayPreferences-context';

interface CreativeSwitcherProps {
}

const CreativeSwitcherProps: React.FC<CreativeSwitcherProps> = (props) => {
    const { creative, creativeSwitch } = useDisplayPreferences();
    return (
        <form className={`creative-switcher ${creative}`} onSubmit={creativeSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(creative === 'enabled')? 'Switch off Creative Enterprise Zones' : 'Switch on Creative Enterprise Zones'}
            </button>
        </form>
    );
}
export default CreativeSwitcherProps;
