import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useForm } from '../../../../hooks'
import dayjs from 'dayjs'
import { discapacidades, enfermedades, etnias, generos, nacionalidadesIndigenas, pasaportes, tipoSangre, tiposLibreta } from './selects'


const formData = {
    apellido_paterno: '',
    apellido_materno: '',
    primer_nombre: '',
    segundo_nombre: '',
    provincia: '',
    ciudad: '',
    nacionalidad: '',
    fecha_nacimiento: '',
    genero: '',
    num_cedula: '',
    num_pasaporte: '',
    tipo_pasaporte: '',
    discapacidad: '',
    num_carnet_conadis: '',
    tipo_discapacidad: '',
    porcentaje_discapacidad: '',
    enfermedad_catastrofica: '',
    nombre_enfermedad: '',
    detalle_enfermedad: '',
    tipo_sangre: '',
    num_libreta_militar: '',
    tipo_libreta: '',
    correo_personal: '',
    correo_institucional: '',
    etnia: '',
    nacionalidad_indigena: '',
}

export const InformacionPersonal = () => {
    const servidor = localStorage.getItem('numero_identificacion')
    let {
        apellido_paterno,
        apellido_materno,
        primer_nombre,
        segundo_nombre,
        provincia,
        ciudad,
        nacionalidad,
        fecha_nacimiento,
        genero,
        num_cedula,
        num_pasaporte,
        tipo_pasaporte,
        discapacidad,
        num_carnet_conadis,
        tipo_discapacidad,
        porcentaje_discapacidad,
        enfermedad_catastrofica,
        nombre_enfermedad,
        detalle_enfermedad,
        tipo_sangre,
        num_libreta_militar,
        tipo_libreta,
        correo_personal,
        correo_institucional,
        etnia,
        nacionalidad_indigena,
        onInputChange,
        isFormValid,
        formState,
        onResetForm,
        setFormState,

    } = useForm(formData);

    const completarDatosServidor = (servidor) => {
        if (servidor) {
            num_cedula = servidor
            formState.num_cedula = num_cedula
        }
    }
    completarDatosServidor(servidor)
    console.log(formState)
    return (
        <Box>
            <Typography align='center'>Información personal</Typography>
            <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                <Grid item xs={12} sm={12} md={12}>
                    <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={ !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='apellido_paterno'
                                autoComplete='off'
                                label='Apellido paterno'
                                type='text'
                                placeholder='Ingrese su apellido paterno'
                                fullWidth
                                name='apellido_paterno'
                                value={apellido_paterno || ''}
                                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'apellido_paterno' } })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={ !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='apellido_materno'
                                autoComplete='off'
                                label='Apellido materno'
                                type='text'
                                placeholder='Ingrese su apellido materno'
                                fullWidth
                                name='apellido_materno'
                                value={apellido_materno || ''}
                                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'apellido_materno' } })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={ !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='primer_nombre'
                                autoComplete='off'
                                label='Primer nombre'
                                type='text'
                                placeholder='Ingrese su primer nombre'
                                fullWidth
                                name='primer_nombre'
                                value={primer_nombre || ''}
                                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'primer_nombre' } })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={ !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='segundo_nombre'
                                autoComplete='off'
                                label='Segundo nombre'
                                type='text'
                                placeholder='Ingrese su segundo nombre'
                                fullWidth
                                name='segundo_nombre'
                                value={segundo_nombre || ''}
                                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'segundo_nombre' } })}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='provincia'
                                autoComplete='off'
                                label='Provincia'
                                type='text'
                                placeholder='Ingrese provincia de nacimiento'
                                fullWidth
                                name='provincia'
                                value={provincia || ''}
                                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'provincia' } })}

                            />
                        </Grid><Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='ciudad'
                                autoComplete='off'
                                label='Ciudad'
                                type='text'
                                placeholder='Ingrese ciudad de nacimiento'
                                fullWidth
                                name='ciudad'
                                value={ciudad || ''}
                                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'ciudad' } })}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='nacionalidad'
                                autoComplete='off'
                                label='Nacionalidad'
                                type='text'
                                placeholder='Ingrese su nacionalidad'
                                fullWidth
                                name='nacionalidad'
                                value={nacionalidad || ''}
                                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'nacionalidad' } })}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    id='fecha_nacimiento'
                                    label="Fecha de nacimiento"
                                    autoComplete='off'
                                    slotProps={{ textField: { size: 'small' } }}
                                    sx={{ minWidth: 150 }} size="small"
                                    onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_nacimiento' } })}
                                    value={dayjs(fecha_nacimiento)}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <FormControl
                                fullWidth
                                size="small">
                                <InputLabel id="select-genero">Género</InputLabel>
                                <Select
                                    labelId="select-genero"
                                    id="id-select-small"
                                    label="Género"
                                    value={genero || ''}
                                    onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'genero' } })}
                                >
                                    {generos.map(option => (
                                        <MenuItem key={option.value} value={option.value}> {option.text}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='cedula'
                                defaultValue={num_cedula}
                                label='Número de cédula'
                                type='text'
                                placeholder='Ingrese el número de su cédula'
                                fullWidth
                                name='num_cedula'
                                value={num_cedula || ''}
                                onChange={onInputChange}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='num_pasaporte'
                                autoComplete='off'
                                label='Número de pasaporte'
                                type='text'
                                placeholder='Ingrese el número de su pasaporte'
                                fullWidth
                                name='num_pasaporte'
                                value={num_pasaporte || ''}
                                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'num_pasaporte' } })}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <FormControl
                                fullWidth
                                size="small">
                                <InputLabel id="select-pasaporte">Tipo de pasaporte</InputLabel>
                                <Select
                                    labelId="select-pasaporte"
                                    id="id-select-small"
                                    label="Tipo de pasaporte"
                                    value={tipo_pasaporte || ''}
                                    onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_pasaporte' } })}
                                >
                                    {pasaportes.map(option => (
                                        <MenuItem key={option.value} value={option.value}> {option.text}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <FormGroup>
                                <FormControlLabel
                                    //disabled={!tipoEnf}
                                    row
                                    label="Discapacidad"
                                    labelPlacement="start"
                                    control={
                                        <Checkbox
                                            checked={discapacidad || false}
                                            onChange={e => onInputChange({ target: { value: e.target.checked, name: 'discapacidad' } })}

                                        />
                                    }
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                disabled={!discapacidad}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='num_carnet_conadis'
                                label='Número carnet del conadis'
                                type='text'
                                placeholder='Ingrese el número carnet del conadis'
                                fullWidth
                                name='num_carnet_conadis'
                                value={num_carnet_conadis || ''}
                                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'num_carnet_conadis' } })}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <FormControl
                                fullWidth
                                size="small">
                                <InputLabel id="select-discapacidad">Tipo de discapacidad</InputLabel>
                                <Select
                                    disabled={!discapacidad}
                                    labelId="select-discapacidad"
                                    id="id-select-small"
                                    label="Discapacidad"
                                    value={tipo_discapacidad || ''}
                                    onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_discapacidad' } })}
                                >
                                    {discapacidades.map(option => (
                                        <MenuItem key={option.value} value={option.value}> {option.text}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                disabled={!discapacidad}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='porcentaje_discapacidad'
                                autoComplete='off'
                                label='Porcentaje de discapacidad'
                                type='text'
                                placeholder='Ingrese el porcentaje de discapacidad'
                                fullWidth
                                name='porcentaje_discapacidad'
                                value={porcentaje_discapacidad || ''}
                                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'porcentaje_discapacidad' } })}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <FormGroup>
                                <FormControlLabel
                                    //disabled={!tipoEnf}
                                    row
                                    label="Enfermedad Catastrófica"
                                    labelPlacement="start"
                                    control={
                                        <Checkbox
                                            checked={enfermedad_catastrofica || false}
                                            onChange={e => onInputChange({ target: { value: e.target.checked, name: 'enfermedad_catastrofica' } })}

                                        />
                                    }
                                />
                            </FormGroup>

                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <FormControl
                                fullWidth
                                size="small">
                                <InputLabel id="select-enfermedades">Tipo de enfermedad catastrófica</InputLabel>
                                <Select
                                    disabled={!enfermedad_catastrofica}
                                    labelId="select-enfermedades"
                                    id="id-select-small"
                                    label="Tipo de enfermedad catastrófica"
                                    value={nombre_enfermedad || ''}
                                    onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'nombre_enfermedad' } })}
                                >
                                    {enfermedades.map(option => (
                                        <MenuItem key={option.value} value={option.value}> {option.text}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                disabled={!enfermedad_catastrofica}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='detalle_enfermedad'
                                autoComplete='off'
                                label='Detalle la enfermedad catastrófica'
                                type='text'
                                placeholder='Detalle la enfermedad catastrófica'
                                fullWidth
                                name='detalle_enfermedad'
                                value={detalle_enfermedad || ''}
                                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'detalle_enfermedad' } })}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <FormControl
                                fullWidth
                                size="small">
                                <InputLabel id="select-sangre">Tipo de sangre</InputLabel>
                                <Select
                                    labelId="select-sangre"
                                    id="id-select-small"
                                    label="Discapacidad"
                                    value={tipo_sangre || ''}
                                    onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_sangre' } })}
                                >
                                    {tipoSangre.map(option => (
                                        <MenuItem key={option.value} value={option.value}> {option.text}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='num_libreta_militar'
                                autoComplete='off'
                                label='Número de libreta militar'
                                type='text'
                                placeholder='Ingrese el número de su libreta militar'
                                fullWidth
                                name='num_libreta_militar'
                                value={num_libreta_militar || ''}
                                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'num_libreta_militar' } })}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <FormControl
                                fullWidth
                                size="small">
                                <InputLabel id="select-libreta">Tipo de libreta militar</InputLabel>
                                <Select
                                    labelId="select-libreta"
                                    id="id-select-small"
                                    label="Tipo de libreta militar"
                                    value={tipo_libreta || ''}
                                    onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_libreta' } })}
                                >
                                    {tiposLibreta.map(option => (
                                        <MenuItem key={option.value} value={option.value}> {option.text}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='correo_personal'
                                autoComplete='off'
                                label='Correo personal'
                                type='text'
                                placeholder='Ingrese un correo personal'
                                fullWidth
                                name='correo_personal'
                                value={correo_personal || ''}
                                onChange={onInputChange}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='correo_institucional'
                                autoComplete='off'
                                label='Correo institucional'
                                type='text'
                                placeholder='Ingrese su correo institucional'
                                fullWidth
                                name='correo_institucional'
                                value={correo_institucional || ''}
                                onChange={onInputChange}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <FormControl
                                fullWidth
                                size="small">
                                <InputLabel id="select-etnia">Auto identificacion étnica</InputLabel>
                                <Select
                                    labelId="select-etnia"
                                    id="id-select-small"
                                    label="Auto identificacion étnica"
                                    value={etnia || ''}
                                    onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'etnia' } })}
                                >
                                    {etnias.map(option => (
                                        <MenuItem key={option.value} value={option.value}> {option.text}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <FormControl
                                fullWidth
                                size="small">
                                <InputLabel id="select-nacionalidad">Ingrese nacionalidad indigena</InputLabel>
                                <Select
                                    labelId="select-nacionalidad"
                                    id="id-select-small"
                                    label="Auto identificacion étnica"
                                    value={nacionalidad_indigena || ''}
                                    onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'nacionalidad_indigena' } })}
                                >
                                    {nacionalidadesIndigenas.map(option => (
                                        <MenuItem key={option.value} value={option.value}> {option.text}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
