import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import BuildingNotFound from './building-not-found';
import ContainerHeader from './container-header';
import Sidebar from './sidebar';
import ErrorBox from '../components/error-box';
import InfoBox from '../components/info-box';

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
                error: this.props.error || undefined,
                like: this.props.like || undefined,
                copying: false,
                keys_to_copy: {},
                building: this.props.building
            };

            this.handleChange = this.handleChange.bind(this);
            this.handleCheck = this.handleCheck.bind(this);
            this.handleLike = this.handleLike.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleUpdate = this.handleUpdate.bind(this);

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
        toggleCopyAttribute(key: string) {
            const keys = this.state.keys_to_copy;
            if(this.state.keys_to_copy[key]){
                delete keys[key];
            } else {
                keys[key] = true;
            }
            this.setState({
                keys_to_copy: keys
            })
        }

        updateBuildingState(key, value) {
            const building = {...this.state.building};
            building[key] = value;

            this.setState({
                building: building
            });
        }

        /**
         * Handle changes on typical inputs
         * - e.g. input[type=text], radio, select, textare
         *
         * @param {*} event
         */
        handleChange(event) {
            const target = event.target;
            let value = (target.value === '')? null : target.value;
            const name = target.name;

            // special transform - consider something data driven before adding 'else if's
            if (name === 'location_postcode' && value !== null) {
                value = value.toUpperCase();
            }
            this.updateBuildingState(name, value);
        }

        /**
         * Handle changes on checkboxes
         * - e.g. input[type=checkbox]
         *
         * @param {*} event
         */
        handleCheck(event) {
            const target = event.target;
            const value = target.checked;
            const name = target.name;

            this.updateBuildingState(name, value);
        }

        /**
         * Handle update directly
         * - e.g. as callback from MultiTextInput where we set a list of strings
         *
         * @param {String} name
         * @param {*} value
         */
        handleUpdate(name: string, value: any) {
            this.updateBuildingState(name, value);
        }

        /**
         * Handle likes separately
         * - like/love reaction is limited to set/unset per user
         *
         * @param {*} event
         */
        handleLike(event) {
            event.preventDefault();
            const like = event.target.checked;

            fetch(`/api/buildings/${this.props.building.building_id}/like.json`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: JSON.stringify({like: like})
            }).then(
                res => res.json()
            ).then(function(res){
                if (res.error) {
                    this.setState({error: res.error})
                } else {
                    this.props.selectBuilding(res);
                    this.updateBuildingState('likes_total', res.likes_total);
                }
            }.bind(this)).catch(
                (err) => this.setState({error: err})
            );
        }

        handleSubmit(event) {
            event.preventDefault();
            this.setState({error: undefined})

            fetch(`/api/buildings/${this.props.building.building_id}.json`, {
                method: 'POST',
                body: JSON.stringify(this.state.building),
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            }).then(
                res => res.json()
            ).then(function(res){
                if (res.error) {
                    this.setState({error: res.error})
                } else {
                    this.props.selectBuilding(res);
                }
            }.bind(this)).catch(
                (err) => this.setState({error: err})
            );
        }

        render() {
            if (this.state.mode === 'edit' && !this.props.user){
                return <Redirect to="/sign-up.html" />
            }

            const values_to_copy = {}
            for (const key of Object.keys(this.state.keys_to_copy)) {
                values_to_copy[key] = this.state.building[key]
            }
            const data_string = JSON.stringify(values_to_copy);
            const copy = {
                copying: this.state.copying,
                toggleCopying: this.toggleCopying,
                toggleCopyAttribute: this.toggleCopyAttribute,
                copyingKey: (key) => this.state.keys_to_copy[key]
            }
            return this.props.building?
                <Sidebar>
                <section
                    id={this.props.slug}
                    className="data-section">
                <ContainerHeader
                    {...this.props}
                    data_string={data_string}
                    copy={copy}
                    />
                <form
                    action={`/edit/${this.props.slug}/building/${this.props.building.building_id}.html`}
                    method="POST"
                    onSubmit={this.handleSubmit}>
                    <ErrorBox msg={this.state.error} />
                    {
                        (this.props.mode === 'edit' && this.props.inactive)?
                            <InfoBox
                                msg={`We're not collecting data on ${this.props.title.toLowerCase()} yet - check back soon.`}
                                />
                        : null
                    }
                    <WrappedComponent
                        building={this.state.building}
                        mode={this.props.mode}
                        copy={copy}
                        onChange={this.handleChange}
                        onCheck={this.handleCheck}
                        onLike={this.handleLike}
                        onUpdate={this.handleUpdate}
                        />
                    {
                        (this.props.mode === 'edit' && !this.props.inactive)?
                            <Fragment>
                            <InfoBox
                                msg="Colouring may take a few seconds - try zooming the map or hitting refresh after saving (we're working on making this smoother)." />
                                {
                                    this.props.slug === 'like'? // special-case for likes
                                        null :
                                        <div className="buttons-container">
                                            <button
                                                type="submit"
                                                className="btn btn-primary">
                                                Save
                                            </button>
                                        </div>
                                }
                            </Fragment>
                        : null
                    }
                </form>
                </section>
                </Sidebar>
            : <BuildingNotFound mode="view" />
        }
    }
}

export default withCopyEdit;
