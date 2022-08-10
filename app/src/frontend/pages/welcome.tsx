import React from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import './welcome.css';

const Welcome = () => {

    const { t, i18n } = useTranslation();

    return (
        <div className="section-body welcome">
            <h1 className="h2">{t('Welcome to Colouring London!')}</h1>
            <p> {t('Welcome First Paragraph')}</p>
            <p>
                {t('Welcome Second Paragraph')}
            </p>
            <p>
                {t('Welcome Third Paragraph')}
            </p>
            <p>
                <Trans i18nKey="welcome_fourth_paragraph">
                    All our <Link to="/data-extracts.html">data</Link> and <a href="https://github.com/colouring-london/colouring-london">code</a> are free to download, use and share under our open licence terms.
                </Trans>
            </p>
            <Link to="/view/categories"
                className="btn btn-outline-dark btn-lg btn-block">
                {t("Start Colouring Here!")}
            </Link>
            <div className="image-row">
                <img className="cl-logo" src="images/logo-cc.jpg" alt="Colouring Cities Research Programme"></img>
                <img className="turing-logo" src="images/logo-turing.jpg" alt="Alan Turing Institute"></img>
            </div>
            <div className="image-row">
                <img src="images/supporter-logos.png" alt="Colouring London collaborating organisations: The Bartlett UCL, Ordnance Survey, Historic England, Greater London Authority" />
            </div>
            <div className="image-row">
                <img src="images/logo-loughborough.png" alt="Colouring London collaborating organisations: Loughborough University" />
            </div>
        </div>
    )
};

export default Welcome;
