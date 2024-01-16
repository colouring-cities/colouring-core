import React, { useEffect, useState } from 'react';
import { useThrottle } from 'use-throttle';

import './autofill-dropdown.css';

import { apiGet } from '../../../apiHelpers';

interface AutofillDropdownProps {
    fieldName: string;
    fieldValue: string;
    showAllOptionsOnEmpty?: boolean;
    editing: boolean;
    onSelect: (val: string) => void;
    onClose: () => void;
}

interface AutofillOption {
    id: string;
    value: string;
    similarity: number;
}

export const AutofillDropdown: React.FC<AutofillDropdownProps> =  props => {
    const [options, setOptions] = useState<AutofillOption[]>(null);

    // use both throttled and debounced field value as trigger for update
    const throttledFieldValue = useThrottle(props.fieldValue, 1000);

    useEffect(() => {
        const doAsync = async () => {
            if (!props.editing) return setOptions(null);

            let valueParam: string;

            if(props.fieldValue == null) {
                if(!props.showAllOptionsOnEmpty) {
                    if(options == null) return setOptions(null);
                } else {
                    valueParam = 'all_values=true';
                }
            } else {
                valueParam = `field_value=${props.fieldValue}`;
            }

            const url = `/api/autofill?field_name=${props.fieldName}&${valueParam}`;
            const { options: newOptions } = await apiGet(url);

            if (!props.editing) return;

            setOptions(newOptions);
        };

        doAsync();
    }, [props.editing, props.fieldName, throttledFieldValue]);

    if (!props.editing || options == undefined) return null;

    return (
        <div className="autofill-dropdown">
            {
                options.map(option =>
                    <div
                        key={option.id}
                        onMouseDown={e => /* prevent input blur */ e.preventDefault()}
                        onClick={e => {
                            props.onSelect(option.value);
                            // close dropdown manually rather than through input blur
                            props.onClose();
                        }}
                    >
                        {option.value}
                    </div>)
            }
        </div>
    );

};
