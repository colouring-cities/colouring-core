import React from 'react';

import './conservation-switcher.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const ConservationAreaSwitcher: React.FC<{}> = (props) => {
    const { conservation, conservationSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`conservation-switcher ${darkLightTheme}`} onSubmit={conservationSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(conservation === 'enabled')? 'Switch off Conservation Areas' : 'Switch on Conservation Areas'}
            </button>
        </form>
    );
}