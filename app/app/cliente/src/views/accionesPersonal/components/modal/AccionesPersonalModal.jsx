import { useEffect, useState } from 'react'
import { useAccionPersonalStore, useDenominacionPuestoStore, useEstructuraProgramaticaStore, useForm, useModalStore, useTrabStore, useUnidadOrganicaStore } from '../../../../hooks'
import { BaseModal } from '../../../../ui'
import { Autocomplete, Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Toolbar, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { tipos_accion, tipos_doc } from '../../tipos-accion'


const tipos_acc = tipos_accion.tipos
const tipos_docBase = tipos_doc.tipos

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    //right: '50%',
    //bottom: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    height: '95%',
    overflow: 'auto',
    bgcolor: 'background.paper',
    //border: '1px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
}

const formData = {
    id_trabajador: '',

    proceso_actual: '',
    subproceso_actual: '',
    puesto_actual: '',
    rmu_actual: '',
    estructura_actual: '',
    partida_actual: '',

    proceso_propuesta: '',
    subproceso_propuesta: '',
    puesto_propuesta: '',
    rmu_propuesta: '',
    estructura_propuesta: '',
    partida_propuesta: '',

    fecha_accion: '',
    fecha_rigue: '',
    tipo_accion: '',
    otro_tipo: '',
    doc_base: '',
    num_doc: '',
    fecha_doc: '',
    explicacion: '',
    contador: '',
}
export const AccionesPersonalModal = ({ titleModal }) => {
    const { closeModal, nameModal } = useModalStore();
    const { activeAccion, startSavingAccion } = useAccionPersonalStore();
    const { listDenominacion, startLoadingDenominacion } = useDenominacionPuestoStore();
    const { listUnidad, startLoadingUnidad } = useUnidadOrganicaStore();
    const { listEstructura, startLoadingEstructura } = useEstructuraProgramaticaStore();
    const { trabajadores, startLoadingTrab } = useTrabStore();
    const [inputValue, setInputValue] = useState('');
    //const [trabajador, setTrabajador] = useState([]);

    let component = null;
    const formValidations = {
        id_trabajador: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
        fecha_accion: [
            (value) => !!value && value.length > 0 !== '',
            'El campo es obligatorio'
        ],
        fecha_rigue: [
            (value) => !!value && value.length > 0 !== '',
            'El campo es obligatorio'
        ],
        tipo_accion: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
        explicacion: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
    }


    let {
        id_trabajadorValid,
        fecha_accionValid,
        fecha_rigueValid,
        tipo_accionValid,
        explicacionValid,

        id_trabajador,

        proceso_actual,
        subproceso_actual,
        puesto_actual,
        rmu_actual,
        estructura_actual,
        partida_actual,

        proceso_propuesta,
        subproceso_propuesta,
        puesto_propuesta,
        rmu_propuesta,
        estructura_propuesta,
        partida_propuesta,


        fecha_accion,
        fecha_rigue,
        tipo_accion,
        otro_tipo,
        doc_base,
        num_doc,
        fecha_doc,
        explicacion,
        contador,
        onInputChange,
        isFormValid,
        onResetForm,
        formState,
        setFormState
    } = useForm(formData, formValidations);

    // // se completa los campos del formulario al seleccionar el numero de cédula del servidor
    let trabajador = []
    const mensaje = "Ingrese la cédula del servidor";
    const completarDatosServidor = (id_trabajador) => {
        if (id_trabajador) {
            let lista_trabajadores = trabajadores.filter(trab => trab.id === id_trabajador);
            trabajador = lista_trabajadores[0]
            //setTrabajador(lista_trabajadores[0]);
            proceso_actual = trabajador.proceso[0];
            subproceso_actual = trabajador.unidad_organica;
            puesto_actual = trabajador.denominacion_puesto;
            rmu_actual = trabajador.rmu_puesto;
            estructura_actual = trabajador.estructura_programatica;
            partida_actual = trabajador.partida_individual;

            formState.proceso_actual = trabajador.proceso[0];
            formState.subproceso_actual = trabajador.unidad_organica;
            formState.puesto_actual = trabajador.denominacion_puesto;
            formState.rmu_actual = trabajador.rmu_puesto;
            formState.estructura_actual = trabajador.estructura_programatica;
            formState.partida_actual = trabajador.partida_individual;
        }
    };

    ////****Llama a la función para completar los datos del trabajador
    if (nameModal === 'Nueva Acción') {
        completarDatosServidor(id_trabajador); // Asegúrate de proporcionar un valor válido para id_trabajador
    }


    switch (nameModal) {
        case 'Nueva Acción':
            if (id_trabajador) {
                let lista_trabajadores = trabajadores.filter(trab => trab.id === id_trabajador);
                trabajador = lista_trabajadores[0]
                completarDatosServidor(id_trabajador)
            }
            break;

        case 'Editando datos':
            if (activeAccion.length > 0) {
                const id_trab = activeAccion[0].id_trabajador
                let lista_trabajadores = trabajadores.filter(trab => trab.id === id_trab);
                trabajador = lista_trabajadores[0]
            }
            break;
    }

    //console.log(id_trabajador);
    //let proceso = 'null'
    if (puesto_propuesta) {
        const denominacion = listDenominacion.find(denomin => denomin.id == puesto_propuesta);
        proceso_propuesta = denominacion.proceso[0]
        formState.proceso_propuesta = proceso_propuesta;
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (isFormValid) {
            startSavingAccion(formState)
            //console.log(formData)
            //console.log(formState);
            closeModal()
            onResetForm()
        } else {
            console.log('Error en el formulario')
        }
    }
    const handleCancel = () => {
        closeModal()
        onResetForm()
    }
    useEffect(() => {
        startLoadingTrab()
        startLoadingDenominacion()
        startLoadingUnidad()
        startLoadingEstructura()

        //completarDatosServidor(id_trabajador);
        if (activeAccion !== null) {
            setFormState({ ...activeAccion[0] });
        }
    }, [activeAccion]);
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
                                    error={id_trabajadorValid !== null}
                                    size='small'
                                    //value={component.cedula}
                                    options={trabajadores}
                                    inputValue={inputValue || ''}
                                    onInputChange={(event, newInputValue) => { setInputValue(newInputValue); }}
                                    onChange={(event, selectedValue) => {
                                        if (selectedValue) {
                                            onInputChange({ target: { value: selectedValue.id || '', name: 'id_trabajador' } });
                                        }
                                    }}
                                    getOptionLabel={(options) => options.numero_identificacion}
                                    renderInput={(params) => <TextField {...params} label="Seleccione la cédula del servidor" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <TextField
                                    sx={{ minWidth: 180 }}
                                    size="small"
                                    id="outlined-read-only-input"
                                    label="Cédula"
                                    defaultValue={trabajador.numero_identificacion}
                                    readOnly
                                    fullWidth
                                    value={trabajador.numero_identificacion || mensaje}
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
                                    value={trabajador.nombres || mensaje}
                                    onChange={onInputChange}
                                />
                            </Grid>
                        </Grid>
                        <Typography>Datos del documento base</Typography>
                        <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <TextField
                                    sx={{ minWidth: 180 }}
                                    size="small"
                                    id='num_doc'
                                    autoComplete='false'
                                    label='Número documento base'
                                    type='text'
                                    placeholder='Ingrese el número del documento base'
                                    fullWidth
                                    name='num_doc'
                                    value={num_doc || ''}
                                    onChange={onInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        format="D/M/YYYY"
                                        label="Fecha de documento base"
                                        slotProps={{ textField: { size: 'small' } }}
                                        id='fecha_doc'
                                        value={dayjs(fecha_doc)}
                                        onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_doc' } })}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <FormControl
                                    sx={{ minWidth: 185 }}
                                    size="small"
                                >
                                    <InputLabel id="demo-simple-select-label">Tipo documento base</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Tipo documento base"
                                        value={doc_base || ''}
                                        onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'doc_base' } })}
                                    >
                                        {tipos_docBase.map(option => (
                                            <MenuItem key={option.id} value={option.nombre} >{option.nombre}</MenuItem>
                                        ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Typography>Datos acción de personal</Typography>
                        <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        error={fecha_accionValid !== null}
                                        format="D/M/YYYY"
                                        label="Fecha de acción personal"
                                        slotProps={{ textField: { size: 'small' } }}
                                        id='fecha_accion'
                                        value={dayjs(fecha_accion)}
                                        onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_accion' } })}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        error={fecha_rigueValid !== null}
                                        format="D/M/YYYY"
                                        label="Rigue a partir de:"
                                        slotProps={{ textField: { size: 'small' } }}
                                        id='fecha_rigue'
                                        value={dayjs(fecha_rigue)}
                                        onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_rigue' } })}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <FormControl
                                    sx={{ minWidth: 185 }}
                                    size="small"
                                >
                                    <InputLabel id="demo-simple-select-label">Tipo acción de personal </InputLabel>
                                    <Select
                                        error={tipo_accionValid !== null}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Tipo acción de personal"
                                        value={tipo_accion || ''}
                                        onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_accion' } })}
                                    >
                                        {tipos_acc.map(option => (
                                            <MenuItem key={option.id} value={option.nombre} >{option.nombre}</MenuItem>
                                        ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <TextField sx={{ minWidth: 180 }} size="small"
                                    id='otro_tipo'
                                    autoComplete='false'
                                    label='Ingrese OTRO tipo de acción de personal'
                                    type='text'
                                    placeholder='Ingrese OTRO tipo de acción de personal'
                                    fullWidth
                                    name='otro_tipo'
                                    disabled={tipo_accion != 'OTRO'}
                                    value={otro_tipo || ''}
                                    onChange={onInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                                <TextField sx={{ minWidth: 180 }}
                                    size="small"
                                    id='contador'
                                    autoComplete='false'
                                    label='Número acción de personal'
                                    type='text'
                                    placeholder='Ingrese el número de accion de'
                                    fullWidth
                                    name='contador'
                                    value={contador || ''}
                                    onChange={onInputChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                            <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                <Typography>Situación actual</Typography>
                                <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                    <TextField sx={{ minWidth: 180 }} size="small"
                                        id="outlined-read-only-input"
                                        label="Puesto actual"
                                        defaultValue={puesto_actual}
                                        readOnly
                                        fullWidth
                                        value={puesto_actual || mensaje}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                    <TextField sx={{ minWidth: 180 }} size="small"
                                        id="outlined-read-only-input"
                                        label="Proceso actual"
                                        autoComplete='false'
                                        type='text'
                                        fullWidth
                                        value={proceso_actual || mensaje}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                    <TextField sx={{ minWidth: 180 }} size="small"
                                        id="outlined-read-only-input"
                                        label="Subproceso actual"
                                        autoComplete='false'
                                        defaultValue={subproceso_actual}
                                        type='text'
                                        fullWidth
                                        value={subproceso_actual || mensaje}
                                        onChange={onInputChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                    <TextField sx={{ minWidth: 180 }} size="small"
                                        id="outlined-read-only-input"
                                        label="Remuneración mensual actual"
                                        defaultValue={rmu_actual}
                                        autoComplete='true'
                                        fullWidth
                                        value={rmu_actual || mensaje}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                    <TextField sx={{ minWidth: 180 }} size="small"
                                        id="outlined-read-only-input"
                                        label="Estructura programática actual"
                                        defaultValue={estructura_actual}
                                        readOnly
                                        fullWidth
                                        value={estructura_actual || mensaje}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                    <TextField sx={{ minWidth: 180 }} size="small"
                                        id="outlined-read-only-input"
                                        label="Partida presupuestaria actual"
                                        defaultValue={partida_actual}
                                        readOnly
                                        fullWidth
                                        value={partida_actual || mensaje}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                <Typography>Situación propuesta</Typography>
                                <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                    <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                        <FormControl
                                            sx={{
                                                minWidth: 300,
                                                maxWidth: "100%", // Establece un ancho máximo del 100%
                                            }}
                                            size="small"
                                        >
                                            <InputLabel id="demo-select-small-label">Puesto propuesto</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                label="Puesto propuesto"
                                                fullWidth
                                                value={puesto_propuesta || ''}
                                                onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'puesto_propuesta' } })}
                                            >
                                                {listDenominacion.map(option => (
                                                    <MenuItem key={option.id} value={option.id}> {option.denominacion_puesto}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                        <TextField sx={{ minWidth: 180 }} size="small"
                                            id='proceso_propuesta'
                                            autoComplete='false'
                                            label='Proceso propuesto'
                                            readOnly
                                            placeholder='Ingrese el proceso propuesto al servidor'
                                            fullWidth
                                            name='proceso_propuesta'
                                            value={proceso_propuesta || ''}
                                            onChange={onInputChange}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                        <FormControl
                                            sx={{
                                                minWidth: 300,
                                                maxWidth: "100%",
                                            }}
                                            size="small"
                                        >
                                            <InputLabel id="demo-select-small-label">Subproceso propuesto</InputLabel>
                                            <Select
                                                labelId="subproceso_propuesta"
                                                id="subproceso_propuesta"
                                                label="Subproceso propuesto"
                                                fullWidth
                                                value={subproceso_propuesta || ''}
                                                onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'subproceso_propuesta' } })}
                                            >
                                                {listUnidad.map(option => (
                                                    <MenuItem key={option.id} value={option.id}> {option.unidad_organica}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {/* <TextField sx={{ minWidth: 180 }} size="small"
                                            id='subproceso_propuesta'
                                            autoComplete='false'
                                            label='Subproceso propuesto'
                                            type='text'
                                            placeholder='Ingrese el subproceso propuesto al servidor'
                                            fullWidth
                                            name='subproceso_propuesta'
                                            value={subproceso_propuesta || ''}
                                            onChange={onInputChange}
                                        /> */}
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                        <TextField sx={{ minWidth: 180 }} size="small"
                                            id='rmu_propuesta'
                                            autoComplete='false'
                                            label='Remuneración mensual propuesta'
                                            type='text'
                                            placeholder='Ingrese la remuneración mensual propuesta al servidor'
                                            fullWidth
                                            name='rmu_propuesta'
                                            value={rmu_propuesta || ''}
                                            onChange={onInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                        <FormControl sx={{
                                            minWidth: 300,
                                            maxWidth: "100%",
                                        }}
                                            size="small"
                                        >
                                            <InputLabel id="estructura_propuesta">Estructura programática propuesta</InputLabel>
                                            <Select
                                                labelId="estructura_propuesta"
                                                id="estructura_propuesta"
                                                label="Estructura programática propuesta"
                                                fullWidth
                                                value={estructura_propuesta || ''}
                                                onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'estructura_propuesta' } })}
                                            >
                                                {listEstructura.map(option => (
                                                    <MenuItem key={option.id} value={option.id}> {option.estructura_programatica}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {/* <TextField sx={{ minWidth: 180 }} size="small"
                                            id='estructura_propuesta'
                                            autoComplete='false'
                                            label='Estructura programática propuesta'
                                            type='text'
                                            placeholder='Ingrese la estructura programática propuesta al servidor'
                                            fullWidth
                                            name='estructura_propuesta'
                                            value={estructura_propuesta || ''}
                                            onChange={onInputChange}
                                        /> */}
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                        <TextField sx={{ minWidth: 180 }} size="small"
                                            id='partida_propuesta'
                                            autoComplete='false'
                                            label='Partida presupuestaria propuesta'
                                            type='text'
                                            placeholder='Ingrese la partida presupuestaria propuesta al servidor'
                                            fullWidth
                                            name='partida_propuesta'
                                            value={partida_propuesta || ''}
                                            onChange={onInputChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                    <Typography>Explicación</Typography>
                                    <TextField
                                        id='explicacion'
                                        autoComplete='false'
                                        sx={{ minWidth: 180 }}
                                        size="small"
                                        label='Ingrese la explicación de accion personal'
                                        fullWidth
                                        placeholder="Explicación"
                                        multiline
                                        rows={4}
                                        name='explicacion'
                                        value={explicacion || ''}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Toolbar />
                        <Divider />
                        <Stack
                            direction='row'
                            //display='flex'
                            justifyContent='flex-end'
                            alignItems='flex-end'
                            spacing={1}
                        >
                            <Button
                                variant="outlined"
                                //startIcon={<CancelScheduleSend />}
                                onClick={handleCancel}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant='contained'
                                //startIcon={<Send />}
                                onClick={onSubmit}
                                disabled={!isFormValid}
                            >
                                Guardar
                            </Button>
                        </Stack>
                    </Grid>
                </form>
            </Box>
        </BaseModal >
    )
}
