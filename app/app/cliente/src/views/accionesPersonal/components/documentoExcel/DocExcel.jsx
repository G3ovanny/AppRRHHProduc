import * as XLSX from 'xlsx';
import dayjs from 'dayjs';


export const DocExcel = (activeAccion) => {
    console.log(activeAccion);
    const fechaDownload = dayjs()

    const handleDownload = () => {
        let tabla = [
            {
                A: "id",
                B: "CONTADOR",
                C: "CEDULA",
                D: "APELLIDO PATERNO",
                E: "APELLIDO MATERNO",
                F: "NOMBRES",
                G: "TIPO DE ACCION",
                H: "FECHA RIGE",
                I: "FECHA ACCION",
                J: "FECHA DE CREACION"
            }
        ]
        activeAccion.forEach((accion) => {
            const tipo_accion = accion.tipo_accion
            const otro_tipo_accion = accion.otro_tipo
            let tipo = ''
            const created_date = dayjs(accion.created_date).format("D/M/YYYY - HH:mm")
            
            if (tipo_accion === "OTRO" && otro_tipo_accion){
                tipo = otro_tipo_accion
            }else{
                tipo = tipo_accion
            }

            tabla.push({
                A: accion.id,
                B: accion.contador,
                C: accion.numero_identidad,
                D: accion.apellido_paterno,
                E: accion.apellido_materno,
                F: accion.nombres,
                G: tipo,
                H: accion.fecha_rigue,
                I: accion.fecha_accion,
                J: created_date,
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
        XLSX.utils.book_append_sheet(libro, hoja, "Acciones de personal");
        const nombreArchivo = `Acciones_personal_${fechaDownload}.xlsx`;
        XLSX.writeFile(libro, nombreArchivo)

    }
    handleDownload()
}
