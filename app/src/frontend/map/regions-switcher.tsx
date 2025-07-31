
    import React from 'react';

    import './map-button.css';
    import { useDisplayPreferences } from '../displayPreferences-context';

    export const RegionsSwitcher: React.FC<{}> = () => {
        const { regions, regionsSwitch, darkLightTheme } = useDisplayPreferences();
        return (
            <form className={`map-button ${regions}-state ${darkLightTheme}`} onSubmit={regionsSwitch}>
                <button className="btn btn-outline btn-outline-dark"
                    type="submit">
                    {(regions === 'enabled')? 'Regions on' : 'Regions off'}
                </button>
            </form>
        );
    }
    