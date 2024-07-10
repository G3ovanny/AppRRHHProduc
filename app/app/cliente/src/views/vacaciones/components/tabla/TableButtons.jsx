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

        for (let i = 0; i < activeCronograma.length; i++) {

            if (accionUltimoId) {
                contUltiAccion = accionUltimoId.contador + 1
            } else {
                contUltiAccion = 1
            }

            const sigCont = contUltiAccion + i
            const element = activeCronograma[i];
            const estadoAccion = element.estado_accion

            if (estadoAccion !== true) {
                let lista_trabajadores = trabajadores.filter(trab => trab.id === element.id_trabajador)
                let trabajador = lista_trabajadores[0]
                const formDataAccion = {
                    id_trabajador: element.id_trabajador,
                    proceso_actual: trabajador.proceso[0],
                    subproceso_actual: trabajador.unidad_organica,
                    puesto_actual: trabajador.denominacion_puesto,
                    rmu_actual: trabajador.rmu_puesto,
                    estructura_actual: trabajador.estructura_programatica,
                    partida_actual: trabajador.partida_individual,

                    fecha_accion: dayjs(Date.now()).format('YYYY-MM-DD'),
                    fecha_rigue: activeCronograma[i].fecha_inicio,
                    tipo_accion: 'VACACIONES',
                    contador: sigCont
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
