import React, { Fragment } from 'react';

import DataTitle from './data-title';


interface UPRNsDataEntryProps {
    title: string;
    tooltip: string;
    value: {
        uprn: string;
        parent_uprn?: string;
    }[];
}

const UPRNsDataEntry: React.FC<UPRNsDataEntryProps> = (props) => {
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
    );
};

export default UPRNsDataEntry;
