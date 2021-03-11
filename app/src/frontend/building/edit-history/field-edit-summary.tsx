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

function isComplex(x: any): boolean {
    return x != undefined && (Array.isArray(x) || typeof x === 'object');
}

const ObjectDiffSummary: React.FC<{ oldValue: any; newValue: any}> = ({oldValue, newValue}) => (
    <>
        <pre title="Value before edit" className='edit-history-diff old'>{JSON.stringify(oldValue, null, 4)}</pre>
        <pre title="Value after edit" className='edit-history-diff new'>{JSON.stringify(newValue, null, 4)}</pre>
    </>
);

const SimpleSummary: React.FC<{ oldValue: any; newValue: any}> = (props) => (
    <>
        <code title="Value before edit" className='edit-history-diff old'>{formatValue(props.oldValue)}</code>
        &nbsp;
        <code title="Value after edit" className='edit-history-diff new'>{formatValue(props.newValue)}</code>
    </>
);

const FieldEditSummary: React.FunctionComponent<FieldEditSummaryProps> = props => (
    <>
        {props.title}:&nbsp;
        {
            (isComplex(props.oldValue) || isComplex(props.value)) ?
                <ObjectDiffSummary oldValue={props.oldValue} newValue={props.value} /> :
                <SimpleSummary oldValue={props.oldValue} newValue={props.value} />
        }
    </>
);

export {
    FieldEditSummary
};
