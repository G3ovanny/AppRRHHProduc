
import React, { useEffect } from 'react'
import { useDenominacionPuestoStore, useModalidadLaboralStore, useNivelOcuStore, useRegimenStore, useUnidadOrganicaStore, useEstructuraProgramaticaStore } from '../hooks/distributivo';

export const distributivo = () => {
    //Regimen Laboral
    const { listReg, startLoadingReg } = useRegimenStore();
    useEffect(() => {
        startLoadingReg();
    }, [])

    //Nivel Ocupacional
    const { listNivel, startLoadingNivel } = useNivelOcuStore();
    useEffect(() => {
        startLoadingNivel();
    }, [])

    //Modadlidad Organica
    const { listModalidad, startLoadingModalidad } = useModalidadLaboralStore();
    useEffect(() => {
        startLoadingModalidad();
    }, [])

    //Unidad Organica
    const { listUnidad, startLoadingUnidad } = useUnidadOrganicaStore();
    useEffect(() => {
        startLoadingUnidad();
    }, [])

    //Denominacion puesto
    const { listDenominacion, startLoadingDenominacion } = useDenominacionPuestoStore();
    useEffect(() => {
        startLoadingDenominacion();
    }, [])

    const { listEstructura, startLoadingEstructura} = useEstructuraProgramaticaStore();
    useEffect(()=>{
        startLoadingEstructura()
    })
    
    return {
        listReg,
        listNivel,
        listModalidad,
        listUnidad,
        listDenominacion,
        listEstructura,
    }
}
