import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function ErrorBox(props){
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
                                (typeof props.msg === 'string' || props.msg instanceof String)?
                                    props.msg
                                    : 'Unexpected error'
                            }
                        </div>
                    ) : null
            }
        </Fragment>
    );
}

ErrorBox.propTypes = {
    msg: PropTypes.string
}

export default ErrorBox;
