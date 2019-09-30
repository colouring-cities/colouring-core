import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const InfoBox = (props) => (
    <Fragment>
        {
            (props.msg || props.children)?
                (
                    <div className="alert alert-info" role="alert">
                        {
                            (typeof props.msg === 'string' || props.msg instanceof String)?
                                props.msg
                                : 'Enjoy the colouring! Usual service should resume shortly.'
                        }
                        {
                            props.children
                        }
                    </div>
                ) : null
        }
    </Fragment>
);

InfoBox.propTypes = {
    msg: PropTypes.string,
    children: PropTypes.node
}

export default InfoBox;
