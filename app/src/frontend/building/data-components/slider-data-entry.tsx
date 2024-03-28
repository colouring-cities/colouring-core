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
    votes?: number;
    average?: number;
    onChange: (key: string, value: number) => void;
}

const SliderDataEntry: React.FunctionComponent<SliderDataEntryProps> = (props) => {

    const marks = {
        ["None"]: <strong>n/a</strong>,
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
                    value={props.value || 0}
                    defaultValue={0}
                    max={props.max}
                    min={0}
                    dots={props.dots}
                    marks={marks}
                    disabled={props.mode === 'view' || props.disabled}
                    onChange={
                        e => props.onChange(
                            props.slug, 
                            typeof(e)=="number" ? (e?e:null) : e[0]
                        )
                    }
                />
            </div>
            <p className="slider-score">
                Your score: {props.value?props.value:"Not yet entered"} <span className="slider-average">Average: {props.average} ({props.votes} voters)</span>
            </p>
        </Fragment>
    );
};

export default SliderDataEntry;
