import React, { forwardRef } from 'react'
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { useTrabStore } from '../../../../hooks'
import { Box, Typography, Grid } from '@mui/material';
import { TablePermisos } from './TablePermisos';


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        width: "100%",
        //padding: "175px 65px",
        padding: "170px 55px",
        //backgroundColor: "red",
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "30px",
    },
    subtitulos: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: "15px",
        display: "flex",
    },
    firma: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "25px"
    },
})

export const DiasVacacionesPdf = forwardRef((props, ref) => {
    const { activeTrab } = useTrabStore();
    let documento = []
    console.log(activeTrab)
    activeTrab.map((data, index) => {
        const { nombres, id, fecha_inicio, fecha_fin } = data;
        return (
            documento.push(
                <Box key={index}>
                    <Box style={styles.margen}>
                        <Box size="A4" style={styles.page}>
                            <Box style={styles.header}>
                                <Typography style={styles.titulo}>
                                    UNIVERSIDAD POLITÉCNICA ESTATAL DEL CARCHI
                                </Typography>
                                <Typography style={styles.titulo}>
                                    REPORTE DE VACACIONES
                                </Typography>
                            </Box>
                            <Box style={styles.fechas}>
                                <Typography style={styles.subtitulos}>
                                    VACACIONES PENDIENTES SERVIDOR: {nombres}
                                </Typography>
                                {/* Si necesitas mostrar las fechas, puedes hacerlo aquí */}
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box>
                                        {activeTrab.length === 1 && (
                                            <TablePermisos trabajador={data.id} />
                                        )}
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box>
                                        {activeTrab.length === 1 && (
                                            <TablePermisos trabajador={data.id} />
                                        )}
                                    </Box>
                                </Grid>

                            </Grid>
                            <Box style={styles.firma}>
                                <Typography>
                                    ____________________
                                </Typography>
                                <Typography>
                                    F.) Msc. Karina Vaisilla P.
                                </Typography>
                                <Typography style={styles.subtitulos}>
                                    ANALISTA DE TALENTO HUMANO (E)
                                </Typography>
                                <Typography style={styles.subtitulos}>
                                    JEFATURA DE TALENTO HUMANO
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )

        );
    });

    return (
        <div ref={ref}>
            {documento}
        </div>
    );
});