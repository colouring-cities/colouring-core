import React from 'react';

import './parcel-switcher.css';

interface ParcelSwitcherProps {
    currentDisplay: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ParcelSwitcher: React.FC<ParcelSwitcherProps> = (props) => (
    <form className={`parcel-switcher ${props.currentDisplay}`} onSubmit={props.onSubmit}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            {(props.currentDisplay === 'enabled')? 'Switch off Parcel (sample) overlay' : 'Switch on Parcel (sample) overlay'}
        </button>
    </form>
);

export default ParcelSwitcher;
