import React from 'react';

interface FieldEditSummaryProps {
    title: string;
    value: any;
    oldValue: any;
}

function formatValue(value: any) {
    if(typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
    }
    if(Array.isArray(value)) {
        return value.map(v => `"${v}"`).join(', ');
    }
    return value;
}

const FieldEditSummary: React.FunctionComponent<FieldEditSummaryProps> = props => (
    <>
        {props.title}:&nbsp;
        <code title="Value before edit" className='edit-history-diff old'>{formatValue(props.oldValue)}</code>
        &nbsp;
        <code title="Value after edit" className='edit-history-diff new'>{formatValue(props.value)}</code>
    </>
);

export {
    FieldEditSummary
};
