import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { parse } from 'query-string';
import PropTypes from 'prop-types';

import Sidebar from './sidebar';
import CONFIG from './fields-config.json';
import InfoBox from '../components/info-box';
import { sanitiseURL } from '../helpers';

const MultiEdit = (props) => {
    if (!props.user){
        return <Redirect to="/sign-up.html" />
    }
    const cat = props.match.params.cat;
    if (cat === 'like') {
        // special case for likes
        return (
            <Sidebar>
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
    const data = JSON.parse(q.data as string) // TODO: verify what happens when data is string[]
    const title = sectionTitleFromCat(cat);
    return (
        <Sidebar>
            <section className='data-section'>
                <header className={`section-header view ${cat} active`}>
                    <a><h3 className="h3">{title}</h3></a>
                </header>
                <dl className='data-list'>
                {
                    Object.keys(data).map((key => {
                        const label = fieldTitleFromSlug(key);
                        return <DataEntry key={key} label={label} value={data[key]}/>
                    }))
                }
                </dl>
                <form className='buttons-container'>
                    <InfoBox msg='Click buildings to colour using the data above' />

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

const DataEntry = (props) => {
    let content;

    if (props.value != null && props.value !== '') {
        if (typeof(props.value) === 'boolean') {
            content = (props.value)? 'Yes' : 'No'
        } else if (Array.isArray(props.value)) {
            if (props.value.length) {
                content = <ul>{
                    props.value.map((item, index) => {
                        return <li key={index}><a href={sanitiseURL(item)}>{item}</a></li>
                    })
                }</ul>
            } else {
                content = '\u00A0'
            }
        } else {
            content = props.value
        }
    } else {
        content = '\u00A0'
    }

    return (
        <Fragment>
            <dt>{props.label}</dt>
            <dd>{content}</dd>
        </Fragment>
    )
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
                    (field: any) => field.slug === slug // TODO: remove any
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
