import { SaveAltOutlined, SaveOutlined } from '@mui/icons-material'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from '../../../../hooks'
import { tipoCuenta } from './selects'


const formData = {
    institucion_financiera: '',
    tipo_cuenta: '',
    num_cuenta: '',
}

export const InformacionBancaria = ({ onFormSubmit }) => {

    const {
        institucion_financiera,
        tipo_cuenta,
        num_cuenta,

        onInputChange,
        isFormValid,
        formState,
        onResetForm,
        setFormState,
    } = useForm(formData)

    const handleSubmit = (event) => {
        event.preventDefault();
        onFormSubmit(formState);
    };
    return (
        <Box>

            <Typography align='center'>Información bancaria (Registrada en la UPEC)</Typography>
            <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>

                <Grid item xs={12} sm={12} md={12}>
                    <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //error={ !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='institucion_financiera'
                                autoComplete='off'
                                label='Institución Financiera'
                                type='text'
                                placeholder='Ingrese la Institución financiera'
                                fullWidth
                                name='institucion_financiera'
                                value={institucion_financiera || ''}
                                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'institucion_financiera' } })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <FormControl
                                fullWidth
                                size="small">
                                <InputLabel id="select-cuenta-bancaria">Tipo de cuenta</InputLabel>
                                <Select
                                    labelId="select-cuenta-bancaria"
                                    id="id-select-small"
                                    label="Tipo de cuenta"
                                    value={tipo_cuenta || ''}
                                    onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_cuenta' } })}
                                >
                                    {tipoCuenta.map(option => (
                                        <MenuItem key={option.value} value={option.value}> {option.text}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                                //TODO SELECT
                                //error={ !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='num_cuenta'
                                autoComplete='off'
                                label='Número de cuenta'
                                type='text'
                                placeholder='Ingrese su número de cuenta'
                                fullWidth
                                name='num_cuenta'
                                value={num_cuenta || ''}
                                onChange={onInputChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Stack
                direction='row'
                spacing={2}
                sx={{ mt: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    endIcon={<SaveAltOutlined />}
                    onClick={handleSubmit}
                >
                    Guardar
                </Button>
            </Stack>
        </Box>
    )
}
