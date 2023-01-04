import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { LayerEnablementState, MapTheme } from './config/map-config';

interface DisplayPreferencesContextState {
    vista: LayerEnablementState;
    vistaSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    vistaSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    flood: LayerEnablementState;
    floodSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    floodSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    creative: LayerEnablementState;
    creativeSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    creativeSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    housing: LayerEnablementState;
    housingSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    housingSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    conservation: LayerEnablementState;
    conservationSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    conservationSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    parcel: LayerEnablementState;
    parcelSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    parcelSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    borough: LayerEnablementState;
    boroughSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    boroughSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    historicData: LayerEnablementState;
    historicDataSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    historicDataSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    darkLightTheme: MapTheme;
    darkLightThemeSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    darkLightThemeSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;
}

const stub = (): never => {
    throw new Error('DisplayPreferencesProvider not set up');
};

export const DisplayPreferencesContext = createContext<DisplayPreferencesContextState>({
    vista: undefined,
    vistaSwitch: stub,
    vistaSwitchOnClick: undefined,

    flood: undefined,
    floodSwitch: stub,
    floodSwitchOnClick: undefined,

    creative: undefined,
    creativeSwitch: stub,
    creativeSwitchOnClick: undefined,

    housing: undefined,
    housingSwitch: stub,
    housingSwitchOnClick: undefined,

    conservation: undefined,
    conservationSwitch: stub,
    conservationSwitchOnClick: undefined,

    parcel: undefined,
    parcelSwitch: stub,
    parcelSwitchOnClick: undefined,

    borough: undefined,
    boroughSwitch: stub,
    boroughSwitchOnClick: undefined,

    historicData: undefined,
    historicDataSwitch: stub,
    historicDataSwitchOnClick: undefined,

    darkLightTheme: undefined,
    darkLightThemeSwitch: stub,
    darkLightThemeSwitchOnClick: undefined,
});

const noop = () => {};

export const DisplayPreferencesProvider: React.FC<{}> = ({children}) => {
    const [vista, setVista] = useState<LayerEnablementState>('disabled');
    const [flood, setFlood] = useState<LayerEnablementState>('disabled');
    const [creative, setCreative] = useState<LayerEnablementState>('disabled');
    const [housing, setHousing] = useState<LayerEnablementState>('disabled');
    const [borough, setBorough] = useState<LayerEnablementState>('enabled');
    const [parcel, setParcel] = useState<LayerEnablementState>('disabled');
    const [conservation, setConservation] = useState<LayerEnablementState>('disabled');
    const [historicData, setHistoricData] = useState<LayerEnablementState>('disabled');
    const [darkLightTheme, setDarkLightTheme] = useState<MapTheme>('night');

    const vistaSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newVista = (vista === 'enabled')? 'disabled' : 'enabled';
            setVista(newVista);
        },
        [vista],
    )

    const vistaSwitchOnClick = (e) => {
            e.preventDefault();
            const newVista = (vista === 'enabled')? 'disabled' : 'enabled';
            setVista(newVista);
    }

    const floodSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newFlood = (flood === 'enabled')? 'disabled' : 'enabled';
            setFlood(newFlood);
        },
        [flood],
    )

    const floodSwitchOnClick = (e) => {
        e.preventDefault();
        const newFlood = (flood === 'enabled')? 'disabled' : 'enabled';
        setFlood(newFlood);
    }

    const housingSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newHousing = (housing === 'enabled')? 'disabled' : 'enabled';
            setHousing(newHousing);
        },
        [housing],
    )

    const housingSwitchOnClick = (e) => {
        e.preventDefault();
        const newHousing = (housing === 'enabled')? 'disabled' : 'enabled';
        setHousing(newHousing);
    }

    const creativeSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newCreative = (creative === 'enabled')? 'disabled' : 'enabled';
            setCreative(newCreative);
        },
        [creative],
    )

    const creativeSwitchOnClick = (e) => {
        e.preventDefault();
        const newCreative = (creative === 'enabled')? 'disabled' : 'enabled';
        setCreative(newCreative);
    }

    const boroughSwitch = useCallback(
        (e) => {
            flipBorough(e)
        },
        [borough],
    )
    const boroughSwitchOnClick = (e) => {
        flipBorough(e)
    }
    function flipBorough(e) {
        e.preventDefault();
        const newBorough = (borough === 'enabled')? 'disabled' : 'enabled';
        setBorough(newBorough);
    }

    const parcelSwitch = useCallback(
        (e) => {
            flipParcel(e)
        },
        [parcel],
    )
    const parcelSwitchOnClick = (e) => {
        flipParcel(e)
    }
    function flipParcel(e) {
        e.preventDefault();
        const newParcel = (parcel === 'enabled')? 'disabled' : 'enabled';
        setParcel(newParcel);
    }

    const conservationSwitch = useCallback(
        (e) => {
            flipConservation(e)
        },
        [conservation],
    )
    const conservationSwitchOnClick = (e) => {
        flipConservation(e)
    }
    function flipConservation(e) {
        e.preventDefault();
        const newConservation = (conservation === 'enabled')? 'disabled' : 'enabled';
        setConservation(newConservation);
    }

    const historicDataSwitch = useCallback(
        (e) => {
            flipHistoricData(e)
        },
        [historicData],
    )
    const historicDataSwitchOnClick = (e) => {
        flipHistoricData(e)
    }
    function flipHistoricData(e) {
        e.preventDefault();
        const newHistoric = (historicData === 'enabled')? 'disabled' : 'enabled';
        setHistoricData(newHistoric);
    }

    const darkLightThemeSwitch = useCallback(
        (e) => {
            flipDarkLightTheme(e)
        },
        [darkLightTheme],
    )
    const darkLightThemeSwitchOnClick = (e) => {
        flipDarkLightTheme(e)
    }
    function flipDarkLightTheme(e) {
        e.preventDefault();
        const newDarkLightTheme = (darkLightTheme === 'light')? 'night' : 'light';
        setDarkLightTheme(newDarkLightTheme);
    }


    return (
        <DisplayPreferencesContext.Provider value={{
            vista,
            vistaSwitch,
            vistaSwitchOnClick,
            flood,
            floodSwitch,
            floodSwitchOnClick,
            creative,
            creativeSwitch,
            creativeSwitchOnClick,
            housing,
            housingSwitch,
            housingSwitchOnClick,
            conservation,
            conservationSwitch,
            conservationSwitchOnClick,
            parcel,
            parcelSwitch,
            parcelSwitchOnClick,
        
            borough,
            boroughSwitch,
            boroughSwitchOnClick,
        
            historicData,
            historicDataSwitch,
            historicDataSwitchOnClick,

            darkLightTheme,
            darkLightThemeSwitch,
            darkLightThemeSwitchOnClick
        }}>
            {children}
        </DisplayPreferencesContext.Provider>
    );
};

export const useDisplayPreferences = (): DisplayPreferencesContextState => {
    return useContext(DisplayPreferencesContext);
};
