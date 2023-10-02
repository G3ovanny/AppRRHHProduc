import * as XLSX from 'xlsx';
import dayjs from 'dayjs';

export const DocExcel = (activePermiso) => {

    const fechaDownload = dayjs()
    const handleDownload = () => {

        let tabla = [
            {
                A: "id",
                B: "numero_identificacion",
                C: "nombres",
                D: "motivo",
                E: "detalle",
                F: "fecha_hora_salida",
                G: "fecha_hora_llegada",
                H: "certificado_medico",
                I: "min_acumulados",
            }
        ]

        activePermiso.forEach((permiso) => {
            const fecha_salida = dayjs(permiso.fecha_hora_salida).format("D/M/YYYY - HH:mm")
            const fecha_llegada = dayjs(permiso.fecha_hora_llegada).format("D/M/YYYY - HH:mm")

            tabla.push({
                A: permiso.id,
                B: permiso.numero_identificacion,
                C: permiso.nombres,
                D: permiso.motivo,
                E: permiso.detalle,
                F: fecha_salida,
                G: fecha_llegada,
                H: permiso.certificado_medico,
                I: permiso.min_acumulados,
            })
        });

        const data = [...tabla];
        setTimeout(() => {
            crearDoc(data);
        }, 1000);
    }

    const crearDoc = (data) => {

        let suma = 0;
        for (let i = 1; i < data.length; i++) {
            suma = suma + data[i].I;
        }

        // // Calcula las horas y los minutos
        // const horas = Math.floor(suma / 60);
        // const minutosRestantes = suma % 60;

        // // Crea un objeto dayjs con la cantidad de tiempo
        // const tiempo = dayjs().hour(horas).minute(minutosRestantes);

        // // Formatea el tiempo en el formato deseado (HH:mm)
        // const formatoHora = tiempo.format('HH:mm');

        const dias = Math.floor(suma / 1440); // 1440 minutos en un día
        const horasRestantes = Math.floor((suma % 1440) / 60); // Horas restantes
        const minutosRestantes = suma % 60; // Minutos restantes

        // Crea un objeto dayjs con la cantidad de tiempo
        const tiempo = dayjs()
            .day(dias)
            .hour(horasRestantes)
            .minute(minutosRestantes);

        // Formatea el tiempo en el formato deseado (D días, HH:mm)
        const formatoTiempo = `${dias} días, ${tiempo.format('HH:mm')} horas`;

        const libro = XLSX.utils.book_new();
        const hoja = XLSX.utils.json_to_sheet(data, { skipHeader: true });

        XLSX.utils.sheet_add_aoa(hoja, [
            [, , , , , , , "Total en horas", formatoTiempo,]
        ], { origin: -1 });
        XLSX.utils.book_append_sheet(libro, hoja, "Permisos");
        XLSX.writeFile(libro, `${fechaDownload}.xlsx`)
    }

    handleDownload()
}
