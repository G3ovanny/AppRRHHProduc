import React, { useEffect } from 'react'
//import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { BaseModal } from '../../../../ui'
import { Alert, Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import { CancelScheduleSend, Delete, Send } from '@mui/icons-material'
import { useForm, useModalStore, useTrabStore } from '../../../../hooks';
import dayjs from 'dayjs';
import { useUnidadOrganicaStore, useRegimenStore, useNivelOcuStore, useModalidadLaboralStore, useDenominacionPuestoStore } from '../../../../hooks/distributivo';
import { distributivo } from '../../../../helpers/distributivo';

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

const tipos_identificacion = [
    { value: 'CÉDULA', text: 'CÉDULA' },
    { value: 'PASAPORTE', text: 'PASAPORTE' },
    { value: 'OTRO', text: 'OTRO' },
]

const generos = [
    { value: 'Masculino', text: 'MASCULINO' },
    { value: 'Femenino', text: 'FEMENINO' },
]

const discapacidades = [
    { value: 'Ninguna', text: 'NINGUNA' },
    { value: 'Discapacidad', text: 'DISCAPACIDAD' },
    { value: 'Sustituto', text: 'SUSTITUTO' },
]

const maternidades = [
    { value: 'Embarazo', text: 'EMBARAZO' },
    { value: 'Lactancia', text: 'LACTANCIA' },
    { value: 'Ninguno', text: 'NINGUNO' },
]

const etnias = [
    { value: 'Blanco', text: 'BLANCO' },
    { value: 'Indigena', text: 'INDIGENA' },
    { value: 'Mestizo', text: 'MESTIZO' },
    { value: 'Montubio', text: 'MONTUBIO' },
    { value: 'Mulato', text: 'MULATO' },
    { value: 'Negro', text: 'NEGRO' },
    { value: 'Saraguro', text: 'SARAGURO' },
    { value: 'Otro', text: 'OTRO' },
]

const formData = {
    tipo_identificacion: '',
    numero_identificacion: '',
    nombres: '',
    celular: '',
    correo_personal: '',
    fecha_nacimiento: new Date(),
    direccion_domicilio: '',
    etnia: '',
    discapacidad: '',
    estado_maternidad: '',
    genero: '',
    dias_vacaciones: '',

    id_regimen_laboral: '',
    id_nivel_ocupacional: '',
    id_modalidad_laboral: '',
    id_unidad_organica: '',
    id_denominacion_puesto: '',
    id_estructura_programatica: '',
    correo_institucional: '',
    partida_individual: '',
    rmu_puesto: '',
    estado_servidor: '',
    fecha_inicio: new Date(),
    fecha_fin: new Date(),
    fecha_ingreso: '',
}

export const TrabajadorModal = ({ titleModal }) => {

    const { listReg, listNivel, listModalidad, listUnidad, listDenominacion, listEstructura } = distributivo();
    const { inicialTrab, activeTrab, startSavingTrab, mensaje } = useTrabStore();
    const { closeModal } = useModalStore()

    const formValidations = {
        tipo_identificacion: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
        numero_identificacion: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
        nombres: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
        id_regimen_laboral: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
        id_nivel_ocupacional: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
        id_modalidad_laboral: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
        id_unidad_organica: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
        id_denominacion_puesto: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
        id_estructura_programatica: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
        partida_individual: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
        rmu_puesto: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
        dias_vacaciones: [
            (value) => !!value,
            'El campo es obligatorio'
        ]

    }

    const {
        tipo_identificacionValid,
        numero_identificacionValid,
        nombresValid,
        id_regimen_laboralValid,
        id_nivel_ocupacionalValid,
        id_modalidad_laboralValid,
        id_unidad_organicaValid,
        id_denominacion_puestoValid,
        id_estructura_programaticaValid,
        partida_individualValid,
        rmu_puestoValid,
        dias_vacacionesValid,


        tipo_identificacion,
        numero_identificacion,
        nombres,
        celular,
        correo_personal,
        correo_institucional,
        etnia,
        genero,
        discapacidad,
        estado_maternidad,
        dias_vacaciones,

        direccion_domicilio,
        partida_individual,
        rmu_puesto,
        estado_servidor,

        fecha_nacimiento,
        fecha_inicio,
        fecha_fin,
        fecha_ingreso,
        id_regimen_laboral,
        id_nivel_ocupacional,
        id_modalidad_laboral,
        id_unidad_organica,
        id_denominacion_puesto,
        id_estructura_programatica,
        onInputChange,
        isFormValid,
        formState,
        onResetForm,
        setFormState } = useForm(formData, formValidations);


    const handleCancelarEnvio = () => {
        closeModal()
        onResetForm()
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (isFormValid) {
            await startSavingTrab({ ...formState })
            closeModal()
            onResetForm()
        } else {
            console.log("Error en el formulario")
        }
    }

    useEffect(() => {
        if (activeTrab !== null) {
            setFormState({ ...activeTrab[0] });
        }
    }, [activeTrab])

    return (
        <BaseModal
            title={titleModal}
            style={style}
        >
            <Grid
                className='animate__animated animate__backInRight'
                item
                sx={{ flex: ' 1 1 100%' }}
                display={!!mensaje ? '' : 'none'}
            >
                <Alert severity='success' >{mensaje}</Alert>

            </Grid>
            <Box >
                <form onSubmit={onSubmit}>
                    <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>

                        <Grid item xs={12} sm={12} md={6}>
                            <Typography>Datos del servidor</Typography>
                            <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
                                    <FormControl
                                        sx={{ minWidth: 218, maxWidth: 218 }}
                                        size="small"
                                    >
                                        <InputLabel id="demo-simple-select-label">Tipo de identificación</InputLabel>
                                        <Select
                                            error={tipo_identificacionValid !== null}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Tipo identificación"
                                            value={tipo_identificacion || ''}
                                            onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_identificacion' } })}
                                        >
                                            {tipos_identificacion.map(option => (
                                                <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
                                            ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
                                    <TextField
                                        error={numero_identificacionValid !== null}
                                        //helperText={numero_identificacionValid}
                                        sx={{ minWidth: 180 }}
                                        size="small"
                                        id='numero_identificacion'
                                        autoComplete='false'
                                        label='Número identificación'
                                        type='text'
                                        placeholder='Ingrese el numero de identificación del servidor'
                                        fullWidth
                                        name='numero_identificacion'
                                        value={numero_identificacion || ''}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
                                <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                    <TextField sx={{ minWidth: 180 }} size="small"
                                        id='nombres'
                                        error={nombresValid !== null}
                                        autoComplete='false'
                                        label='Apellidos y nombres'
                                        type='text'
                                        placeholder='Ingrese el nombre completo del servidor'
                                        fullWidth
                                        name='nombres'
                                        value={nombres || ''}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                    <TextField sx={{ minWidth: 180 }} size="small"
                                        id='correo_personal'
                                        autoComplete='false'
                                        label='Correo personal'
                                        type='email'
                                        placeholder='Ingrese el correo personal del servidor'
                                        fullWidth
                                        name='correo_personal'
                                        value={correo_personal || ''}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                                    <TextField sx={{ minWidth: 180 }} size="small"
                                        id='direccion_domicilio'
                                        autoComplete='false'
                                        label='Dirección domicilio'
                                        type='text'
                                        placeholder='Ingrese la dirección de domicilio del servidor'
                                        fullWidth
                                        name='direccion_domicilio'
                                        value={direccion_domicilio || ''}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <FormControl
                                        sx={{ minWidth: 218, maxWidth: 218 }}
                                        size="small"
                                    >
                                        <InputLabel id="demo-simple-select-label">Género</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Genero"
                                            value={genero || ''}
                                            onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'genero' } })}
                                        >
                                            {generos.map(option => (
                                                <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
                                            ))
                                            }
                                        </Select>
                                    </FormControl>

                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            slotProps={{
                                                textField: {
                                                    InputProps: { size: 'small', format: 'YYYY-MM-DD' },
                                                }
                                            }}
                                            id='fecha_nacimiento'
                                            label='Fecha de nacimiento'
                                            value={dayjs(fecha_nacimiento)}
                                            onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_nacimiento' } })}
                                            sx={{ minWidth: 150 }} size="small"
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <FormControl sx={{ minWidth: 218, maxWidth: 218 }} size="small">
                                        <InputLabel id="demo-simple-select-label">Discapacidad</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Discapacidad"
                                            value={discapacidad || ''}
                                            onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'discapacidad' } })}
                                        >
                                            {discapacidades.map(option => (
                                                <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
                                            ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <TextField sx={{ minWidth: 180 }} size="small"
                                        id='celular'
                                        autoComplete='false'
                                        label='Celular'
                                        type='text'
                                        placeholder='Ingrese el celular del servidor'
                                        fullWidth
                                        name='celular'
                                        value={celular || ''}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <FormControl sx={{ minWidth: 218, maxWidth: 218 }} size="small">
                                        <InputLabel id="demo-simple-select-label">Maternidad</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Maternidad"
                                            value={estado_maternidad || ''}
                                            onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'estado_maternidad' } })}
                                        >
                                            {maternidades.map(option => (
                                                <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
                                            ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <FormControl sx={{ minWidth: 218, maxWidth: 218 }} size="small">
                                        <InputLabel id="demo-simple-select-label">Etnia</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Etnia"
                                            value={etnia || ''}
                                            onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'etnia' } })}
                                        >
                                            {etnias.map(option => (
                                                <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
                                            ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Typography> Datos institucionales</Typography>
                            <Grid item container columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
                                    <TextField sx={{ minWidth: 180 }} size="small"
                                        id='correo_institucional'
                                        autoComplete='false'
                                        label='Correo institucional'
                                        type='text'
                                        placeholder='Ingrese el correo institucional del servidor'
                                        fullWidth
                                        name='correo_institucional'
                                        value={correo_institucional || ''}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            slotProps={{
                                                textField: {
                                                    InputProps: { size: 'small', format: 'YYYY-MM-DD' },
                                                }
                                            }}
                                            label='Fecha de ingreso'
                                            value={dayjs(fecha_ingreso)}
                                            onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_ingreso' } })}
                                            sx={{ minWidth: 150 }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            slotProps={{
                                                textField: {
                                                    InputProps: { size: 'small', format: 'YYYY-MM-DD' },
                                                }
                                            }}
                                            label='Fecha de inicio'
                                            value={dayjs(fecha_inicio)}
                                            onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_inicio' } })}
                                            sx={{ minWidth: 150 }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            slotProps={{
                                                textField: {
                                                    InputProps: { size: 'small' },
                                                }
                                            }}
                                            label='Fecha de fin'
                                            value={dayjs(fecha_fin)}
                                            onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_fin' } })}
                                            sx={{ minWidth: 150 }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <FormControl
                                        sx={{ minWidth: 186 }}
                                        size="small"
                                    >
                                        <InputLabel id="demo-simple-select-label">Régimen laboral</InputLabel>
                                        <Select
                                            sx={{ minWidth: 218, maxWidth: 218 }}
                                            error={id_regimen_laboralValid !== null}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Régimen laboral"
                                            value={id_regimen_laboral || ''}
                                            onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'id_regimen_laboral' } })}
                                        >
                                            {listReg.map(option => (
                                                <MenuItem key={option.id} value={option.id}>{option.regimen_laboral}</MenuItem>
                                            ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <FormControl
                                        size="small"
                                    >
                                        <InputLabel id="demo-simple-select-label">Nivel ocupacional</InputLabel>
                                        <Select
                                            sx={{ minWidth: 218, maxWidth: 218 }}
                                            error={id_nivel_ocupacionalValid !== null}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Nivel ocupacional"
                                            value={id_nivel_ocupacional || ''}
                                            onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'id_nivel_ocupacional' } })}
                                        >
                                            {listNivel.map(option => (
                                                <MenuItem key={option.id} value={option.id}>{option.nivel_ocupacional}</MenuItem>
                                            ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <FormControl
                                        sx={{ minWidth: 186 }}
                                        size="small"
                                    >
                                        <InputLabel id="demo-simple-select-label">Modalidad laboral</InputLabel>
                                        <Select
                                            error={id_modalidad_laboralValid !== null}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Modalidad laboral"
                                            sx={{ minWidth: 218, maxWidth: 218 }}
                                            value={id_modalidad_laboral || ''}
                                            onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'id_modalidad_laboral' } })}
                                        >
                                            {listModalidad.map(option => (
                                                <MenuItem
                                                    key={option.id}
                                                    value={option.id}

                                                >
                                                    {option.modalidad_laboral}
                                                </MenuItem>
                                            ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <FormControl
                                        sx={{ minWidth: 186 }}
                                        size="small"
                                    >
                                        <InputLabel id="demo-simple-select-label">Unidad orgánica</InputLabel>
                                        <Select
                                            sx={{ minWidth: 218, maxWidth: 218 }}
                                            error={id_unidad_organicaValid !== null}
                                            labelId="demo-simple-select-label"
                                            id="unidad_organica"
                                            label="Unidad orgánica"
                                            value={id_unidad_organica || ''}
                                            onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'id_unidad_organica' } })}
                                        >
                                            {listUnidad.map(option => (
                                                <MenuItem key={option.id} value={option.id}>{option.unidad_organica}</MenuItem>
                                            ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <FormControl
                                        //xs={{ minWidth: 200, maxWidth: 200 }} sm={{ minWidth: 200, maxWidth: 200 }} md={{ minWidth: 400, maxWidth: 400 }} 
                                        //sx={{ minWidth: 455, maxWidth: 455 }}
                                        sx={{ minWidth: 186 }}
                                        size="small"
                                    >
                                        <InputLabel id="demo-simple-select-label">Denominación del puesto</InputLabel>
                                        <Select
                                            error={id_denominacion_puestoValid !== null}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Denominación del puesto"
                                            sx={{ minWidth: 218, maxWidth: 218 }}
                                            value={id_denominacion_puesto || ''}
                                            onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'id_denominacion_puesto' } })}
                                        >
                                            {listDenominacion.map(option => (
                                                <MenuItem key={option.id} value={option.id}>{option.denominacion_puesto}</MenuItem>
                                            ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <FormControl
                                        //xs={{ minWidth: 200, maxWidth: 200 }} sm={{ minWidth: 200, maxWidth: 200 }} md={{ minWidth: 400, maxWidth: 400 }} 
                                        //sx={{ minWidth: 455, maxWidth: 455 }}
                                        sx={{ minWidth: 186 }}
                                        size="small"
                                    >
                                        <InputLabel id="demo-simple-select-label">Estructura programática</InputLabel>
                                        <Select
                                            error={id_estructura_programaticaValid !== null}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Denominación del puesto"
                                            sx={{ minWidth: 218, maxWidth: 218 }}
                                            value={id_estructura_programatica || ''}
                                            onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'id_estructura_programatica' } })}
                                        >
                                            {listEstructura.map(option => (
                                                <MenuItem key={option.id} value={option.id}>{option.estructura_programatica}</MenuItem>
                                            ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <TextField
                                        error={partida_individualValid !== null}
                                        sx={{ minWidth: 180 }}
                                        size="small"
                                        id='partida_individual'
                                        autoComplete='false'
                                        label='Partida individual'
                                        type='text'
                                        placeholder='Ingrese la partida individual del servidor'
                                        fullWidth
                                        name='partida_individual'
                                        value={partida_individual || ''}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <TextField
                                        error={rmu_puestoValid !== null}
                                        sx={{ minWidth: 180 }}
                                        size="small"
                                        id='rmu_puesto'
                                        autoComplete='false'
                                        label='Remuneración del puesto'
                                        type='text'
                                        placeholder='Ingrese la remuneración'
                                        fullWidth
                                        name='rmu_puesto'
                                        value={rmu_puesto || ''}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                                    <TextField
                                        error={dias_vacacionesValid !== null}
                                        sx={{ minWidth: 180 }}
                                        size="small"
                                        id='dias_vacaciones'
                                        autoComplete='false'
                                        label='Dias totales de vacaciones'
                                        type='text'
                                        placeholder='Ingrese los dias totales de vacaciones'
                                        fullWidth
                                        name='dias_vacaciones'
                                        value={dias_vacaciones || ''}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Toolbar />
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
                            disabled={!isFormValid}
                            //endIcon={<Send />}
                            onClick={onSubmit}
                        >
                            Enviar
                        </Button>
                    </Stack>
                </form>
            </Box>
        </BaseModal >
    )
}
