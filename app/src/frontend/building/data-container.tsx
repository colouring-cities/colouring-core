import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import ContainerHeader from './container-header';
import ErrorBox from '../components/error-box';
import InfoBox from '../components/info-box';
import { Building } from '../models/building';
import { User } from '../models/user';
import { compareObjects } from '../helpers';

interface DataContainerProps {
    title: string;
    cat: string;
    intro: string;
    help: string;
    inactive?: boolean;

    user: User;
    mode: 'view' | 'edit' | 'multi-edit';
    building: Building;
    building_like: boolean;
    selectBuilding: (building: Building) => void
}

interface DataContainerState {
    error: string;
    copying: boolean;
    keys_to_copy: {[key: string]: boolean};
    currentBuildingId: number;
    buildingEdits: Partial<Building>;
}

interface CopyProps {
    copying: boolean;
    toggleCopying: () => void;
    toggleCopyAttribute: (key: string) => void;
    copyingKey: (key: string) => boolean;
}

/**
 * Shared functionality for view/edit forms
 *
 * See React Higher-order-component docs for the pattern
 * - https://reactjs.org/docs/higher-order-components.html
 *
 * @param WrappedComponent
 */
const withCopyEdit = (WrappedComponent) => {
    return class DataContainer extends React.Component<DataContainerProps, DataContainerState> { // TODO: add proper types
        static displayName = 'DataContainer';

        static propTypes = { // TODO: generate propTypes from TS
            title: PropTypes.string,
            slug: PropTypes.string,
            intro: PropTypes.string,
            help: PropTypes.string,
            inactive: PropTypes.bool,
            children: PropTypes.node
        };

        constructor(props) {
            super(props);

            this.state = {
                error: undefined,
                copying: false,
                keys_to_copy: {},
                buildingEdits: {},
                currentBuildingId: undefined
            };

            this.handleChange = this.handleChange.bind(this);
            this.handleCheck = this.handleCheck.bind(this);
            this.handleLike = this.handleLike.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleUpdate = this.handleUpdate.bind(this);

            this.toggleCopying = this.toggleCopying.bind(this);
            this.toggleCopyAttribute = this.toggleCopyAttribute.bind(this);
        }

        static getDerivedStateFromProps(props, state) {
            if(props.building != undefined && props.building.building_id !== state.currentBuildingId) {
                return {
                    buildingEdits: {},
                    currentBuildingId: props.building.building_id
                };
            }

            return null;
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
            const keys = {...this.state.keys_to_copy};
            if(this.state.keys_to_copy[key]){
                delete keys[key];
            } else {
                keys[key] = true;
            }
            this.setState({
                keys_to_copy: keys
            })
        }

        isEdited() {
            const edits = this.state.buildingEdits;
            // check if the edits object has any fields
            return Object.entries(edits).length !== 0;
        }

        getEditedBuilding() {
            if(this.isEdited()) {
                return Object.assign({}, this.props.building, this.state.buildingEdits);
            } else {
                return {...this.props.building};
            }
        }

        updateBuildingState(key: string, value: any) {
            const newBuilding = this.getEditedBuilding();
            newBuilding[key] = value;
            const [forwardPatch] = compareObjects(this.props.building, newBuilding);

            this.setState({
                buildingEdits: forwardPatch
            });
        }

        /**
         * Handle changes on typical inputs
         * - e.g. input[type=text], radio, select, textarea
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

        async handleSubmit(event) {
            event.preventDefault();
            this.setState({error: undefined});

            try {
                const res = await fetch(`/api/buildings/${this.props.building.building_id}.json`, {
                    method: 'POST',
                    body: JSON.stringify(this.state.buildingEdits),
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin'
                });
                const data = await res.json();
                
                if (data.error) {
                    this.setState({error: data.error})
                } else {
                    this.props.selectBuilding(data);
                }
            } catch(err) {
                this.setState({error: err});
            }
        }

        render() {
            if (this.props.mode === 'edit' && !this.props.user){
                return <Redirect to="/sign-up.html" />
            }

            const currentBuilding = this.getEditedBuilding();

            const values_to_copy = {}
            for (const key of Object.keys(this.state.keys_to_copy)) {
                values_to_copy[key] = currentBuilding[key]
            }
            const data_string = JSON.stringify(values_to_copy);
            const copy: CopyProps = {
                copying: this.state.copying,
                toggleCopying: this.toggleCopying,
                toggleCopyAttribute: this.toggleCopyAttribute,
                copyingKey: (key: string) => this.state.keys_to_copy[key]
            }
            return (
                <section
                    id={this.props.cat}
                    className="data-section">
                <ContainerHeader
                    {...this.props}
                    data_string={data_string}
                    copy={copy}
                />
                <div className="section-body">
                {
                    this.props.inactive ?
                        <Fragment>
                            <InfoBox
                                msg={`We're not collecting data on ${this.props.title.toLowerCase()} yet - check back soon.`}
                            />
                            <WrappedComponent
                                building={undefined}
                                building_like={undefined}
                                mode={this.props.mode}
                                copy={copy}
                                onChange={this.handleChange}
                                onCheck={this.handleCheck}
                                onLike={this.handleLike}
                                onUpdate={this.handleUpdate}
                            />
                        </Fragment> :
                        this.props.building != undefined ?
                            <form
                                action={`/edit/${this.props.cat}/${this.props.building.building_id}`}
                                method="POST"
                                onSubmit={this.handleSubmit}>
                                {
                                    (this.props.mode === 'edit' && !this.props.inactive) ?
                                        <Fragment>
                                            <ErrorBox msg={this.state.error} />
                                            {
                                                this.isEdited() && this.props.cat !== 'like' ? // special-case for likes
                                                    <div className="buttons-container with-space">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary">
                                                            Save
                                                        </button>
                                                    </div> :
                                                    null
                                            }
                                        </Fragment>
                                        : null
                                }
                                <WrappedComponent
                                    building={currentBuilding}
                                    building_like={this.props.building_like}
                                    mode={this.props.mode}
                                    copy={copy}
                                    onChange={this.handleChange}
                                    onCheck={this.handleCheck}
                                    onLike={this.handleLike}
                                    onUpdate={this.handleUpdate}
                                />
                            </form> :
                            <InfoBox msg="Select a building to view data"></InfoBox>
                }
                </div>
                </section>
            );
        }
    }
}

export default withCopyEdit;

export {
    CopyProps
};
