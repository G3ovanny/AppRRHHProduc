import React, { forwardRef } from 'react'

import ReactPDF, { Document, Page, StyleSheet, View, Text, PDFViewer } from '@react-pdf/renderer'
import { useAccionPersonalStore } from '../../../../hooks';
import { tipos_accion, tipos_doc } from '../../tipos-accion';
import { Box, Typography } from '@mui/material';


import logoUpec from '../../../../assets/images/logos/logoUpec.png';
import logoMdt from '../../../../assets/images/logos/logoMdt.png';

const tiposDoc = tipos_doc.tipos
// me permite dividir en 4 columnas el arreglo de tipo de accion
const tipos = tipos_accion.tipos
let columnas = [];

const longitud = 6
for (let i = 0; i < tipos.length; i += longitud) {
    let colum = tipos.slice(i, i + longitud);
    columnas.push(colum);
}

//crear el estilo del documento
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        width: "100%",
        padding: "70px 55px",
        //backgroundColor: "blue"
    },
    header: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    img: {
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "5px",
        width: "150px",
        height: "65px",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    margen: {
        borderTop: "1px solid #000000",
        border: "1px solid #000000",
        background: "#FFFFFF",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        display: "flex",
    },
    rect_uno: {
        paddingLeft: "15px",
        paddingRight: "130px",
        paddingBottom: "10px",
        paddingTop: "15px",
        borderTop: "1px solid #000000",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rect_dos: {
        paddingLeft: "15px",
        paddingRight: "300px",
        paddingBottom: "15px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rect_tres: {
        paddingLeft: "15px",
        paddingRight: "15px",
        paddingBottom: "10px",
        paddingTop: "15px",
        flexDirection: "column",
        display: "flex",
        width: "100%",
    },
    rect_cuatro: {
        display: "flex",
        flexDirection: "row",
    },
    explicacion: {
        borderBottom: "1px solid #000000",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom: "10px",
        flexDirection: "column",
        display: "flex",
        width: "100%",
        minHeight: "120px",
        justifyContent: "center"
    },
    text: {
        fontFamily: 'Arial',
        fontSize: "11px",
        display: "flex",
        justifyContent: "space-between",
    },
    text_check: {
        fontFamily: 'Calibri',
        fontSize: "10px",
        display: "flex",
        justifyContent: "space-between",
    },
    rect_pequeño: {
        flexDirection: "column",
        display: "flex",
        width: "100%",
    },
    rect_pequeño_uno: {
        borderLeft: "1px solid #000000",
        flexDirection: "column",
        display: "flex",
        width: "100%",
    },
    rect_pequeño_dos: {
        borderTop: "1px solid #000000",
        display: "flex",
        justifyContent: "center"
    },
    rect_pequeño_tres: {
        display: "flex",
        justifyContent: "center"
    },
    firma: {
        paddingTop: "35px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxHeight: "85px",
    },
    fech: {
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "35px",
        display: "flex",
        justifyContent: "space-between",
    },
    cuadro: {
        width: "170px",
        borderLeft: "1px solid #000000",
        flexDirection: "column",
        display: "flex",
        justifyItems: "center",
    },
    titulos: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: "11px",
        display: "flex",
        justifyContent: "space-between",
    },
    nombres: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: "15px",
        display: "flex",
        justifyContent: "space-between",
    }
});

//

