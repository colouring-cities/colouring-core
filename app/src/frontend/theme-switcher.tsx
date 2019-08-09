import React from 'react';
import PropTypes from 'prop-types';

import './theme-switcher.css';

const ThemeSwitcher = (props) => (
    <form className={`theme-switcher ${props.currentTheme}`} onSubmit={props.onSubmit}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            Switch theme ({(props.currentTheme === 'light')? 'Light' : 'Night'})
        </button>
    </form>
);

ThemeSwitcher.propTypes = {
    currentTheme: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
}

export default ThemeSwitcher;
