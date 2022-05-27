import React, { Component, Fragment } from 'react';
import { VerifyIcon } from '../../components/icons';

import './verification.css';

interface VerificationProps {
    slug: string;
    onVerify: (slug: string, verify: boolean, x: number, y: number) => void;
    user_verified: boolean;
    user_verified_as: string;
    verified_count: number;
    allow_verify: boolean;
}


class Verification extends Component<VerificationProps, any> {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(verify) {
        return (e) => {
            e.preventDefault();
            const x = e.clientX / document.body.clientWidth;
            const y = e.clientY / document.body.clientHeight;
            this.props.onVerify(this.props.slug, verify, x, y);
        }
    }

    render() {
        const props = this.props;
        let user_verified_as = props.user_verified_as;
        if (typeof user_verified_as === 'boolean') {
            user_verified_as = user_verified_as? 'Yes': 'No';
        }
        return (
        <div className="verification-container">
            <span
                className="verification-status"
                title={`Verified by ${props.verified_count} ${(props.verified_count == 1)? "person": "people"}`}
                >
                <VerifyIcon />
                {props.verified_count || 0}
            </span>
            {
                props.user_verified?
                    <Fragment>
                        Verified as
                        "<span>{user_verified_as}</span>"
                        <button
                            className="btn btn-danger"
                            title="Remove my verification"
                            disabled={!props.allow_verify}
                            onClick={this.handleClick(false)}>
                            Remove
                        </button>
                    </Fragment>
                :
                    <Fragment>
                        <button
                            className="btn btn-success"
                            title="Confirm that the current value is correct"
                            disabled={!props.allow_verify}
                            onClick={this.handleClick(true)}>
                            Verify
                        </button>
                    </Fragment>
            }
        </div>
        );
    }
}

export default Verification;