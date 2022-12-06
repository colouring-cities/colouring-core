import React from 'react'

type MapLayerContextType = {
    context: 'enabled' | 'disabled',
    setContext: React.Dispatch<React.SetStateAction<string | null>>
}

const iMapLayerContextType = {
   context: null,
   setContext: () => {}
}

const MapLayerContext = React.createContext<MapLayerContextType>(iMapLayerContextType)

export default MapLayerContext