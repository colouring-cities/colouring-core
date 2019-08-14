import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { sanitiseURL } from '../../helpers';
import { DataTitleCopyable } from './data-title';


const MultiDataEntry: React.FunctionComponent<any> = (props) => ( // TODO: remove any
    <Fragment>
        <DataTitleCopyable
            slug={props.slug}
            title={props.title}
            tooltip={props.tooltip}
            disabled={props.disabled}
        />
        <dd>
            {
                (props.value && props.value.length)?
                    <ul>
                    {
                        props.value.map((item, index) => {
                            return <li key={index}><a href={sanitiseURL(item)}>{item}</a></li>
                        })
                    }
                    </ul>
                :'\u00A0'
            }
        </dd>
    </Fragment>
);

MultiDataEntry.propTypes = {
    title: PropTypes.string,
    tooltip: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string)
}

export default MultiDataEntry;
