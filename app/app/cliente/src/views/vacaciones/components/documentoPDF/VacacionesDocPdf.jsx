import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react'
import { useCronogramaVacacionesStore } from '../../../../hooks';
import { Box, Typography } from '@mui/material'

const regimen = {
    tipos: [
        {
            id: '1.SERVICIO CIVIL PUBLICO (LOSEP)',
            nombre: 'LEY ORGANICA DEL SERVICIO PÚBLICO',
            cod: 'losep'
        },
        {
            id: '2.CODIGO DEL TRABAJO',
            nombre: 'CODIGO DE TRABAJO',
            cod: 'In'
        },
        {
            id: '3.OTROS REGIMENES ESPECIALES',
            nombre: 'DOCENCIA(LOES)',
            cod: 'loes'
        },
        {
            id: '4',
            nombre: 'OTROS',
            cod: 'otros'
        },
    ]
}

let columnas = []
const longitud = 2
for (let i = 0; i < regimen.tipos.length; i += longitud) {
    const colum = regimen.tipos.slice(i, i + longitud);
    columnas.push(colum)

}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        display: "flex",
        width: "100%",
        padding: "175px 65px",
    },
    margen: {
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "30px",
    },
    titulo: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: "20px",
        display: "flex",
    },
    subtitulos: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: "15px",
        display: "flex",
    },
    fechas: {
        paddingBottom: "30px",
    },
    cuadro: {
        display: "flex",
        border: "3px solid #000000",
        flexDirection: "column",
    },
    rect_uno: {
        display: "flex",
        flexDirection: "row",
    },
    rect_peque: {
        display: "flex",
        width: "100%",
        paddingBottom: "10px",
        paddingTop: "10px",
        borderBottom: "3px solid #000000",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: "10px",
        paddingRight: "10px",
        //maxHeight: "100px",
    },
    rect_peque_uno: {
        display: "flex",
        paddingBottom: "10px",
        paddingTop: "10px",
        borderLeft: "3px solid #000000",
        borderBottom: "3px solid #000000",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: "10px",
        paddingRight: "10px",
        //maxHeight: "200px",
    },
    explicacion: {
        borderBottom: "3px solid #000000",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom: "10px",
        flexDirection: "column",
        display: "flex",
        width: "100%",
        minHeight: "100px",
        justifyContent: "center"
    },
    firmas: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: "60px",
        paddingLeft: "15px",
        paddingRight: "15px"

    },
    firma: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "25px"
    },
    text_check: {
        //fontFamily: 'Calibri',
        paddingTop: "5px",
        paddingBottom: "5px",
        fontSize: "14px",
        display: "flex",
        justifyContent: "space-between",
    },
    text: {
        //fontFamily: 'Calibri',
        paddingLeft: "15px",
        paddingRight: "15px",
        paddingTop: "15px",
        paddingBottom: "15px",
        fontSize: "12px",
        display: "flex",
        justifyContent: "center"
    }

})

export const VacacionesDocPdf = React.forwardRef((props, ref) => {
    const { activeCronograma } = useCronogramaVacacionesStore();

    let documento = []
    activeCronograma.map((data, index) => {

        const tiposReg = regimen.tipos
        const regimen_trab = data.regimen_laboral
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
                                    SOLICITUD DE VACACIONES
                                </Typography>
                            </Box>
                            <Box style={styles.fechas}
                            >
                                <Typography style={styles.subtitulos}>
                                    FECHA DE SOLICITUD: {data.fecha_solicitud}
                                </Typography>
                                <Typography style={styles.subtitulos}>
                                    PERIODO: desde: {data.fecha_inicio} hasta: {data.fecha_fin}
                                </Typography>
                            </Box>
                            <Box style={styles.cuadro}>
                                <Box style={styles.rect_uno}>
                                    <Box style={styles.rect_peque}>
                                        <Typography style={styles.subtitulos}>
                                            APELLIDOS Y NOMBRES
                                        </Typography>
                                        <Typography>
                                            {data.nombres}
                                        </Typography>
                                    </Box>
                                    <Box style={styles.rect_peque_uno}>
                                        <Typography style={styles.subtitulos}>
                                            N° DE CÉDULA
                                        </Typography>
                                        <Typography>
                                            {data.numero_identificacion}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box style={styles.rect_uno}>
                                    <Box style={styles.rect_peque} >
                                        {columnas[0].map((reg, index) => {
                                            let check = false
                                            if (reg.id === regimen_trab) {
                                                check = true;
                                            } else {
                                                check = false;
                                            }
                                            return (
                                                <Typography style={styles.text_check} key={index}>
                                                    <input type="checkbox" defaultChecked={check} />
                                                    {reg.nombre}
                                                </Typography>
                                            )
                                        })
                                        }
                                    </Box>
                                    <Box style={styles.rect_peque} >
                                        {columnas[1].map((reg, index) => {
                                            let check = false
                                            if (reg.id === regimen_trab) {
                                                check = true;
                                            } else {
                                                check = false;
                                            }
                                            return (
                                                <Typography style={styles.text_check} key={index}>
                                                    <input type="checkbox" defaultChecked={check} />
                                                    {reg.nombre}
                                                </Typography>
                                            )
                                        })
                                        }
                                    </Box>
                                </Box>
                                <Box style={styles.rect_uno}>
                                    <Box style={styles.rect_peque}>
                                        <Typography style={styles.subtitulos}>
                                            UNIDAD ORGÁNICA
                                        </Typography>
                                        <Typography style={styles.text}>
                                            {data.unidad_organica}
                                        </Typography>
                                    </Box>
                                    <Box style={styles.rect_peque_uno}>
                                        <Typography style={styles.subtitulos}>
                                            PUESTO QUE OCUPA
                                        </Typography>
                                        <Typography style={styles.text}>
                                            {data.denominacion_puesto}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box style={styles.rect_peque}>
                                    <Typography style={styles.subtitulos}>
                                        EXPLICACIÓN:
                                    </Typography>
                                </Box>
                                <Box style={styles.explicacion}>
                                    <Typography>
                                        {data.explicacion}
                                    </Typography>
                                </Box>
                                <Box style={styles.firmas}>
                                    <Box style={styles.firma}>
                                        <Typography>
                                            ____________________
                                        </Typography>
                                        <Typography>
                                            F.) Solicitante
                                        </Typography>
                                    </Box>
                                    <Box style={styles.firma}>
                                        <Typography>
                                            ____________________
                                        </Typography>
                                        <Typography>
                                            F.) Jefe Inmediato
                                        </Typography>
                                        <Typography style={styles.subtitulos}>
                                            AUTORIZA
                                        </Typography>
                                    </Box>
                                    <Box style={styles.firma}>
                                        <Typography>
                                            ____________________
                                        </Typography>
                                        <Typography>
                                            F.) Jefe de Talento Humano
                                        </Typography>
                                        <Typography style={styles.subtitulos}>
                                            REGISTRA
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box >
                </Box>
            )
        )
    })
    return (
        <div ref={ref}>
            {documento}
        </div>
    )
});
