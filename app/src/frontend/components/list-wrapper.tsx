import React from 'react';

interface ListWrapperProps {
    listType?: 'ul' | 'ol';
    className?: string;
    elementClassName?: string;
}

export const ListWrapper: React.FC<ListWrapperProps> = (props) => {

    const ListTag=props.listType ?? 'ol';
    
    return (
    <ListTag className={props.className}>
    {
        React.Children.map(props.children, (elem) => (
            <li className={props.elementClassName}>
                {elem}
            </li>
        ))
    }
    </ListTag>);
};