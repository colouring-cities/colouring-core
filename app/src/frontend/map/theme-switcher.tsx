import React from 'react';

import './map-button.css';

interface ThemeSwitcherProps {
    currentTheme: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = (props) => (
    <form className={`map-button ${props.currentTheme}`} onSubmit={props.onSubmit}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            Switch theme ({(props.currentTheme === 'light')? 'Light' : 'Night'})
        </button>
    </form>
);

export default ThemeSwitcher;
