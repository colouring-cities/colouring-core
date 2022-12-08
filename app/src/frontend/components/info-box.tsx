import React from 'react';

interface InfoBoxProps {
    msg?: string;
    // https://react-bootstrap.github.io/components/alerts/
    // predefined valid values
    type?: 'info' | 'warning' | 'success' | 'danger' | 'dark'
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
