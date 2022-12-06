import React from 'react';

import './flood-switcher.css';
import { useDisplayPreferences } from '../displayPreferences-context';

interface FloodSwitcherProps {
}

const FloodSwitcherProps: React.FC<FloodSwitcherProps> = (props) => {
    const { flood, floodSwitch } = useDisplayPreferences();
    return (
        <form className={`flood-switcher ${flood}`} onSubmit={floodSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(flood === 'enabled')? 'Switch off Flood Zones' : 'Switch on Flood Zones'}
            </button>
        </form>
    );
}
export default FloodSwitcherProps;
