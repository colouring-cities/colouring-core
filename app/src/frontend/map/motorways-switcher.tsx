
    import React from 'react';

    import './map-button.css';
    import { useDisplayPreferences } from '../displayPreferences-context';

    export const MotorwaysSwitcher: React.FC<{}> = () => {
        const { motorways, motorwaysSwitch, darkLightTheme } = useDisplayPreferences();
        return (
            <form className={`map-button ${motorways}-state ${darkLightTheme}`} onSubmit={motorwaysSwitch}>
                <button className="btn btn-outline btn-outline-dark"
                    type="submit">
                    {(motorways === 'enabled')? 'Motorways on' : 'Motorways off'}
                </button>
            </form>
        );
    }
    