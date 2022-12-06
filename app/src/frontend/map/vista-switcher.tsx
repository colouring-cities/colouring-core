import React from 'react';

import './vista-switcher.css';

interface VistaSwitcherProps {
    currentDisplay: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const VistaSwitcherProps: React.FC<VistaSwitcherProps> = (props) => (
    <form className={`vista-switcher ${props.currentDisplay}`} onSubmit={props.onSubmit}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            Protected Vistas ({(props.currentDisplay === 'enabled')? 'Enabled' : 'Disabled'})
        </button>
    </form>
);

export default VistaSwitcherProps;
