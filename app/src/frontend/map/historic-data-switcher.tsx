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
            Switch display of historic map example ({(props.currentDisplay === 'enabled')? 'Enabled' : 'Disabled'})
        </button>
    </form>
);

export default HistoricDataSwitcherProps;
