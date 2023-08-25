import { useRef } from 'react'
import { IconButton, Tooltip } from '@mui/material';
import { DeleteOutline, Edit, EditOutlined, LocalPrintshopOutlined, NoteAddOutlined } from '@mui/icons-material';
import { useAccionPersonalStore, useCronogramaVacacionesStore, useForm, useModalStore } from '../../../../hooks'
import { VacacionesDocPdf } from '../documentoPDF';
import { useReactToPrint } from 'react-to-print'
import dayjs from 'dayjs';


export const TableButtons = () => {
    const { activeCronograma, startSavingCronograma, startDeletingCrongrama } = useCronogramaVacacionesStore();
    const { startLoadingAccion, listAccion, startSavingAccion } = useAccionPersonalStore();
    const { openModal } = useModalStore();

    const componentRef = useRef();
    const numActivos = activeCronograma.length;


    const handleAccion = () => {

        startLoadingAccion()
        const unltAccion = listAccion[listAccion.length - 1]
        let contUltiAccion

        for (let i = 0; i < activeCronograma.length; i++) {

            if (unltAccion) {
                contUltiAccion = unltAccion.contador + 1
            } else {
                contUltiAccion = 1
            }

            const sigCont = contUltiAccion + i

            const element = activeCronograma[i];
            const estadoAccion = element.estado_accion

            if (estadoAccion == false) {
                const formDataAccion = {
                    id_trabajador: element.id_trabajador,
                    fecha_accion: dayjs(Date.now()).format('YYYY-MM-DD'),
                    fecha_rigue: dayjs(Date.now()).format('YYYY-MM-DD'),
                    tipo_accion: 'VACACIONES',
                    contador: sigCont
                }
                startSavingAccion(formDataAccion)
                const formDataCronograma = {
                    ...element,
                    estado_accion: true
                }
                startSavingCronograma(formDataCronograma)
            } else {
                console.log('La acción de personal ya esta creada')
            }
        }
    }

    const handleEdit = () => {
        openModal('Editando datos')
    }

    const handleDelete = () => {
        startDeletingCrongrama()
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

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
        </>
    )
}
