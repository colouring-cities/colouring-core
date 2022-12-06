import React from 'react';

import './creative-switcher.css';

interface CreativeSwitcherProps {
    currentDisplay: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CreativeSwitcherProps: React.FC<CreativeSwitcherProps> = (props) => (
    <form className={`creative-switcher ${props.currentDisplay}`} onSubmit={props.onSubmit}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            Creative Enterprise Zones display ({(props.currentDisplay === 'enabled')? 'Enabled' : 'Disabled'})
        </button>
    </form>
);

export default CreativeSwitcherProps;
