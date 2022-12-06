import React from 'react';

import './housing-switcher.css';

interface HousingSwitcherProps {
    currentDisplay: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const HousingSwitcherProps: React.FC<HousingSwitcherProps> = (props) => (
    <form className={`housing-switcher ${props.currentDisplay}`} onSubmit={props.onSubmit}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            Housing Zone display ({(props.currentDisplay === 'enabled')? 'Enabled' : 'Disabled'})
        </button>
    </form>
);

export default HousingSwitcherProps;
