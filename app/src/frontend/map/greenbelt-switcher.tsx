
    import React from 'react';

    import './map-button.css';
    import { useDisplayPreferences } from '../displayPreferences-context';

    export const GreenbeltSwitcher: React.FC<{}> = () => {
        const { greenbelt, greenbeltSwitch, darkLightTheme } = useDisplayPreferences();
        return (
            <form className={`map-button ${greenbelt}-state ${darkLightTheme}`} onSubmit={greenbeltSwitch}>
                <button className="btn btn-outline btn-outline-dark"
                    type="submit">
                    {(greenbelt === 'enabled')? 'Greenbelt on' : 'Greenbelt off'}
                </button>
            </form>
        );
    }
    