import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect, NavLink } from 'react-router-dom';

import ContainerHeader from './container-header';
import ErrorBox from '../components/error-box';
import InfoBox from '../components/info-box';
import { CopyControl } from './header-buttons/copy-control';
import { ViewEditControl } from './header-buttons/view-edit-control';
import { Building } from '../models/building';
import { User } from '../models/user';
import { compareObjects } from '../helpers';
import { CategoryViewProps, CopyProps } from './data-containers/category-view-props';

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
    currentBuildingRevisionId: number;
    buildingEdits: Partial<Building>;
}

/**
 * Shared functionality for view/edit forms
 *
 * See React Higher-order-component docs for the pattern
 * - https://reactjs.org/docs/higher-order-components.html
 *
 * @param WrappedComponent
 */
const withCopyEdit = (WrappedComponent: React.ComponentType<CategoryViewProps>) => {
    return class DataContainer extends React.Component<DataContainerProps, DataContainerState> {
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
                currentBuildingId: undefined,
                currentBuildingRevisionId: undefined
            };

            this.handleChange = this.handleChange.bind(this);
            this.handleReset = this.handleReset.bind(this);
            this.handleLike = this.handleLike.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);

            this.toggleCopying = this.toggleCopying.bind(this);
            this.toggleCopyAttribute = this.toggleCopyAttribute.bind(this);
        }

        static getDerivedStateFromProps(props, state) {
            const newBuildingId = props.building == undefined ? undefined : props.building.building_id;
            const newBuildingRevisionId = props.building == undefined ? undefined : props.building.revision_id;
            if(newBuildingId !== state.currentBuildingId || newBuildingRevisionId > state.currentBuildingRevisionId) {
                return {
                    error: undefined,
                    copying: false,
                    keys_to_copy: {},
                    buildingEdits: {},
                    currentBuildingId: newBuildingId,
                    currentBuildingRevisionId: newBuildingRevisionId
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

        clearEdits() {
            this.setState({
                buildingEdits: {}
            });
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
         * Handle update directly
         * - e.g. as callback from MultiTextInput where we set a list of strings
         *
         * @param {String} name
         * @param {*} value
         */
        handleChange(name: string, value: any) {
            this.updateBuildingState(name, value);
        }

        handleReset() {
            this.clearEdits();
        }

        /**
         * Handle likes separately
         * - like/love reaction is limited to set/unset per user
         *
         * @param {*} event
         */
        async handleLike(like: boolean) {
            try {
                const res = await fetch(`/api/buildings/${this.props.building.building_id}/like.json`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify({like: like})
                });
                const data = await res.json();
                
                if (data.error) {
                    this.setState({error: data.error})
                } else {
                    this.props.selectBuilding(data);
                    this.updateBuildingState('likes_total', data.likes_total);
                }
            } catch(err) {
                this.setState({error: err});
            }
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

            const headerBackLink = `/${this.props.mode}/categories${this.props.building != undefined ? `/${this.props.building.building_id}` : ''}`;
            const edited = this.isEdited();

            return (
                <section
                    id={this.props.cat}
                    className="data-section">
                <ContainerHeader
                    cat={this.props.cat}
                    backLink={headerBackLink}
                    title={this.props.title}
                >
                {
                    this.props.help && !copy.copying?
                        <a
                            className="icon-button help"
                            title="Find out more"
                            href={this.props.help}>
                            Info
                        </a>
                    : null
                }
                {
                    this.props.building != undefined && !this.props.inactive ?
                        <>
                            <CopyControl
                                cat={this.props.cat}
                                data_string={data_string}
                                copying={copy.copying}
                                toggleCopying={copy.toggleCopying}
                            />
                            {
                                !copy.copying ?
                                <>
                                    <NavLink
                                        className="icon-button history"
                                        to={`/${this.props.mode}/${this.props.cat}/${this.props.building.building_id}/history`}
                                    >History</NavLink>
                                    <ViewEditControl
                                        cat={this.props.cat}
                                        mode={this.props.mode}
                                        building={this.props.building}
                                    />
                                </>
                                :
                                null
                            }
                        </>
                    : null
                }
                </ContainerHeader>
                <div className="section-body">
                {
                    this.props.inactive ?
                        <Fragment>
                            <InfoBox
                                msg={`We're not collecting data on ${this.props.title.toLowerCase()} yet - check back soon.`}
                            />
                            <WrappedComponent
                                intro={this.props.intro}
                                building={undefined}
                                building_like={undefined}
                                mode={this.props.mode}
                                copy={copy}
                                onChange={this.handleChange}
                                onLike={this.handleLike}
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
                                                this.props.cat !== 'like' ? // special-case for likes
                                                    <div className="buttons-container with-space">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary"
                                                            disabled={!edited}
                                                            aria-disabled={!edited}>
                                                            Save
                                                        </button>
                                                        {
                                                            edited ?
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-warning"
                                                                    onClick={this.handleReset}
                                                                    >
                                                                    Discard changes
                                                                </button> :
                                                                null
                                                        }
                                                    </div> :
                                                    null
                                            }
                                        </Fragment>
                                        : null
                                }
                                <WrappedComponent
                                    intro={this.props.intro}
                                    building={currentBuilding}
                                    building_like={this.props.building_like}
                                    mode={this.props.mode}
                                    copy={copy}
                                    onChange={this.handleChange}
                                    onLike={this.handleLike}
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