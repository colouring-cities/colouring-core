import React from 'react'

export function FieldRow({children}) {
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', justifyItems: 'left'}}>
            {children}
        </div>
    )
}
