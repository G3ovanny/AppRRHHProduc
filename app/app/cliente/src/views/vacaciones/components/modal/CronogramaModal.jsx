import { useState, useEffect } from 'react'
import { BaseModal } from '../../../../ui'
import { useForm, useModalStore, useTrabStore, useCronogramaVacacionesStore, useRegimenStore } from '../../../../hooks'
import { Autocomplete, Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Toolbar, Typography } from '@mui/material'
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
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
    //border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
}

const formData = {
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

    let component = null;
    let trabajador = [];

    let mensajeExplicacion = '';

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
    } = useForm(formData, formValidations);

    const onSubmit = () => {
        if (isFormValid) {
            startSavingCronograma(formState)
            closeModal()
            onResetForm()
        } else {
            console.log("Error en el formulario")
        }
    }
    const handleCancelarEnvio =()=>{
        closeModal()
        onResetForm()
    }
    useEffect(() => {
        startLoadingTrab()
        startLoadingReg()
        if (activeCronograma !== null) {
            setFormState({ ...activeCronograma[0] });
        }
    }, [activeCronograma])

    if (id_trabajador) {
        let lista_trabajadores = trabajadores.filter(trab => trab.id === id_trabajador)
        trabajador = lista_trabajadores[0]

        const regim = trabajador.regimen_laboral
        const regimen = listReg.filter(cod => cod.regimen_laboral == regim)
        const codRegimen = regimen[0].cod_regimen
        const explicacion = explicaciones.filter(ex => ex.cod == codRegimen)
        mensajeExplicacion = explicacion[0].mensaje
        //+ ' ' + fecha_solicitud + '.'
        component = {
        }
    } else {
        const mensaje = "Ingrese la cédula del servidor"
        component = {

        }
    }

    return (
        <BaseModal
            title={titleModal}
            style={style}
        >
            <Box>
                <form onSubmit={onSubmit}>
                    <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                        <Typography>Datos del servidor</Typography>
                        <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <Autocomplete
                                    error= {id_trabajadorValid}
                                    size='small'
                                    options={trabajadores}
                                    inputValue={inputValue || ''}
                                    onInputChange={(event, newInputValue) => { setInputValue(newInputValue); }}
                                    onChange={(e, valor) => onInputChange({ target: { value: valor.id || '', name: 'id_trabajador' } })}
                                    getOptionLabel={(options) => options.numero_identificacion}
                                    renderInput={(params) => <TextField {...params} label="Seleccione la cédula del servidor" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <TextField sx={{ minWidth: 180 }} size="small"
                                    error = {id_trabajadorValid !== null}
                                    id="cedula"
                                    label="Cédula"
                                    defaultValue={trabajador.numero_identificacion}
                                    readOnly
                                    fullWidth
                                    value={trabajador.numero_identificacion || ''}
                                    onChange={onInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                <TextField sx={{ minWidth: 180 }} size="small"
                                    id="outlined-read-only-input"
                                    label="Nombres"
                                    defaultValue={trabajador.nombres}
                                    readOnly
                                    fullWidth
                                    value={trabajador.nombres || ''}
                                    onChange={onInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                <TextField sx={{ minWidth: 180 }} size="small"
                                    id="regimen"
                                    label="Régimen Laboral"
                                    defaultValue={trabajador.regimen_laboral}
                                    readOnly
                                    fullWidth
                                    value={trabajador.regimen_laboral || ''}
                                    onChange={onInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                <TextField sx={{ minWidth: 180 }} size="small"
                                    id="denominacion_puesto"
                                    label="Puesto que ocupa"
                                    defaultValue={trabajador.denominacion_puesto}
                                    readOnly
                                    fullWidth
                                    value={trabajador.denominacion_puesto || ''}
                                    onChange={onInputChange}
                                />
                            </Grid>
                        </Grid>
                        <Typography>Datos de vacaciones</Typography>
                        <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        error={fecha_solicitudValid}
                                        format="D/M/YYYY"
                                        label="Fecha solicitud"
                                        slotProps={{ textField: { size: 'small' } }}
                                        id='fecha_solicitud'
                                        value={dayjs(fecha_solicitud)}
                                        onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_solicitud' } })}
                                        sx={{ minWidth: 150 }} size="small"
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        format="D/M/YYYY"
                                        label="Fecha desde"
                                        slotProps={{ textField: { size: 'small' } }}
                                        id='fecha_inicio'
                                        value={dayjs(fecha_inicio)}
                                        onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_inicio' } })}
                                        sx={{ minWidth: 150 }} size="small"
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        format="D/M/YYYY"
                                        label="Fecha hasta"
                                        slotProps={{ textField: { size: 'small' } }}
                                        id='fecha_inicio'
                                        value={dayjs(fecha_fin)}
                                        onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_fin' } })}
                                        sx={{ minWidth: 150 }} size="small"
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <TextField sx={{ minWidth: 180 }} size="small"
                                    id="dias_vacaciones"
                                    label="Dias de vacaciones del servidor"
                                    defaultValue={trabajador.dias_vacaciones}
                                    readOnly
                                    fullWidth
                                    value={trabajador.dias_vacaciones || ''}
                                    onChange={onInputChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                    <Typography>Explicación</Typography>
                                    <TextField
                                        id='explicacion'
                                        type='text'
                                        autoComplete='false'
                                        sx={{ minWidth: 180 }}
                                        size="small"
                                        label='Ingrese la explicación'
                                        fullWidth
                                        placeholder="Explicación"
                                        multiline
                                        rows={4}
                                        name='explicacion'
                                        value={explicacion || mensajeExplicacion}
                                        //defaultValue={mensajeExplicacion}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Divider />
                    <Stack
                        direction='row'
                        spacing={2}
                        sx={{ mt: 2 }}>
                        <Button
                            variant="outlined"
                        //startIcon={<CancelScheduleSend />}
                            onClick={handleCancelarEnvio}
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant="contained"
                            disabled = {!isFormValid}
                            //endIcon={<Send />}
                            onClick={onSubmit}
                        >
                            Guardar
                        </Button>
                    </Stack>
                </form>
            </Box>
        </BaseModal>
    )
}