export const DocPdf = React.forwardRef((props, ref) => {
    const { activeAccion } = useAccionPersonalStore();

    let document = []
    activeAccion.map((data, index) => {

        const tipo = data.tipo_accion
        const tipoDo = data.doc_base

        //-----------------permite generar el codigo de la accion de personal--------------------//
        const anio = new Date().getFullYear();
        const codApPa = data.apellido_paterno.substring(0, 2)
        const codNom = data.nombres.substring(0, 2)
        const tipoAccion = tipos.filter((tipos) => tipos.nombre === tipo)
        const codigoAccion = tipoAccion[0].cod
        const contador = data.contador
        const cod_accion = `${codigoAccion}-${codApPa}-${codNom}-${anio}-${contador}`

        let lugarTrabajo = ''
        if (data.puesto_propuesta) {
            lugarTrabajo = 'TULCÁN-UPEC'
        }
        return (
            document.push(
                <Box key={index}>
                    <Box size="A4" style={styles.page}>
                        <Box style={styles.margen} >
                            <Box style={styles.header}>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/8/84/UPEC_LOGO.svg"
                                    width="70" height="70"
                                />
                                
                                <img
                                    src="https://seeklogo.com/images/M/ministerio-del-trabajo-ecuador-logo-F140F8BD3A-seeklogo.com.png"
                                    width="150" height="75"
                                />
                                {/* <img src={logoUpec} /> */}
                                {/* <img src={logoMdt} /> */}
                                <Box style={styles.cuadro}>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.titulos}>
                                            ACCION DE PERSONAL
                                        </Typography >
                                    </Box>
                                    <Box style={styles.rect_tres}>
                                        <Typography style={styles.text}>
                                            No. {cod_accion}
                                        </Typography>
                                        <Typography style={styles.text}>
                                            Fecha: {data.fecha_accion}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box style={styles.rect_uno}>
                                {tiposDoc.map((doc, index) => {
                                    let check = false
                                    {
                                        if (doc.nombre === tipoDo) {
                                            check = true;
                                        } else {
                                            check = false;
                                        }
                                        return (
                                            <Typography style={styles.text} key={index}>
                                                {doc.nombre}
                                                <input type="checkbox" defaultChecked={check} />
                                            </Typography>
                                        )
                                    }
                                })}
                            </Box>
                            <Box style={styles.rect_dos}>
                                <Typography style={styles.text} >
                                    No. {data.num_doc}
                                </Typography>
                                <Typography style={styles.text} >
                                    FECHA: {data.fecha_doc}
                                </Typography>
                            </Box>
                            <Box style={styles.rect_cuatro}>
                                <Box style={styles.rect_pequeño}>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.nombres}>{data.apellido_paterno} {data.apellido_materno}</Typography>
                                    </Box>
                                    <Box style={styles.rect_pequeño_tres}>
                                        <Typography style={styles.text} >APELLIDOS</Typography>
                                    </Box>
                                </Box>
                                <Box style={styles.rect_pequeño_uno}>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.nombres}>{data.nombres}</Typography>
                                    </Box>
                                    <Box style={styles.rect_pequeño_tres}>
                                        <Typography style={styles.text}>NOMBRES</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box style={styles.rect_cuatro}>
                                <Box style={styles.rect_pequeño}>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.text}>No. de Cédula de Ciudadania</Typography>
                                    </Box>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.text} >{data.numero_identidad}</Typography>
                                    </Box>
                                </Box>
                                <Box style={styles.rect_pequeño_uno}>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.text}>No. De Afiliacion IESS</Typography>
                                    </Box>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.text}>1768132370001</Typography>
                                    </Box>
                                </Box>
                                <Box style={styles.rect_pequeño_uno}>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.text}>Rigue a partir de:</Typography>
                                    </Box>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.text}>{data.fecha_rigue}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box style={styles.rect_cuatro}>
                                <Box style={styles.rect_pequeño}>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.titulos}>
                                            EXPLICACION
                                        </Typography>
                                    </Box>
                                    <Box style={styles.explicacion}>
                                        <Typography style={styles.text}>
                                            {data.explicacion}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box style={styles.rect_cuatro}>
                                <Box style={styles.rect_tres}>
                                    {columnas[0].map((col, index) => {
                                        let check = false
                                        {
                                            if (col.nombre === tipo) {
                                                check = true;
                                            } else {
                                                check = false;
                                            }
                                            return (
                                                <Typography style={styles.text_check} key={index} >
                                                    {col.nombre}
                                                    <input type="checkbox" defaultChecked={check} />
                                                </Typography>
                                            )
                                        }
                                    })}
                                </Box>
                                <Box style={styles.rect_tres}>
                                    {columnas[1].map((col, index) => {
                                        let check = false
                                        {
                                            if (col.nombre === tipo) {
                                                check = true;
                                            } else {
                                                check = false;
                                            }
                                            return (
                                                <Typography style={styles.text_check} key={index} >
                                                    {col.nombre}
                                                    <input type="checkbox" defaultChecked={check} />
                                                </Typography>
                                            )
                                        }
                                    })}
                                </Box>
                                <Box style={styles.rect_tres}>
                                    {columnas[2].map((col, index) => {
                                        let check = false
                                        {
                                            if (col.nombre === tipo) {
                                                check = true;
                                            } else {
                                                check = false;
                                            }
                                            return (
                                                <Typography style={styles.text_check} key={index} >
                                                    {col.nombre}
                                                    <input type="checkbox" defaultChecked={check} />
                                                </Typography>
                                            )
                                        }
                                    })}
                                </Box>
                                <Box style={styles.rect_tres}>
                                    {columnas[3].map((col, index) => {
                                        let check = false
                                        {
                                            if (col.nombre === tipo) {
                                                check = true;
                                            } else {
                                                check = false;
                                            }
                                            return (
                                                <Typography style={styles.text_check} key={index}>
                                                    {col.nombre}
                                                    <input type="checkbox" defaultChecked={check} />
                                                </Typography>
                                            )
                                        }

                                    })}
                                    <Typography style={styles.text_check} >
                                        ______
                                    </Typography>
                                </Box>
                            </Box>
                            <Box style={styles.rect_cuatro}>
                                <Box style={styles.rect_pequeño}>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.titulos}>
                                            SITUACION ACTUAL
                                        </Typography>
                                    </Box>
                                    <Box style={styles.rect_tres}>
                                        <Typography style={styles.text} >
                                            PROCESO:
                                        </Typography>
                                        <Typography style={styles.text} >
                                            SUBPROCESO:
                                        </Typography>
                                        <Typography style={styles.text} >
                                            PUESTO: {data.puesto_actual}
                                        </Typography>
                                        <Typography style={styles.text} >
                                            LUGAR DE TRABAJO: TULCÁN-UPEC
                                        </Typography>
                                        <Typography style={styles.text} >
                                            REMUNERACIÓN MENSUAL: {data.rmu_actual}
                                        </Typography>
                                        <Typography style={styles.text} >
                                            PARTIDA PRESUPUESTARIA:
                                        </Typography>
                                        <Typography style={styles.text} >
                                            {data.estructura_actual} - {data.partida_actual}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box style={styles.rect_pequeño_uno}>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.titulos}>
                                            SITUACION PROPUESTA
                                        </Typography>
                                    </Box>
                                    <Box style={styles.rect_tres}>
                                        <Typography style={styles.text} >
                                            PROCESO:
                                        </Typography>
                                        <Typography style={styles.text} >
                                            SUBPROCESO:
                                        </Typography>
                                        <Typography style={styles.text} >
                                            PUESTO: {data.puesto_propuesta}
                                        </Typography>
                                        <Typography style={styles.text} >
                                            LUGAR DE TRABAJO: {lugarTrabajo}
                                        </Typography>
                                        <Typography style={styles.text} >
                                            REMUNERACIÓN MENSUAL:{data.rmu_propuesta}
                                        </Typography>
                                        <Typography style={styles.text} >
                                            PARTIDA PRESUPUESTARIA:
                                        </Typography>
                                        <Typography style={styles.text} >
                                            {data.estructura_propuesta} {data.partida_propuesta}
                                        </Typography>
                                    </Box>

                                </Box>
                            </Box>
                            <Box style={styles.rect_cuatro}>
                                <Box style={styles.rect_pequeño}>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.titulos}>
                                            ACTA FINAL DE CONCURSO
                                        </Typography>
                                    </Box>
                                    <Box style={styles.fech} >
                                        <Typography style={styles.text}>
                                            No. ____________________
                                        </Typography>
                                        <Typography style={styles.text}>
                                            Fecha: ____________________
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box style={styles.rect_pequeño_uno}>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.titulos}>
                                            PROCESO DE TALENTO HUMANO
                                        </Typography>
                                    </Box>
                                    <Box style={styles.firma}>
                                        <Typography style={styles.text}>
                                            f.______________________
                                        </Typography>
                                        <Typography style={styles.titulos}>
                                            Nombre:  Dra: Rocío Montenegro A.
                                        </Typography>
                                        <Typography style={styles.titulos}>
                                            Jefe de Talento Humano
                                        </Typography>
                                    </Box>

                                </Box>
                            </Box>
                            <Box style={styles.rect_cuatro}>
                                <Box style={styles.rect_pequeño}>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.titulos}>
                                            DIOS, PATRIA Y LIBERTAD
                                        </Typography>
                                    </Box>
                                    <Box style={styles.firma}>
                                        <Typography style={styles.text}
                                        >
                                            f.____________________
                                        </Typography>
                                        <Typography style={styles.titulos}>
                                            Nombre:  PhD. Jorge Mina Ortega
                                        </Typography>
                                        <Typography style={styles.titulos}>
                                            AUTORIDAD NOMINADORA
                                        </Typography>
                                    </Box>

                                </Box>
                            </Box>
                            <Box style={styles.rect_cuatro}>
                                <Box style={styles.rect_pequeño}>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.titulos}>
                                            TALENTO HUMANO
                                        </Typography>
                                    </Box>
                                    <Box style={styles.fech}>
                                        <Typography style={styles.text} >
                                            No. {cod_accion}
                                        </Typography>
                                        <Typography style={styles.text}>
                                            Fecha: {data.fecha_accion}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box style={styles.rect_pequeño_uno}>
                                    <Box style={styles.rect_pequeño_dos}>
                                        <Typography style={styles.titulos}>
                                            REGISTRO Y CONTROL
                                        </Typography>
                                    </Box>
                                    <Box style={styles.firma}>
                                        <Typography style={styles.text}>
                                            f.______________________
                                        </Typography>
                                        <Typography style={styles.titulos}>
                                            Responsable del Registro Talento Humano
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box >
                    <Box size="A4" style={styles.page}>
                        <Box style={styles.margen}>
                            <Box style={styles.rect_cuatro}>
                                <Box style={styles.rect_pequeño}>
                                    <Box style={styles.explicacion}>
                                        <br />
                                        <Typography style={styles.text}>
                                            CAUCION REGISTRADA CON No. __________________________________________________
                                        </Typography>
                                        <br />
                                        <Typography style={styles.text}>
                                            Fecha: ____________________
                                        </Typography>
                                        <br />
                                        <Typography style={styles.text}>
                                            _______________________________________________________________________________________
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography style={styles.text}>
                                            _______________________________________________________________________________________
                                        </Typography>
                                        <br />
                                    </Box>
                                </Box>
                            </Box>
                            <Box style={styles.rect_cuatro}>
                                <Box style={styles.rect_pequeño}>
                                    <Box style={styles.explicacion}>
                                        <br />
                                        <br />
                                        <br />
                                        <Typography style={styles.text}>
                                            LA PERSONA REEMPLAZA A: ______________________________________
                                        </Typography>
                                        <br />
                                        <Typography style={styles.text}>
                                            EN EL PUESTO DE: ________________
                                        </Typography>
                                        <br />
                                        <Typography style={styles.text}>
                                            QUIEN CESO EN FUNCIONES POR: _______________________________________________________________________
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography style={styles.text}>
                                            ACCION DE PERSONAL REGISTRADA CON No. ____________________________
                                        </Typography>
                                        <br />
                                        <Typography style={styles.text}>
                                            No. ____________________________
                                        </Typography>
                                        <br />
                                        <Typography style={styles.text}>
                                            FECHA ____________________________
                                        </Typography>
                                        <br />
                                    </Box>
                                </Box>
                            </Box>
                            <Box style={styles.rect_cuatro}>
                                <Box style={styles.rect_pequeño}>
                                    <Box style={styles.explicacion}>
                                        <br />
                                        <br />
                                        <br />
                                        <Typography style={styles.text}>
                                            YO {data.apellido_paterno} {data.apellido_materno} {data.nombres}
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography style={styles.text}>
                                            CON CEDULA DE CIUDADANIA No. {data.numero_identidad}
                                        </Typography>
                                        <br />
                                        <Typography style={styles.text}>
                                            LUGAR: Tulcán
                                        </Typography>
                                        <br />
                                        <Typography style={styles.text}>
                                            FECHA: {data.fecha_accion}
                                        </Typography>
                                        <br />

                                        <Box style={styles.rect_cuatro}>
                                            <Box style={styles.rect_pequeño}>
                                                <Box style={styles.rect_tres}>
                                                    <Box style={styles.firma}>
                                                        <Typography style={styles.text}>
                                                            f.______________________
                                                        </Typography>
                                                        <Typography style={styles.text}>
                                                            Funcionario
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box style={styles.rect_pequeño}>
                                                <Box style={styles.rect_pequeño}>
                                                    <Box style={styles.rect_tres}>
                                                        <Box style={styles.firma}>
                                                            <Typography style={styles.text}>
                                                                f.______________________
                                                            </Typography>
                                                            <Typography style={styles.text}>
                                                                Responsable de Talento Humano
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )
        )

    })
    return (
        <div ref={ref}>
            {document}
        </div >
    );
});