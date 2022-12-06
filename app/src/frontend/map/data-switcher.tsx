import React from 'react';

import './data-switcher.css';

interface DataLayerSwitcherProps {
    currentDisplay: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DataLayerSwitcher: React.FC<DataLayerSwitcherProps> = (props) => (
    <form className={`data-switcher ${props.currentDisplay}`} onSubmit={props.onSubmit}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            {(props.currentDisplay === 'enabled')? 'Hide layer options' : 'Show layer options'}
        </button>
    </form>
);

export default DataLayerSwitcher;
