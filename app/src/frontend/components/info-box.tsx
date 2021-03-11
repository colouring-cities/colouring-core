import React from 'react';

interface InfoBoxProps {
    msg?: string;
}

const InfoBox: React.FC<InfoBoxProps> = (props) => (
    <>
        {
            (props.msg || props.children) &&
                <div className="alert alert-info" role="alert">
                    { props.msg ?? '' }
                    { props.children }
                </div>
        }
    </>
);

export default InfoBox;
