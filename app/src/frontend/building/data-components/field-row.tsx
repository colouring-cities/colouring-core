import React, { PropsWithChildren } from 'react'

import './field-row.css';

export function FieldRow({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
        <div className="field-row">
            {children}
        </div>
    )
}
