import React from 'react';

import './flood-switcher.css';

interface FloodSwitcherProps {
    currentDisplay: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FloodSwitcherProps: React.FC<FloodSwitcherProps> = (props) => (
    <form className={`flood-switcher ${props.currentDisplay}`} onSubmit={props.onSubmit}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            Switch flood zone overlay ({(props.currentDisplay === 'enabled')? 'Enabled' : 'Disabled'})
        </button>
    </form>
);

export default FloodSwitcherProps;
