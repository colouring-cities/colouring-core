import React, { Fragment } from 'react';

import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface SliderDataEntryProps extends BaseDataEntryProps {
    value?: number;
    placeholder?: string;
    dots?: boolean;
    max?: number;
    min?: number;
    onChange: (key: string, value: number) => void;
}

const SliderDataEntry: React.FunctionComponent<SliderDataEntryProps> = (props) => {

    const marks = {
        [props.min]: <strong>{props.min}</strong>,
        [props.max]: <strong>{props.max}</strong>
    };

    return (
        <Fragment>
            <DataTitleCopyable
                slug={props.slug}
                slugModifier={props.slugModifier}
                title={props.title}
                tooltip={props.tooltip}
                copy={props.copy}
            />
            <div className="slider-container">
                <Slider
                    value={props.value || props.min}
                    max={props.max}
                    min={props.min}
                    dots={props.dots}
                    marks={marks}
                    disabled={props.mode === 'view' || props.disabled}
                    onChange={
                        e => props.onChange(
                            props.slug, 
                            typeof(e)=="number" ? e : e[0]
                        )
                    }
                />
            </div>
            <p>Your score: {props.value} - Average: 2.41 (15 votes)</p>
        </Fragment>
    );
};

export default SliderDataEntry;
