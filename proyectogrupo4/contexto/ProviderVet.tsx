import { View, Text } from 'react-native'
import React, { ReactNode, useContext, useState } from 'react'
import { ContexVet } from './ContexVet'

interface VistaComponente{
    children: ReactNode
}

export default function ProviderVet({children}:VistaComponente) {
    const [usuarioId, setUsuarioId] = useState<number>(0)
    const [mascotaId, setMascotaId] = useState<number>(0)

  return (
    <ContexVet.Provider value={{usuarioId, setUsuarioId, mascotaId, setMascotaId}}>
        {children}
    </ContexVet.Provider>
  )
}

export function useContexVet(){
    return useContext(ContexVet)
}