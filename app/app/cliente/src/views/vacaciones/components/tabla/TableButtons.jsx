import { useEffect, useRef, useState } from 'react'
import { IconButton, Tooltip } from '@mui/material';
import { DeleteOutline, Edit, EditOutlined, LocalPrintshopOutlined, NoteAddOutlined } from '@mui/icons-material';
import { useAccionPersonalStore, useAlertDialogStore, useCronogramaVacacionesStore, useForm, useModalStore, useTrabStore } from '../../../../hooks'
import { VacacionesDocPdf } from '../documentoPDF';
import { useReactToPrint } from 'react-to-print'
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { AlertDialog } from '../../../../ui';


export const TableButtons = () => {

    const { activeCronograma, startSavingCronograma, startDeletingCrongrama, setChangeMessageCronograma } = useCronogramaVacacionesStore();
    const { startLoadingAccion, listAccion, startSavingAccion } = useAccionPersonalStore();
    const { trabajadores, startLoadingTrab } = useTrabStore();
    const { openModal } = useModalStore();
    const { openAlertDialog, closeAlertDialog } = useAlertDialogStore();
    const [deleteConfirmation, setDeleteConfirmation] = useState(false); // Estado para controlar la apertura de la alerta
    const content = '¿Está seguro que quiere eliminar el registro?';
    
    const componentRef = useRef();
    const numActivos = activeCronograma.length;


    const ultAccion = () => {
        if (listAccion.length > 0) {
            let ultimoID = -1;
            for (let i = 0; i < listAccion.length; i++) {
                if (listAccion[i].id > ultimoID) {
                    ultimoID = listAccion[i].id;
                }
            }

            const accionUltimoId = listAccion.find(accion => accion.id === ultimoID);
            const accionCont = accionUltimoId.contador
            return accionCont
        } else {
            const accionCont = 0
            return accionCont
        }
    }

    const handleAccion = async () => {

        const accionUltimoId = ultAccion()

        let contUltiAccion

        const handle_explicacion = (inicio, fin, total_dias) => {
            const fecha_inicio = dayjs(inicio)
            const fecha_fin = dayjs(fin)
            const fecha_reincorporacion = dayjs(fin).add(1,'day')

            const explicacionAccionVacaciones = 'En cumplimiento de la normativa vigente, se autoriza el uso de vacaciones,' 
            const reincorporacion = 'Debiendo reincorporarse a sus actividades el día'
            // desde el 26 al 28 de noviembre del 2024, por un total de 3 días. Debiendo reincorporarse a sus actividades el viernes 29 de noviembre del  2024.'

            const dias = [
                'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado','domingo'
            ]
            const meses = [
                'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
            ];

            return `${explicacionAccionVacaciones} desde el ${fecha_inicio.date()} de ${meses[fecha_inicio.month()]} del ${fecha_inicio.year()} hasta el ${fecha_fin.date()} de ${meses[fecha_fin.month()]} del ${fecha_fin.year()} por un total de ${total_dias} días, ${reincorporacion} ${dias[fecha_reincorporacion.day()]} ${fecha_reincorporacion.date()} de ${meses[fecha_reincorporacion.month()]} del ${fecha_reincorporacion.year()}`;
        }

        for (let i = 0; i < activeCronograma.length; i++) {

            if (accionUltimoId) {
                contUltiAccion = accionUltimoId.contador + 1
            } else {
                contUltiAccion = 1
            }

            const sigCont = contUltiAccion + i
            const element = activeCronograma[i];
            const estadoAccion = element.estado_accion
            const dias = activeCronograma[i].min_acumulados / 480

            if (estadoAccion !== true) {
                let lista_trabajadores = trabajadores.filter(trab => trab.id === element.id_trabajador)
                let trabajador = lista_trabajadores[0]
                console.log(handle_explicacion(activeCronograma[i].fecha_inicio,activeCronograma[i].fecha_fin,dias))
                const formDataAccion = {
                    id_trabajador: element.id_trabajador,
                    proceso_actual: trabajador.proceso[0],
                    subproceso_actual: trabajador.unidad_organica,
                    puesto_actual: trabajador.denominacion_puesto,
                    rmu_actual: trabajador.rmu_puesto,
                    estructura_actual: trabajador.estructura_programatica,
                    partida_actual: trabajador.partida_individual,
                    escala_ocupacional_actual:trabajador.escala_ocupacional,
                    grado_actual: trabajador.grado,

                    // fecha_accion: dayjs(Date.now()).format('YYYY-MM-DD-HH-MM'),
                    fecha_accion: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    fecha_rigue: activeCronograma[i].fecha_inicio,
                    fecha_rigue_hasta: activeCronograma[i].fecha_fin,
                    tipo_accion: 'VACACIONES',
                    // explicacion: activeCronograma[i].explicacion,
                    contador: sigCont,
                    explicacion : handle_explicacion(activeCronograma[i].fecha_inicio,activeCronograma[i].fecha_fin, dias)
                }
                try {

                    await startSavingAccion(formDataAccion)
                    const formDataCronograma = {
                        ...element,
                        estado_accion: true
                    }
                    startSavingCronograma(formDataCronograma)
                } catch (error) {
                    console.log(error)
                }
            } else {
                const mensaje = 'La acción de personal ya esta creada'
                setChangeMessageCronograma(mensaje)
            }
        }
    }

    const handleEdit = () => {
        openModal('Editando datos')
    }

    const handleDelete = () => {
        openAlertDialog(content);
        // startDeletingCrongrama()
    }

    const handleConfirmation = () => {
        startDeletingCrongrama();
        closeAlertDialog();
        setDeleteConfirmation(false); // Reinicia el estado de confirmación de eliminación
    };


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    useEffect(() => {
        startLoadingTrab()
        startLoadingAccion()
    }, [])


    return (
        <>
            {
                numActivos !== 1 ? (
                    <>
                        <Tooltip title="Crear Acción de personal" color='secondary'>
                            <IconButton
                                component='div'
                                disabled={!numActivos}
                                onClick={handleAccion}
                            >
                                <NoteAddOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Imprimir" color='secondary'>
                            <IconButton
                                component='div'
                                disabled={!numActivos}
                                onClick={handlePrint}
                            >
                                <LocalPrintshopOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="Eliminar"
                            color="error"
                        >
                            <IconButton
                                component='div'
                                disabled={!numActivos}
                                onClick={handleDelete}
                            >
                                <DeleteOutline />
                            </IconButton>
                        </Tooltip>
                        <div style={{ display: "none" }} >
                            <VacacionesDocPdf ref={componentRef} />
                        </div>
                    </>
                ) : (
                    <>
                        <Tooltip title="Crear Acción de personal" color='secondary'>
                            <IconButton
                                onClick={handleAccion}
                            >
                                <NoteAddOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Imprimir" color='secondary'>
                            <IconButton
                                onClick={handlePrint}
                            >
                                <LocalPrintshopOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="ELiminar" color="error">
                            <IconButton
                                onClick={handleDelete}
                            >
                                <DeleteOutline />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar" color='secondary'>
                            <IconButton
                                onClick={handleEdit}
                            >
                                <EditOutlined />
                            </IconButton>
                        </Tooltip>

                        <div style={{ display: "none" }} >
                            <VacacionesDocPdf ref={componentRef} />
                        </div>
                    </>

                )}
            <AlertDialog
                open={deleteConfirmation}
                onClose={() => setDeleteConfirmation(false)}
                onConfirm={handleConfirmation}
                title="Confirmar Eliminación"
                content={content}
            />
        </>
    )
}
