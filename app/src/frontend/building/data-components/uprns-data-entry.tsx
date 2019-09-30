import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../../components/tooltip';
import DataTitle from './data-title';

const UPRNsDataEntry = (props) => {
    const uprns = props.value || [];
    const noParent = uprns.filter(uprn => uprn.parent_uprn == null);
    const withParent = uprns.filter(uprn => uprn.parent_uprn != null);

    return (
        <Fragment>
            <DataTitle
                title={props.title}
                tooltip={props.tooltip}
            />
            <dd>
                {
                    noParent.length?
                        <ul className="uprn-list">
                            {
                                noParent.map(uprn => (
                                    <li key={uprn.uprn}>{uprn.uprn}</li>
                                ))
                            }
                        </ul>

                    : '\u00A0'

                }
                {
                    withParent.length?
                        <details>
                            <summary>Children</summary>
                            <ul className="uprn-list">
                            {
                                withParent.map(uprn => (
                                    <li key={uprn.uprn}>{uprn.uprn} (child of {uprn.parent_uprn})</li>
                                ))
                            }
                            </ul>
                        </details>
                        : null
                }
            </dd>
        </Fragment>
    )
}

UPRNsDataEntry.propTypes = {
    title: PropTypes.string,
    tooltip: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.shape({
        uprn: PropTypes.string.isRequired,
        parent_uprn: PropTypes.string
    }))
}

export default UPRNsDataEntry;
