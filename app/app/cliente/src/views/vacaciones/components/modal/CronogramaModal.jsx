import React, { useState, useEffect, useMemo } from 'react'
import { BaseModal } from '../../../../ui'
import { useForm, useModalStore, useTrabStore, useCronogramaVacacionesStore, useRegimenStore } from '../../../../hooks'
import {
    Autocomplete,
    Box,
    Button,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { explicaciones } from './explicacionesReg'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '72%',
    overflow: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
}

const initialFormData = {
    id_trabajador: '',
    fecha_inicio: '',
    fecha_fin: '',
    fecha_solicitud: '',
    explicacion: '',
}

export const CronogramaModal = ({ titleModal }) => {
    const { closeModal } = useModalStore();
    const { trabajadores, startLoadingTrab } = useTrabStore()
    const { listReg, startLoadingReg } = useRegimenStore()
    const { activeCronograma, startSavingCronograma } = useCronogramaVacacionesStore();
    const [inputValue, setInputValue] = useState('');

    const formValidations = {
        id_trabajador: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
        fecha_inicio: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
        fecha_fin: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
        fecha_solicitud: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
    }

    const {
        id_trabajadorValid,
        fecha_inicioValid,
        fecha_finValid,
        fecha_solicitudValid,
        id_trabajador,
        fecha_inicio,
        fecha_fin,
        fecha_solicitud,
        explicacion,
        onInputChange,
        isFormValid,
        formState,
        onResetForm,
        setFormState
    } = useForm(initialFormData, formValidations);

    // Formatear fechas
    const formatearFecha = (fecha) => {
        // const fechaModificada = dayjs(fecha);

        const fechaModificada = dayjs(fecha).add(1, 'day');

        // Definir los nombres de los meses
        const meses = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];

        return `${fechaModificada.date()} de ${meses[fechaModificada.month()]} del ${fechaModificada.year()}`;
    };

    // Memoized trabajador y explicación
    const trabajadorInfo = useMemo(() => {
        if (!id_trabajador) return null;

        const trabajador = trabajadores.find(trab => trab.id === id_trabajador);
        if (!trabajador) return null;

        const regimen = listReg.find(cod => cod.regimen_laboral === trabajador.regimen_laboral);
        if (!regimen) return null;

        const explicacionDetallada = explicaciones.find(ex => ex.cod === regimen.cod_regimen);

        return {
            trabajador,
            mensajeExplicacion: explicacionDetallada
                ? `${explicacionDetallada.mensaje} ${formatearFecha(fecha_fin)}`
                : ''
        };
    }, [id_trabajador, trabajadores, listReg, fecha_fin, explicaciones]);

    // const handle_explicacion = () => {
    //     if (id_trabajador) {
    //         formState.explicacion = trabajadorInfo.mensajeExplicacion
    //     }
    // }

    // Handlers
    const onSubmit = () => {
        if (isFormValid) {
            // handle_explicacion()
            startSavingCronograma(formState);
            closeModal();
            onResetForm();
        } else {
            console.error("Error en el formulario");
        }
    }

    const handleCancelarEnvio = () => {
        closeModal();
        onResetForm();
    }

    // Efecto para cargar datos iniciales
    useEffect(() => {
        startLoadingTrab();
        startLoadingReg();
        if (activeCronograma) {
            setFormState({ ...activeCronograma[0] });
        }
    }, [activeCronograma, setFormState]);

    return (
        <BaseModal
            title={titleModal}
            style={style}
        >
            <Box>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}>
                    <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                        <Typography variant="h6">Datos del servidor</Typography>

                        {/* Información del Trabajador */}
                        <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                            {/* Selector de Trabajador */}
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <Autocomplete
                                    size='small'
                                    options={trabajadores}
                                    inputValue={inputValue || ''}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                    onChange={(e, valor) => onInputChange({
                                        target: {
                                            value: valor?.id || '',
                                            name: 'id_trabajador'
                                        }
                                    })}
                                    getOptionLabel={(option) => option.numero_identificacion}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Seleccione la cédula del servidor"
                                            error={id_trabajadorValid}
                                            helperText={id_trabajadorValid ? 'Seleccione un trabajador' : ''}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Campos de información del trabajador */}
                            {trabajadorInfo && (
                                <>
                                    <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                        <TextField
                                            size="small"
                                            label="Cédula"
                                            value={trabajadorInfo.trabajador.numero_identificacion || ''}
                                            fullWidth
                                            InputProps={{ readOnly: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                        <TextField
                                            size="small"
                                            label="Nombres"
                                            value={trabajadorInfo.trabajador.nombres || ''}
                                            fullWidth
                                            InputProps={{ readOnly: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                        <TextField
                                            size="small"
                                            label="Régimen Laboral"
                                            value={trabajadorInfo.trabajador.regimen_laboral || ''}
                                            fullWidth
                                            InputProps={{ readOnly: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                        <TextField
                                            size="small"
                                            label="Puesto que ocupa"
                                            value={trabajadorInfo.trabajador.denominacion_puesto || ''}
                                            fullWidth
                                            InputProps={{ readOnly: true }}
                                        />
                                    </Grid>
                                </>
                            )}
                        </Grid>

                        {/* Datos de Vacaciones */}
                        <Typography variant="h6" sx={{ mt: 2 }}>Datos de vacaciones</Typography>
                        <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                            {/* Fechas */}
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Fecha solicitud"
                                        format="D/M/YYYY"
                                        value={fecha_solicitud ? dayjs(fecha_solicitud) : null}
                                        onChange={(date) => onInputChange({
                                            target: {
                                                value: dayjs(date).format('YYYY-MM-DD'),
                                                name: 'fecha_solicitud'
                                            }
                                        })}
                                        slotProps={{
                                            textField: {
                                                size: 'small',
                                                error: fecha_solicitudValid,
                                                helperText: fecha_solicitudValid ? 'Fecha requerida' : ''
                                            }
                                        }}
                                        sx={{ width: '100%' }}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            {/* Otras fechas similares */}
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Fecha desde"
                                        format="D/M/YYYY"
                                        value={fecha_inicio ? dayjs(fecha_inicio) : null}
                                        onChange={(date) => onInputChange({
                                            target: {
                                                value: dayjs(date).format('YYYY-MM-DD'),
                                                name: 'fecha_inicio'
                                            }
                                        })}
                                        slotProps={{ textField: { size: 'small' } }}
                                        sx={{ width: '100%' }}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Fecha hasta"
                                        format="D/M/YYYY"
                                        value={fecha_fin ? dayjs(fecha_fin) : null}
                                        onChange={(date) => onInputChange({
                                            target: {
                                                value: dayjs(date).format('YYYY-MM-DD'),
                                                name: 'fecha_fin'
                                            }
                                        })}
                                        slotProps={{ textField: { size: 'small' } }}
                                        sx={{ width: '100%' }}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <TextField
                                    size="small"
                                    label="Días de vacaciones del servidor"
                                    value={trabajadorInfo?.trabajador.dias_vacaciones || ''}
                                    fullWidth
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                        </Grid>

                        {/* Explicación */}
                        {/* <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <TextField
                                    label="Explicación"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    value={explicacion || trabajadorInfo?.mensajeExplicacion || ''}
                                    onChange={(e) => {
                                        // Si el usuario modifica el campo, se guarda el valor ingresado
                                        onInputChange(e);

                                        // Si el valor de la explicacion es vacío y existe la explicacion automática, 
                                        // actualizamos el estado con el valor automático
                                        if (!explicacion && trabajadorInfo?.mensajeExplicacion) {
                                            onInputChange({
                                                target: {
                                                    name: 'explicacion',
                                                    value: trabajadorInfo.mensajeExplicacion
                                                }
                                            });
                                        }
                                    }}
                                    onBlur={(e) => {
                                        // Al salir del campo, aseguramos que se guarde el valor
                                        if (!explicacion && trabajadorInfo?.mensajeExplicacion) {
                                            onInputChange({
                                                target: {
                                                    name: 'explicacion',
                                                    value: trabajadorInfo.mensajeExplicacion
                                                }
                                            });
                                        }
                                    }}
                                    name="explicacion"
                                />
                            </Grid>
                        </Grid> */}

                        <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <TextField
                                    label="Explicación"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    value={explicacion || trabajadorInfo?.mensajeExplicacion || ''}
                                    onChange={onInputChange}
                                    name='explicacion'
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    {/* Botones de acción */}
                    <Stack
                        direction='row'
                        spacing={2}
                        justifyContent="flex-end"
                    >
                        <Button
                            variant="outlined"
                            onClick={handleCancelarEnvio}
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant="contained"
                            disabled={!isFormValid}
                            onClick={onSubmit}
                        >
                            Guardar
                        </Button>
                    </Stack>
                </form>
            </Box>
        </BaseModal >
    )
}