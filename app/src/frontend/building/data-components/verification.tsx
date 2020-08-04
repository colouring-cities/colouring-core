import React, { Fragment } from 'react';
import { VerifyIcon } from '../../components/icons';

import './verification.css';

interface VerificationProps {
    slug: string;
    onVerify: (slug: string, verify: boolean) => void;
    user_verified: boolean;
    user_verified_as: string;
    verified_count: number;
    allow_verify: boolean;
}

const Verification: React.FunctionComponent<VerificationProps> = (props) => (
    <div className="verification-container">
        <span
            className="verification-status"
            title={`Verified by ${props.verified_count} ${(props.verified_count == 1)? "person": "people"}`}
            >
            <VerifyIcon />
            {props.verified_count}
        </span>
        {
            props.allow_verify?
                props.user_verified?
                    <Fragment>
                        Verified as
                        "<span>{props.user_verified_as}</span>"
                        <button
                            className="btn btn-danger"
                            title="Remove my verification"
                            onClick={(e) => {
                                e.preventDefault();
                                props.onVerify(props.slug, false)
                            }}>
                            Remove
                        </button>
                    </Fragment>
                :
                    <Fragment>
                        <button
                            className="btn btn-success"
                            title="Confirm that the current value is correct"
                            onClick={(e) => {
                                e.preventDefault();
                                props.onVerify(props.slug, true)
                            }}>
                            Verify
                        </button>
                    </Fragment>
            : null
        }
    </div>
);

export default Verification;