import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import NumericDataEntry from './numeric-data-entry';
import { dataFields } from '../../data_fields';

class YearDataEntry extends Component<any, any> { // TODO: add proper types
    static propTypes = { // TODO: generate propTypes from TS
        year: PropTypes.number,
        upper: PropTypes.number,
        lower: PropTypes.number,
        mode: PropTypes.string,
        onChange: PropTypes.func,
        copy: PropTypes.shape({
            copying: PropTypes.bool,
            copyingKey: PropTypes.func,
            toggleCopyAttribute: PropTypes.func
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            year: props.year,
            upper: props.upper,
            lower: props.lower,
            decade: Math.floor(props.year / 10) * 10,
            century: Math.floor(props.year / 100) * 100
        }
    }
    // TODO add dropdown for decade, century
    // TODO roll in first/last year estimate
    // TODO handle changes internally, reporting out date_year, date_upper, date_lower
    render() {
        const props = this.props;
        return (
            <Fragment>
                <NumericDataEntry
                    title={dataFields.date_year.title}
                    slug="date_year"
                    value={props.year}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    // "type": "year_estimator"
                    />
                <NumericDataEntry
                    title={dataFields.date_upper.title}
                    slug="date_upper"
                    value={props.upper}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    tooltip={dataFields.date_upper.tooltip}
                    />
                <NumericDataEntry
                    title={dataFields.date_lower.title}
                    slug="date_lower"
                    value={props.lower}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    tooltip={dataFields.date_lower.tooltip}
                    />
            </Fragment>
        )
    }
}

export default YearDataEntry;
