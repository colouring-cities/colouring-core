
    import React from 'react';

    import './map-button.css';
    import { useDisplayPreferences } from '../displayPreferences-context';

    export const CeremonialCountiesSwitcher: React.FC<{}> = () => {
        const { ceremonialCounties, ceremonialCountiesSwitch, darkLightTheme } = useDisplayPreferences();
        return (
            <form className={`map-button ${ceremonialCounties}-state ${darkLightTheme}`} onSubmit={ceremonialCountiesSwitch}>
                <button className="btn btn-outline btn-outline-dark"
                    type="submit">
                    {(ceremonialCounties === 'enabled')? 'Counties on' : 'Counties off'}
                </button>
            </form>
        );
    }
    