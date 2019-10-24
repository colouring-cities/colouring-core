import React from 'react';

interface FieldEditSummaryProps {
    title: string;
    value: any;
    oldValue: any;
}

const FieldEditSummary: React.FunctionComponent<FieldEditSummaryProps> = props => (
    <>
        {props.title}:&nbsp;
        <code title="Value before edit" className='edit-history-diff old'>{props.oldValue}</code>
        &nbsp;
        <code title="Value after edit" className='edit-history-diff new'>{props.value}</code>
    </>
);

export {
    FieldEditSummary
};
