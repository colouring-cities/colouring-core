import React from 'react';
import { Link } from 'react-router-dom';

import { parseJsonOrDefault } from '../../helpers';
import ErrorBox from '../components/error-box';
import InfoBox from '../components/info-box';
import { dataFields } from '../data_fields';
import { User } from '../models/user';

import DataEntry from './data-components/data-entry';
import Sidebar from './sidebar';
import Categories from './categories';

interface MultiEditProps {
    user?: User;
    category: string;
    dataString: string;
}

const MultiEdit: React.FC<MultiEditProps> = (props) => {
    if (props.category === 'like') {
        // special case for likes
        return (
            <Sidebar>
                <Categories mode={'view'} />
                <section className='data-section'>
                    <header className={`section-header view ${props.category} background-${props.category}`}>
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

    let data = parseJsonOrDefault(props.dataString);

    let error: string;
    if(data == null) {
        error = 'Invalid parameters supplied';
        data = {};
    } else if(Object.values(data).some(x => x == undefined)) {
        error = 'Cannot copy empty values';
        data = {};
    }

    return (
        <Sidebar>
            <Categories mode={'view'} />
            <section className='data-section'>
                <header className={`section-header view ${props.category} background-${props.category}`}>
                    <h2 className="h2">Copy {props.category} data</h2>
                </header>
                <div className="section-body">
                    <form>
                    {
                        error ?
                            <ErrorBox msg={error} /> :
                            <InfoBox msg='Click buildings one at a time to colour using the data below' />
                    }
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
                            );
                        }))
                    }
                    </form>
                    <form className='buttons-container'>
                        <Link to={`/view/${props.category}`} className='btn btn-secondary'>Back to view</Link>
                        <Link to={`/edit/${props.category}`} className='btn btn-secondary'>Back to edit</Link>
                    </form>
                </div>
            </section>
        </Sidebar>
    );
};

export default MultiEdit;
