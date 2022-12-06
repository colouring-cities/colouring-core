import React from 'react';

import './borough-switcher.css';

interface BoroughSwitcherProps {
    currentDisplay: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const BoroughSwitcher: React.FC<BoroughSwitcherProps> = (props) => (
    <form className={`borough-switcher ${props.currentDisplay}`} onSubmit={props.onSubmit}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            {(props.currentDisplay === 'enabled')? 'Switch off Borough overlay' : 'Switch on Borough overlay'}
        </button>
    </form>
);

export default BoroughSwitcher;
