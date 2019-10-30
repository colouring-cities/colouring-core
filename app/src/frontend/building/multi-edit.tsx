import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { parse } from 'query-string';
import PropTypes from 'prop-types';

import Sidebar from './sidebar';
import InfoBox from '../components/info-box';
import { BackIcon }from '../components/icons';
import DataEntry from './data-components/data-entry';
import { dataFields } from '../data_fields';


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
                    <header className={`section-header view ${cat} background-${cat}`}>
                        <h2 className="h2">Like me!</h2>
                    </header>
                    <form className='buttons-container'>
                        <InfoBox msg='Click all the buildings that you like and think contribute to the city!' />

                        <Link to='/view/like' className='btn btn-secondary'>Back to view</Link>
                        <Link to='/edit/like' className='btn btn-secondary'>Back to edit</Link>
                    </form>
                </section>
            </Sidebar>
        );
    }

    const q = parse(props.location.search);

    let data: object;
    if (cat === 'like'){
        data = { like: true }
    } else {
        try {
            // TODO: verify what happens if data is string[]
            data = JSON.parse(q.data as string);
        } catch (error) {
            console.error(error, q)
            data = {}
        }
    }

    return (
        <Sidebar>
            <section className='data-section'>
                <header className={`section-header view ${cat} background-${cat}`}>
                    <Link
                        className="icon-button back"
                        to={`/edit/${cat}`}>
                        <BackIcon />
                    </Link>
                    <h2 className="h2">Copy {cat} data</h2>
                </header>
                <form>
                    <InfoBox msg='Click buildings one at a time to colour using the data below' />
                {
                    Object.keys(data).map((key => {
                        const info = dataFields[key] || {};
                        return (
                        <DataEntry
                            title={info.title || `Unknown field (${key})`}
                            slug={key}
                            disabled={true}
                            value={data[key]}
                            />
                        )
                    }))
                }
                </form>
                <form className='buttons-container'>
                    <Link to={`/view/${cat}`} className='btn btn-secondary'>Back to view</Link>
                    <Link to={`/edit/${cat}`} className='btn btn-secondary'>Back to edit</Link>
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

export default MultiEdit;
