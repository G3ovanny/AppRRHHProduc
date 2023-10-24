import { Box, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

export const InformacionBancaria = () => {
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
                            //value={nombres || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
                            <TextField
                            //TODO SELECT
                                //error={ !== null}
                                //helperText={numero_identificacionValid}
                                sx={{ minWidth: 180 }}
                                size="small"
                                id='tipo_cuenta'
                                autoComplete='off'
                                label='Tipo de institución Financiera'
                                type='text'
                                placeholder='Ingrese la Institución financiera'
                                fullWidth
                                name='tipo_institucion_financiera'
                            //value={nombres || ''}
                            //onChange={onInputChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
