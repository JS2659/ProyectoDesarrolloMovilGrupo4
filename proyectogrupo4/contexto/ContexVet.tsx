import { createContext } from "react";

export const ContexVet = createContext({
    usuarioId: 0 as number,
    setUsuarioId: (usuarioId:number)=>{},
    mascotaId: 0 as number,
    setMascotaId: (mascotaId:number)=>{}
})