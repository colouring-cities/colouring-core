import React from 'react';

interface InfoBoxProps {
    msg?: string;
    type?: 'info' | 'warning'
}

const InfoBox: React.FC<InfoBoxProps> = ({msg, children, type = 'info'}) => (
    <>
        {
            (msg || children) &&
                <div className={`alert alert-${type}`} role="alert">
                    { msg ?? '' }
                    { children }
                </div>
        }
    </>
);

export default InfoBox;
