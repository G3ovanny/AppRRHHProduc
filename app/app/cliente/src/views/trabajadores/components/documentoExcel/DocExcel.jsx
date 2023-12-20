
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';

export const DocExcel = (activeTrab) => {
    const fechaDownload = dayjs()
    const handleDownload = () => {
        let tabla = [
            {
                A: 'numero_identificacion',
                B: 'nombres',
                C: 'correo_institucional',
                D: 'correo_personal',
                E: 'celular',
                F: 'denominacion_puesto',
                G: 'dias_vacaciones',
                H: 'direccion_domicilio',
                I: 'discapacidad',
                J: 'estado_maternidad',
                K: 'estructura_programatica',
                L: 'etnia',
                M: 'fecha_fin',
                N: 'fecha_inicio',
                O: 'fecha_nacimiento',
                P: 'genero',
                Q: 'modalidad_laboral',
                R: 'nivel_ocupacional',
                S: 'partida_individual',
                T: 'proceso',
                U: 'regimen_laboral',
                V: 'rmu_puesto',
                w: 'unidad_organica',
            }
        ]
        activeTrab.forEach((accion) => {

            tabla.push({
                A: accion.numero_identificacion,
                B: accion.nombres,
                C: accion.correo_institucional,
                D: accion.correo_personal,
                E: accion.celular,
                F: accion.denominacion_puesto,
                G: accion.dias_vacaciones,
                H: accion.direccion_domicilio,
                I: accion.discapacidad,
                J: accion.estado_maternidad,
                K: accion.estructura_programatica,
                L: accion.etnia,
                M: accion.fecha_fin,
                N: accion.fecha_inicio,
                O: accion.fecha_nacimiento,
                P: accion.genero,
                Q: accion.modalidad_laboral,
                R: accion.nivel_ocupacional,
                S: accion.partida_individual,
                T: accion.proceso,
                U: accion.regimen_laboral,
                V: accion.rmu_puesto,
                w: accion.unidad_organica,
            })
        });

        const data = [...tabla];
        setTimeout(() => {
            crearDoc(data);
        }, 1000);

    }

    const crearDoc = (data) => {

        const libro = XLSX.utils.book_new();
        const hoja = XLSX.utils.json_to_sheet(data, { skipHeader: true });


        XLSX.utils.book_append_sheet(libro, hoja, "TrabajadoresSistemaTH");
        XLSX.writeFile(libro, `${fechaDownload}.xlsx`)
    }

    handleDownload()
}
