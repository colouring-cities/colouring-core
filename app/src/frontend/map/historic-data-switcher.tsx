import React from 'react';

import './historic-data-switcher.css';

interface HistoricDataSwitcherProps {
    currentDisplay: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const HistoricDataSwitcherProps: React.FC<HistoricDataSwitcherProps> = (props) => (
    <form className={`historic-data-switcher ${props.currentDisplay}`} onSubmit={props.onSubmit}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            {(props.currentDisplay === 'enabled')? 'Switch off the OS 1890s Historical Map overlay' : 'Switch on the OS 1890s Historical Map overlay'}
        </button>
    </form>
);

export default HistoricDataSwitcherProps;
