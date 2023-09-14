import { read, readFile, utils, write } from 'xlsx'
import { distributivo } from './distributivo';



export const docListTrab = (archivo) => {
    const { listReg } = distributivo()
    return new Promise((resolve, reject) => {
        const lector = new FileReader();
        lector.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = read(data, { type: 'array' });
            const ws = workbook.Sheets[workbook.SheetNames[0]];
            const dato = utils.sheet_to_json(ws)

            for (const dataFile of dato) {
                const codigoRegimen = (dataFile.cod_regimen)
                const codigoNivel = (dataFile.cod_nivel)
                const codigoModalidad = (dataFile.cod_modalidad)
                const codigoDenominacion = (dataFile.cod_denominacion_puesto)
                const codigoUnidad = (dataFile.cod_unidad_organica)

                console.log('regimen', codigoRegimen)
                console.log('lista', listReg)
                //console.log('nivel', codigoNivel)
                //console.log('modalidad', codigoModalidad)
                //console.log('denominacion', codigoDenominacion)
                //console.log('unidad', codigoUnidad)
            }

            resolve(dato)
        };
        lector.onerror = (error) => {
            reject(error)
        };
        lector.readAsArrayBuffer(archivo)
    })

};
