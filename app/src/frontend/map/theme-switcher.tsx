import React from 'react';

import './map-button.css';
import { t } from 'i18next';

interface ThemeSwitcherProps {
    currentTheme: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = (props) => (
    <form className={`theme-switcher map-button ${props.currentTheme}`} onSubmit={props.onSubmit}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            {t("Switch theme")} ({(props.currentTheme === 'light')? t('Light') : t('Night')})
        </button>
    </form>
);

export default ThemeSwitcher;
