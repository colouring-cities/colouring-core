import React, { Fragment } from 'react';

const ErrorBox = (props) => (
    <Fragment>
        {
            (props.msg)?
            (
                <div className="alert alert-danger" role="alert">
                    {
                        (typeof props.msg === 'string' || props.msg instanceof String)?
                        props.msg
                        : 'Unexpected error'
                    }
                </div>
            ) : null
        }
    </Fragment>
);

export default ErrorBox;
