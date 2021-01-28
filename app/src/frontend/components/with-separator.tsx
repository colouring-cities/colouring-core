import React from 'react';

// adapted from https://github.com/LinusU/react-with-separator

function createSeparator(separator: any, idx: number) {
    if (typeof separator == 'string') {
        return separator;
    }

    return React.cloneElement(separator, { key: 'sep-' + idx});
}

export const WithSeparator: React.FC<{ separator: any}> = ({ separator, children }) => {
    const childrenArr = React.Children.toArray(children);

    for(let i=1; i < childrenArr.length; i += 2) {
        childrenArr.splice(i, 0, createSeparator(separator, i))
    }

    return <>{childrenArr}</>;
}