import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { parse } from 'query-string';
import PropTypes from 'prop-types';

import Sidebar from './sidebar';
import CONFIG from './fields-config.json';
import InfoBox from './info-box';

const MultiEdit = (props) => {
    if (!props.user){
        return <Redirect to="/sign-up.html" />
    }
    const cat = props.match.params.cat;
    if (cat === 'like') {
        // special case for likes
        return (
            <Sidebar
                title='Quick edit'
                back={`/edit/${cat}.html`}>
                <section className='data-section'>
                    <header className={`section-header view ${cat} active`}>
                        <a><h3 className="h3">Like me!</h3></a>
                    </header>
                    <form className='buttons-container'>
                        <InfoBox msg='Click all the buildings that you like and think contribute to the city!' />

                        <Link to='/view/like.html' className='btn btn-secondary'>Back to view</Link>
                        <Link to='/edit/like.html' className='btn btn-secondary'>Back to edit</Link>
                    </form>
                </section>
            </Sidebar>
        );
    }

    const q = parse(props.location.search);
    const label = fieldTitleFromSlug(q.k);
    const title = sectionTitleFromCat(cat);
    return (
        <Sidebar
            title='Quick edit'
            back={`/edit/${cat}.html`}>
            <section className='data-section'>
                <header className={`section-header view ${cat} active`}>
                    <a><h3 className="h3">{title}</h3></a>
                </header>
                <p class='data-intro'>Set <strong>{label}</strong> to <strong>{q.v}</strong></p>
                <form className='buttons-container'>
                    <InfoBox msg='Click buildings to colour' />

                    <Link to={`/view/${cat}.html`} className='btn btn-secondary'>Back to view</Link>
                    <Link to={`/edit/${cat}.html`} className='btn btn-secondary'>Back to edit</Link>
                </form>
            </section>
        </Sidebar>
    );
}

MultiEdit.propTypes = {
    user: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object
}

function sectionTitleFromCat(cat) {
    for (let index = 0; index < CONFIG.length; index++) {
        const section = CONFIG[index];
        if (section.slug === cat) {
            return section.title
        }
    }
    return undefined
}

function fieldTitleFromSlug(slug) {
    const fields = CONFIG.reduce(
        (prev, section) => {
            const el = prev.concat(
                section.fields.filter(
                    field => field.slug === slug
                )
            )
            return el
        }, []
    )
    if (fields.length === 1 && fields[0].title) {
        return fields[0].title
    } else {
        console.error('Expected single match, got', fields)
    }
}

export default MultiEdit;
