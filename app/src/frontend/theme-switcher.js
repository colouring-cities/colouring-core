import React from 'react';

import './theme-switcher.css';

const ThemeSwitcher = (props) => (
    <form class={`theme-switcher ${props.currentTheme}`} onSubmit={props.onSubmit}>
        <button class="btn btn-outline btn-outline-dark" type="submit">
            Switch theme ({(props.currentTheme === 'light')? 'Light' : 'Night'})
        </button>
    </form>
);

export default ThemeSwitcher;
