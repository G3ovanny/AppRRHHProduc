import * as XLSX from 'xlsx';
import dayjs from 'dayjs';


export const DocExcel = (activeAccion) => {

    const fechaDownload = dayjs()

    const handleDownload = () => {
        let tabla = [
            {
                A: "id",
                B: "contador",
                C: "numero_identidad",
                D: "apellido_paterno",
                E: "apellido_materno",
                F: "nombres",
                G: "fecha_rigue",
                H: "tipo_accion",
                I: "otro_tipo",
            }
        ]
        activeAccion.forEach((accion) => {
            tabla.push({
                A: accion.id,
                B: accion.contador,
                C: accion.numero_identidad,
                D: accion.apellido_paterno,
                E: accion.apellido_materno,
                F: accion.nombres,
                G: accion.fecha_rigue,
                H: accion.tipo_accion,
                I: accion.otro_tipo,
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
