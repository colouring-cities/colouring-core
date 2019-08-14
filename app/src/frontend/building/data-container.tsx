import React from 'react';
import PropTypes from 'prop-types';

import BuildingNotFound from './building-not-found';
import ContainerHeader from './container-header';
import Sidebar from './sidebar';

/**
 * Shared functionality for view/edit forms
 *
 * See React Higher-order-component docs for the pattern
 * - https://reactjs.org/docs/higher-order-components.html
 *
 * @param WrappedComponent
 */
const withCopyEdit = (WrappedComponent) => {
    return class extends React.Component<any, any> { // TODO: add proper types
        static propTypes = { // TODO: generate propTypes from TS
            title: PropTypes.string,
            slug: PropTypes.string,
            intro: PropTypes.string,
            help: PropTypes.string,
            inactive: PropTypes.bool,
            building_id: PropTypes.number,
            children: PropTypes.node
        };

        constructor(props) {
            super(props);
            this.state = {
                copying: false,
                values_to_copy: {}
            };
            this.toggleCopying = this.toggleCopying.bind(this);
            this.toggleCopyAttribute = this.toggleCopyAttribute.bind(this);
        }

        /**
         * Enter or exit "copying" state - allow user to select attributes to copy
         */
        toggleCopying() {
            this.setState({
                copying: !this.state.copying
            })
        }

        /**
         * Keep track of data to copy (accumulate while in "copying" state)
         *
         * @param {string} key
         */
        toggleCopyAttribute(key) {
            const value = this.props.building[key];
            const values = this.state.values_to_copy;
            if(Object.keys(this.state.values_to_copy).includes(key)){
                delete values[key];
            } else {
                values[key] = value;
            }
            this.setState({
                values_to_copy: values
            })
        }

        render() {
            const data_string = JSON.stringify(this.state.values_to_copy);
            const copy = {
                copying: this.state.copying,
                toggleCopying: this.toggleCopying,
                toggleCopyAttribute: this.toggleCopyAttribute,
                copyingKey: (key) => Object.keys(this.state.values_to_copy).includes(key)
            }
            return this.props.building?
                <Sidebar>
                    <section id={this.props.slug} className="data-section">
                        <ContainerHeader
                            {...this.props}
                            data_string={data_string}
                            copy={copy}
                            />
                        <WrappedComponent {...this.props} copy={copy} />
                    </section>
                </Sidebar>
            : <BuildingNotFound mode="view" />
        }
    }
}

export default withCopyEdit;
