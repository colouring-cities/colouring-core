import React, { Fragment } from 'react';

interface ErrorBoxProps {
    msg: string;
}

const ErrorBox: React.FC<ErrorBoxProps> = (props) => {
    if (props.msg) {
        console.error(props.msg);
    }
    return (
        <Fragment>
            {
                (props.msg)?
                    (
                        <div className="alert alert-danger" role="alert">
                            {
                                typeof props.msg === 'string' ?
                                    props.msg
                                    : 'Unexpected error'
                            }
                        </div>
                    ) : null
            }
        </Fragment>
    );
};

export default ErrorBox;
