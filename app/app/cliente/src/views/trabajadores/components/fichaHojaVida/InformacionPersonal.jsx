
import { Box, Grid, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const InformacionPersonal = () => {
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
                            //value={nombres || ''}
                            //onChange={onInputChange}
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
                            //value={nombres || ''}
                            //onChange={onInputChange}
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
                            //value={nombres || ''}
                            //onChange={onInputChange}
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
                            //value={nombres || ''}
                            //onChange={onInputChange}
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
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
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
                                name='numero_identificacion'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
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
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
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
                                //views={['year', 'day', 'hours', 'minutes']}
                                //onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DDTHH:mm'), name: 'fecha_hora_salida' } })}
                                //value={dayjs(fecha_hora_salida)}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //TODO SELECT
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='genero'
                                autoComplete='off'
                                label='Género'
                                type='text'
                                placeholder='Ingrese su género'
                                fullWidth
                                name='genero'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='cedula'
                                autoComplete='off'
                                label='Número de cédula'
                                type='text'
                                placeholder='Ingrese el número de su cédula'
                                fullWidth
                                name='numero_cedula'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='numero_pasaporte'
                                autoComplete='off'
                                label='Número de pasaporte'
                                type='text'
                                placeholder='Ingrese el número de su pasaporte'
                                fullWidth
                                name='numero_cedula'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //TODO SELECT
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='tipo_pasaporte'
                                autoComplete='off'
                                label='Tipo de pasaporte'
                                type='text'
                                placeholder='Ingrese el tipo de pasaporte'
                                fullWidth
                                name='tipo_pasaporte'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //TODO SELECT
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='discapacidad'
                                autoComplete='off'
                                label='Discapacidad calificada'
                                type='text'
                                placeholder='Ingrese el tipo de pasaporte'
                                fullWidth
                                name='discapacidad'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='numero_conadis'
                                autoComplete='off'
                                label='Número carnet del conadis'
                                type='text'
                                placeholder='Ingrese el número carnet del conadis'
                                fullWidth
                                name='numero_conadis'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //TODO SELECT
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='tipo_discapacidad'
                                autoComplete='off'
                                label='Tipo de discapacidad'
                                type='text'
                                placeholder='Seleccione el tipo de discapacidad'
                                fullWidth
                                name='tipo_discapacidad'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='porcentaje_discapacidad'
                                autoComplete='off'
                                label='Porcentaje de discapacidad'
                                type='text'
                                placeholder='Ingrese el porcentaje de discapacidad'
                                fullWidth
                                name='porcentaje_discapacidad'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //TODO SELECT
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='enfermedad_catastrofica'
                                autoComplete='off'
                                label='Enfermedad catastrofica'
                                type='text'
                                placeholder='Seleccione el porcentaje de discapacidad'
                                fullWidth
                                name='enfermedad_catastrofica'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //TODO SELECT
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='tipo_catastrofica'
                                autoComplete='off'
                                label='Enfermedad catastrófica'
                                type='text'
                                placeholder='Seleccione si tiene alguna enfermedad catastrófica'
                                fullWidth
                                name='tipo_catastrofica'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='detalle_catastrofica'
                                autoComplete='off'
                                label='Especifique la enfermedad catrastrófica'
                                type='text'
                                placeholder='Especifique la enfermedad catrastrófica'
                                fullWidth
                                name='detalle_catastrofica'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //TODO SELECT
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='tipo_sangre'
                                autoComplete='off'
                                label='Tipo de sangre'
                                type='text'
                                placeholder='Seleccione su tipo de sangre'
                                fullWidth
                                name='tipo_sangre'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='numero_lib_militar'
                                autoComplete='off'
                                label='Número de libreta militar'
                                type='text'
                                placeholder='Ingrese el número de su libreta militar'
                                fullWidth
                                name='numero_lib_militar'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //TODO SELECT
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='tipo_lib_militar'
                                autoComplete='off'
                                label='Tipo de libreta militar'
                                type='text'
                                placeholder='Seleccione el tipo de su libreta militar'
                                fullWidth
                                name='tipo_lib_militar'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
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
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
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
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='etnia'
                                autoComplete='off'
                                label='Auto identificacion étnica'
                                type='text'
                                placeholder='Ingrese étnia'
                                fullWidth
                                name='etnia'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={numero_identificacionValid !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='nacionalidad_indigena'
                                autoComplete='off'
                                label='Nacionalidad indígena'
                                type='text'
                                placeholder='Ingrese nacionalidad indigena'
                                fullWidth
                                name='nacionalidad_indigena'
                            //value={numero_identificacion || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
