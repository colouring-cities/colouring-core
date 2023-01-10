import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const ResetSwitcher: React.FC<{}> = () => {
    const { resetLayers, darkLightTheme, anyLayerModifiedState } = useDisplayPreferences();
    if(anyLayerModifiedState()) {
        return (
            <form className={`reset-switcher map-button ${darkLightTheme}`} onSubmit={resetLayers}>
                <button className="btn btn-outline btn-outline-dark"
                    type="submit">
                    {"Reset layers"}
                </button>
            </form>
            );
    } else {
        return <></>
    }
}
