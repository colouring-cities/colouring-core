import React from 'react';

import './borough-switcher.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const BoroughSwitcher: React.FC<{}> = () => {
    const { borough, boroughSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`borough-switcher ${darkLightTheme}`} onSubmit={boroughSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(borough === 'enabled')? 'Switch off Borough Boundaries' : 'Switch on Borough Boundaries'}
            </button>
        </form>
    );
}