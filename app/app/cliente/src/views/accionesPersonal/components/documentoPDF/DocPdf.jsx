import React, { forwardRef, useEffect } from 'react'

import { StyleSheet } from '@react-pdf/renderer'
import { useAccionPersonalStore, useDenominacionPuestoStore, useEstructuraProgramaticaStore, useUnidadOrganicaStore } from '../../../../hooks';
import { tipos_accion, tipos_doc } from '../../tipos-accion';
import { Checkbox, Grid, Typography, Box } from "@mui/material";
import { red } from '@mui/material/colors';
// import logoUpec from '';

const tiposDoc = tipos_doc.tipos
// me permite dividir en 4 columnas el arreglo de tipo de accion
const tipos = tipos_accion.tipos
let columnas = [];

const longitud = 6
for (let i = 0; i < tipos.length; i += longitud) {
    let colum = tipos.slice(i, i + longitud);
    columnas.push(colum);
}



export const DocPdf = React.forwardRef((props, ref) => {
    const { activeAccion } = useAccionPersonalStore();
    const { listDenominacion, startLoadingDenominacion } = useDenominacionPuestoStore();
    const { listUnidad, startLoadingUnidad } = useUnidadOrganicaStore();
    const { listEstructura, startLoadingEstructura } = useEstructuraProgramaticaStore();
    let document = []
    activeAccion.map((data, index) => {

        const tipo = data.tipo_accion
        const tipoDo = data.doc_base

        //-----------------permite generar el codigo de la accion de personal--------------------//
        //const anio = new Date().getFullYear();
        const anio = data.fecha_accion.split("-")[0]
        const codApPa = data.apellido_paterno.substring(0, 2)
        const codNom = data.nombres.substring(0, 2)
        const contador = data.contador
        const otroTipo = data.otro_tipo
        const tipoAccion = tipos.filter((tipos) => tipos.nombre === tipo)
        const codigoAccion = tipoAccion[0].cod
        //const datos = tableCells.props.list || objetos;
        let cod_accion = ''
        if (otroTipo) {
            const otTipo = otroTipo.substring(0, 2).toUpperCase()
            cod_accion = `${otTipo}-${codApPa}-${codNom}-${anio}-${contador}`
        } else {
            cod_accion = `${codigoAccion}-${codApPa}-${codNom}-${anio}-${contador}`
        }

        let lugarTrabajo = ''
        if (data.puesto_propuesta) {
            lugarTrabajo = 'TULCÁN-UPEC'
        }

        let unidad_propuesta = ''
        if (data.subproceso_propuesta) {
            startLoadingUnidad()
            const id_unidad = data.subproceso_propuesta
            const unidad = listUnidad.find(unidad => unidad.id == id_unidad)
            unidad_propuesta = unidad.unidad_organica
        }
        // estructura_propuesta: "7"
        let num_estructura = ''
        if (data.estructura_propuesta) {
            startLoadingEstructura()
            const id_estructura = data.estructura_propuesta
            const estructura = listEstructura.find(estructura => estructura.id == id_estructura)
            num_estructura = estructura.estructura_programatica
        }
        // puesto_propuesta: "80"
        let nombre_denominacion = ''
        if (data.puesto_propuesta) {
            startLoadingDenominacion()
            const id_puesto = data.puesto_propuesta
            const denominacion = listDenominacion.find(denomin => denomin.id == id_puesto);
            nombre_denominacion = denominacion.denominacion_puesto
        }

        const fechaHora = (data.fecha_accion)
        // Crear un objeto Date
        const fecha = new Date(fechaHora);

        // Obtener la parte de la fecha (YYYY-MM-DD)
        const fechaSolo = fecha.toISOString().split('T')[0];

        // Restar 5 horas a la hora
        fecha.setHours(fecha.getHours() - 5);

        // Obtener solo la parte de la hora y los minutos (HH:MM)
        const horaSolo = fecha.toISOString().split('T')[1].split('Z')[0].substring(0, 5);

        const declaracion = data.declaracion_jurada

        return (
            document.push(
                <Box
                    key={index}
                >
                    <Grid
                        size="A4"
                        sx={{
                            flexDirection: "column",
                            width: "100%",
                            padding: "70px 55px",
                        }}
                    >
                        <Grid
                            container
                            sx={{
                                border: "1px solid #000000",
                                // minWidth: '100%',
                                // height: '100vh', // Altura completa de la ventana del navegador
                                alignItems: "center",
                            }}
                        >
                            <Grid
                                item
                                xs={7}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between", // Espacio entre las imágenes
                                    alignItems: "center",
                                    padding: "2px 64px", // Centrar verticalmente las imágenes dentro del contenedor
                                }}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src="https://static.wixstatic.com/media/7a1b61_f0aebc03ee2f4a80bfb6bf8c15e71edd~mv2.png/v1/fill/w_500,h_458,al_c,q_85,enc_auto/7a1b61_f0aebc03ee2f4a80bfb6bf8c15e71edd~mv2.png"
                                        width="70"
                                        height="70"
                                    />
                                </Grid>

                                {/* <Grid
                                    item
                                    xs={3}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src="https://static.wixstatic.com/media/7a1b61_f0aebc03ee2f4a80bfb6bf8c15e71edd~mv2.png/v1/fill/w_500,h_458,al_c,q_85,enc_auto/7a1b61_f0aebc03ee2f4a80bfb6bf8c15e71edd~mv2.png"
                                        width="70"
                                        height="70"
                                    />
                                </Grid> */}
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "flex-start",
                                }}
                            >
                                <Grid
                                    container
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: "4px",
                                        borderLeft: "1px solid #000000",
                                        borderBottom: "1px solid #000000",
                                        // backgroundColor: '#E0E0E0',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            color: "#000000",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        ACCIÓN DE PERSONAL
                                    </Typography>
                                </Grid>
                                <Grid container>
                                    <Grid
                                        item
                                        xs={5}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "2px",
                                            borderLeft: "1px solid #000000",
                                            borderBottom: "1px solid #000000",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "11px",
                                                color: "#000000",
                                                fontWeight: 'bold',

                                            }}
                                        >
                                            Nro.
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={7}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "2px",
                                            borderLeft: "1px solid #000000",
                                            borderBottom: "1px solid #000000",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "11px",
                                                color: "#000000",
                                            }}
                                        >
                                            {cod_accion}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    direction="column"
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-start", // Alinea los elementos hijos a la izquierda
                                        borderLeft: "1px solid #000000",
                                    }}
                                >
                                    <Grid
                                        item
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderBottom: "1px solid #000000", // Borde inferior para separación
                                            width: "100%", // Asegura que cada celda ocupe el ancho completo del contenedor
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "9px", // Tamaño de la fuente
                                                color: "#000000", // Color del texto
                                                fontWeight: 'bold',

                                            }}
                                        >
                                            FECHA DE ELABORACIÓN
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%", // Asegura que cada celda ocupe el ancho completo del contenedor
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "11px", // Tamaño de la fuente
                                                color: "#000000", // Color del texto
                                            }}
                                        >
                                            {fechaSolo}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                sx={{
                                    borderTop: "1px solid #000000",
                                    alignItems: "center",
                                }}
                            >
                                <Grid
                                    item
                                    xs={6}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography padding="5px" fontSize="13px" color="initial">
                                        {data.apellido_paterno} {data.apellido_materno}
                                    </Typography>
                                    <Typography fontSize="12px" color="initial" fontWeight='bold' >
                                        APELLIDOS
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderLeft: "1px solid #000000",
                                    }}
                                >
                                    <Typography padding="5px" fontSize="13px" color="initial">
                                        {data.nombres}
                                    </Typography>
                                    <Typography fontSize="12px" color="initial" fontWeight='bold' >
                                        NOMBRES
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                sx={{
                                    borderTop: "1px solid #000000",
                                    borderBottom: "1px solid #000000",
                                    // alignItems: "center",
                                }}
                            >
                                <Grid
                                    xs={6}
                                    sx={{
                                        display: "flex",
                                    }}
                                >
                                    <Grid container direction="column">
                                        <Grid
                                            item
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: "8px",
                                                borderBottom: "1px solid #000000",
                                                // width: '100%',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "8px",
                                                    fontWeight: 'bold',

                                                }}
                                            >
                                                DOCUMENTO DE IDENTIFICACIÓN
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: 0.5,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "11px",
                                                    color: "#000000",
                                                }}
                                            >
                                                CÉDULA
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        container
                                        direction="column"
                                        sx={{
                                            borderLeft: "1px solid #000000",
                                        }}
                                    >
                                        <Grid
                                            item
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: "8px",
                                                borderBottom: "1px solid #000000",

                                                // width: '100%',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "8px",
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                NRO. DE IDENTIFICACIÓN
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: 0.5,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "11px",
                                                    color: "#000000",
                                                }}
                                            >
                                                {data.numero_identidad}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    xs={6}
                                    sx={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderLeft: "1px solid #000000",
                                        width: "100%",
                                    }}
                                >
                                    {/* Grid RIGE */}
                                    <Grid
                                        sx={{
                                            width: "100%",
                                            borderBottom: "1px solid #000000",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                fontSize: "9px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            RIGE:
                                        </Typography>
                                    </Grid>

                                    {/* Container para los elementos inferiores */}
                                    <Grid
                                        container
                                        sx={{
                                            width: "100%",
                                        }}
                                    >
                                        {/* Documento de Identificación */}
                                        <Grid
                                            item
                                            xs={6}
                                            sx={{
                                                borderRight: "1px solid #000000",
                                            }}
                                        >
                                            <Grid
                                                sx={{
                                                    borderBottom: "1px solid #000000",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "100%",
                                                        fontSize: "9px",
                                                        fontWeight: 'bold',

                                                    }}
                                                >
                                                    DESDE (dd-mm-aaaa)
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    padding: 0.5,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: "11px",
                                                        color: "#000000",
                                                    }}
                                                >
                                                    {data.fecha_rigue}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        {/* Nro. de Identificación */}
                                        <Grid item xs={6}>
                                            <Grid
                                                sx={{
                                                    borderBottom: "1px solid #000000",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "100%",
                                                        fontSize: "9px",
                                                        fontWeight: 'bold',

                                                    }}
                                                >
                                                    HASTA (dd-mm-aaaa) (cuando aplica)
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    padding: 0.5,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: "11px",
                                                        color: "#000000",
                                                    }}
                                                >

                                                    {data.fecha_rigue_hasta}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                sx={{
                                    display: "flex",
                                    flexDirection: "row", // Mantiene los elementos en línea
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "2px 16px",
                                    gap: 1, // Espacio entre los Typography
                                    flexWrap: "wrap", // Permite que el contenido se ajuste en pantallas pequeñas
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    Escoja una opción
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        maxWidth: "100%",
                                        textAlign: "left",
                                    }}
                                >
                                    (según lo estipulado en el artículo 21 del Reglamento General a la
                                    Ley Orgánica del Servicio Público)
                                </Typography>
                            </Grid>
                            <Grid
                                container
                                sx={{
                                    borderTop: "1px solid #000000",
                                    borderBottom: "1px solid #000000",
                                    alignItems: "center",
                                }}
                            >
                                <Grid
                                    item
                                    xs={3}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // backgroundColor: "#E0E0E0",
                                    }}
                                >
                                    <Grid
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            padding: 1,
                                            width: "100%",
                                        }}
                                    >
                                        {columnas[0].map((col, index) => {
                                            let check = false;
                                            {
                                                if (col.nombre === tipo) {
                                                    check = true;
                                                } else {
                                                    check = false;
                                                }
                                                return (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            width: "100%",
                                                            // marginBottom: "4px", // Espacio entre filas
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize: "9px",
                                                                color: "#000000",
                                                                flexGrow: 1, // Permite que el texto ocupe el espacio disponible
                                                            }}
                                                        >
                                                            {col.nombre}
                                                        </Typography>
                                                        <Checkbox
                                                            defaultChecked={check}
                                                            sx={{
                                                                "& .MuiSvgIcon-root": {
                                                                    fontSize: 11,
                                                                },
                                                                padding: "1px",
                                                                marginLeft: 1, // Espacio entre el texto y el checkbox
                                                            }}
                                                        />
                                                    </div>
                                                );
                                            }
                                        })}
                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    xs={3}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // backgroundColor: "#E0E0E0",
                                    }}
                                >
                                    <Grid
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            padding: 1,
                                            width: "100%",
                                        }}
                                    >
                                        {columnas[1].map((col, index) => {
                                            let check = false;
                                            {
                                                if (col.nombre === tipo) {
                                                    check = true;
                                                } else {
                                                    check = false;
                                                }
                                                return (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            width: "100%",
                                                            // marginBottom: "4px", // Espacio entre filas
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize: "9px",
                                                                color: "#000000",
                                                                flexGrow: 1, // Permite que el texto ocupe el espacio disponible
                                                            }}
                                                        >
                                                            {col.nombre}
                                                        </Typography>
                                                        <Checkbox
                                                            defaultChecked={check}
                                                            sx={{
                                                                "& .MuiSvgIcon-root": {
                                                                    fontSize: 11,
                                                                },
                                                                padding: "1px",
                                                                marginLeft: 1, // Espacio entre el texto y el checkbox
                                                            }}
                                                        />
                                                    </div>
                                                );
                                            }
                                        })}
                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    xs={3}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // backgroundColor: "#E0E0E0",
                                    }}
                                >
                                    <Grid
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            padding: 1,
                                            width: "100%",
                                        }}
                                    >
                                        {columnas[2].map((col, index) => {
                                            let check = false;
                                            {
                                                if (col.nombre === tipo) {
                                                    check = true;
                                                } else {
                                                    check = false;
                                                }
                                                return (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            width: "100%",
                                                            // marginBottom: "4px", // Espacio entre filas
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize: "9px",
                                                                color: "#000000",
                                                                flexGrow: 1, // Permite que el texto ocupe el espacio disponible
                                                            }}
                                                        >
                                                            {col.nombre}
                                                        </Typography>
                                                        <Checkbox
                                                            defaultChecked={check}
                                                            sx={{
                                                                "& .MuiSvgIcon-root": {
                                                                    fontSize: 11,
                                                                },
                                                                padding: "1px",
                                                                marginLeft: 1, // Espacio entre el texto y el checkbox
                                                            }}
                                                        />
                                                    </div>
                                                );
                                            }
                                        })}
                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    xs={3}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // backgroundColor: "#E0E0E0",
                                    }}
                                >
                                    <Grid
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            padding: 1,
                                            width: "100%",
                                        }}
                                    >
                                        {columnas[3].map((col, index) => {
                                            let check = false;
                                            {
                                                if (col.nombre === tipo) {
                                                    check = true;
                                                } else {
                                                    check = false;
                                                }
                                                return (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            width: "100%",
                                                            // marginBottom: "4px", // Espacio entre filas
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize: "9px",
                                                                color: "#000000",
                                                                flexGrow: 1, // Permite que el texto ocupe el espacio disponible
                                                            }}
                                                        >
                                                            {col.nombre}
                                                        </Typography>
                                                        <Checkbox
                                                            defaultChecked={check}
                                                            sx={{
                                                                "& .MuiSvgIcon-root": {
                                                                    fontSize: 11,
                                                                },
                                                                padding: "1px",
                                                                marginLeft: 1, // Espacio entre el texto y el checkbox
                                                            }}
                                                        />
                                                    </div>
                                                );
                                            }
                                        })}
                                        <Typography
                                            sx={{
                                                fontSize: "9px",
                                                color: "#000000",
                                                flexGrow: 1, // Permite que el texto ocupe el espacio disponible
                                            }}
                                        >
                                            {data.otro_tipo}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row", // Mantiene los elementos en línea
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: "2px 16px",
                                        gap: 1, // Espacio entre los Typography
                                        flexWrap: "wrap", // Permite que el contenido se ajuste en pantallas pequeñas
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "8px",
                                            color: "#000000",
                                            // fontWeight: "bold",
                                            whiteSpace: "nowrap", // Evita que el título se rompa
                                        }}
                                    >
                                        EN CASO DE REQUERIR EXPLICACIÓN DE LO SELECCIONADO:  {data.detalle_tipo_accion}
                                    </Typography>
                                </Grid>
                                {/* DELCARACION JURADA */}
                                <Grid
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row", // Mantiene los elementos en línea
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: "2px 16px",
                                        gap: 1, // Espacio entre los Typography
                                        flexWrap: "wrap", // Permite que el contenido se ajuste en pantallas pequeñas
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "9px",
                                            color: "#000000",
                                            fontWeight: "bold",
                                            whiteSpace: "nowrap", // Evita que el título se rompa
                                        }}
                                    >
                                        *PRESENTÓ LA DECLARACIÓN JURADA:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "9px",
                                            color: "#000000",
                                            maxWidth: "100%",
                                            textAlign: "left",
                                        }}
                                    >
                                        (número 2 del art. 3 RLOSEP)
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "8px",
                                            color: "#000000",
                                            flexGrow: 1, // Permite que el texto ocupe el espacio disponible
                                        }}
                                    >
                                        SI
                                    </Typography>
                                    <Checkbox
                                        //defaultChecked={check}
                                        sx={{
                                            "& .MuiSvgIcon-root": {
                                                fontSize: 11,
                                            },
                                            padding: "1px",
                                            marginLeft: 1, // Espacio entre el texto y el checkbox
                                        }}
                                        checked={declaracion}
                                    />
                                    <Typography
                                        sx={{
                                            fontSize: "8px",
                                            color: "#000000",
                                            flexGrow: 1, // Permite que el texto ocupe el espacio disponible
                                        }}
                                    >
                                        NO APLICA
                                    </Typography>
                                    <Checkbox
                                        //defaultChecked={check}
                                        sx={{
                                            "& .MuiSvgIcon-root": {
                                                fontSize: 11,
                                            },
                                            padding: "1px",
                                            marginLeft: 1, // Espacio entre el texto y el checkbox
                                        }}
                                        checked={!declaracion}

                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                sx={{
                                    display: "flex",
                                    flexDirection: "row", // Mantiene los elementos en línea
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "2px 16px",
                                    gap: 1, // Espacio entre los Typography
                                    flexWrap: "wrap", // Permite que el contenido se ajuste en pantallas pequeñas
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    MOTIVACIÓN:
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        maxWidth: "100%",
                                        textAlign: "left",
                                    }}
                                >
                                    (adjuntar anexo si lo posee)
                                </Typography>
                            </Grid>

                            <Grid
                                container
                                sx={{
                                    borderTop: "1px solid #000000",
                                    // borderBottom: "1px solid #000000",
                                    alignItems: "center",
                                }}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        minHeight: "135px",
                                        maxHeight: "250px",
                                        overflow: "auto",
                                        padding: "2px 16px"

                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "9px",
                                            color: "#000000",
                                            maxWidth: "100%",
                                            textAlign: "left",
                                        }}
                                    >
                                        {data.explicacion}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            sx={{
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                alignItems: "center",
                            }}
                        >
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    SITUACION ACTUAL
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRight: "1px solid #000000",
                                    borderLeft: "1px solid #000000",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    SITUACION PROPUESTA
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            sx={{
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                pading: "4px"
                                // alignItems: "center",
                            }}
                        >
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: "2px 16px",
                                    // gap: 1,
                                    // alignItems: "center",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    PROCESO INSTITUCIONAL:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    {data.proceso_actual}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    NIVEL DE GESTIÓN:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    {/* {data.nivel de gestion} */}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    UNIDAD ADMINISTRATIVA:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "18px",
                                    }}
                                >
                                    {data.subproceso_actual}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    LUGAR DE TRABAJO:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    TULCÁN-UPEC
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    DENOMINACIÓN DEL PUESTO:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    {data.puesto_actual}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    GRUPO OCUPACIONAL:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    {data.escala_ocupacional_actual}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    GRADO:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    {data.grado_actual}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    REMUNERACIÓN MENSUAL:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    {data.rmu_actual}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    PARTIDA INDIVIDUAL:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    {data.partida_actual}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    // gap: 1,
                                    // alignItems: "center",
                                    borderRight: "1px solid #000000",
                                    borderLeft: "1px solid #000000",
                                    padding: "2px 16px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    PROCESO INSTITUCIONAL:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    {data.proceso_propuesta}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    NIVEL DE GESTIÓN:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    {/* {data.proceso_propuesta} */}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    UNIDAD ADMINISTRATIVA:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    {data.subproceso_propuesta}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    LUGAR DE TRABAJO:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    {lugarTrabajo}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    DENOMINACIÓN DEL PUESTO:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    {data.puesto_propuesta}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    GRUPO OCUPACIONAL:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    {data.grupo_ocupacional_actual_propuesta}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    GRADO:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    {data.grado_propuesta}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    REMUNERACIÓN MENSUAL:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    {data.rmu_propuesta}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    PARTIDA INDIVIDUAL:
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        fontSize: "9px",
                                        color: "#000000",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                        minHeight: "9px",
                                        maxHeight: "9px",
                                    }}
                                >
                                    {data.partida_propuesta}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            sx={{
                                display: "flex",
                                flexDirection: "row", // Mantiene los elementos en línea
                                padding: "2px 16px",
                                gap: 1, // Espacio entre los Typography
                                flexWrap: "wrap", // Permite que el contenido se ajuste en pantallas pequeñas
                                borderRight: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "9px",
                                    color: "#000000",
                                    fontWeight: "bold",
                                    whiteSpace: "nowrap", // Evita que el título se rompa
                                }}
                            >
                                POSESIÓN DEL PUESTO:
                            </Typography>
                        </Grid>

                        <Grid
                            container
                            sx={{
                                borderTop: "1px solid #000000",
                                // borderBottom: "1px solid #000000",
                                alignItems: "center",
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "4px 16px",

                                    overflow: "auto",
                                    borderRight: "1px solid #000000",
                                    borderLeft: "1px solid #000000",
                                    borderBottom: "1px solid #000000",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        maxWidth: "100%",
                                        textAlign: "left",
                                    }}
                                >
                                    YO, _______________________________________________________ CON NRO DE DOCUMENTO DE
                                    IDENTIDAD ____________________________ JURO LEALTAD AL ESTADO ECUATORIANO.
                                    {/* YO, {data.nombres} {data.apellido_paterno} {data.apellido_materno} CON NRO DE DOCUMENTO DE
                                    IDENTIDAD {data.numero_identidad} JURO LEALTAD AL ESTADO ECUATORIANO. */}
                                </Typography>
                                <Grid
                                    container
                                    sx={{
                                        // borderBottom: "1px solid #000000",
                                        // borderLeft: "1px solid #000000",
                                        // alignItems: "center",
                                        padding: "6px",
                                    }}
                                >
                                    <Grid
                                        item
                                        xs={6}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            // justifyContent: "center",
                                            // alignItems: "center",
                                        }}
                                    >
                                        <Grid
                                            container
                                            sx={
                                                {
                                                    // borderBottom: "1px solid #000000",
                                                    // borderLeft: "1px solid #000000",
                                                    // alignItems: "center",
                                                }
                                            }
                                        >
                                            <Grid
                                                item
                                                xs={6}
                                                sx={{
                                                    display: "flex",
                                                    // flexDirection: "column",
                                                    // justifyContent: "center",
                                                    // alignItems: "center",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: "9px",
                                                        color: "#000000",
                                                        fontWeight: "bold",
                                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                                    }}
                                                >
                                                    LUGAR:
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={6}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    // justifyContent: "center",
                                                    // alignItems: "center",
                                                    // borderRight: "1px solid #000000",
                                                    // borderLeft: "1px solid #000000",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: "9px",
                                                        color: "#000000",
                                                        fontWeight: "bold",
                                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                                    }}
                                                >
                                                    FECHA:
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            // justifyContent: "center",
                                            // alignItems: "center",
                                            // borderRight: "1px solid #000000",
                                            // borderLeft: "1px solid #000000",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "9px",
                                                color: "#000000",
                                                fontWeight: "bold",
                                                whiteSpace: "nowrap", // Evita que el título se rompa
                                            }}
                                        ></Typography>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    sx={{
                                        // borderBottom: "1px solid #000000",
                                        // borderLeft: "1px solid #000000",
                                        alignItems: "center",
                                    }}
                                >
                                    <Grid
                                        item
                                        xs={6}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            // justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Grid
                                            container
                                            sx={{
                                                // borderBottom: "1px solid #000000",
                                                // borderLeft: "1px solid #000000",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Grid
                                                item
                                                xs={6}
                                                sx={{
                                                    display: "flex",
                                                    // flexDirection: "column",
                                                    // justifyContent: "center",
                                                    alignItems: "center",
                                                    padding: "6px",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: "8px",
                                                        color: "#000000",
                                                        fontWeight: "bold",
                                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                                    }}
                                                >
                                                    **(EN CASO DE GANADOR DE CONCURSO DE MÉRITOS Y OPOSICIÓN)
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            // justifyContent: "center",
                                            // alignItems: "center",
                                            // borderRight: "1px solid #000000",
                                            // borderLeft: "1px solid #000000",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "9px",
                                                color: "#000000",
                                                fontWeight: "bold",
                                                whiteSpace: "nowrap", // Evita que el título se rompa
                                            }}
                                        ></Typography>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    sx={
                                        {
                                            // borderBottom: "1px solid #000000",
                                            // borderLeft: "1px solid #000000",
                                            // alignItems: "center",
                                        }
                                    }
                                >
                                    <Grid
                                        item
                                        xs={6}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            // justifyContent: "center",
                                            // alignItems: "center",
                                        }}
                                    >
                                        <Grid
                                            container
                                            sx={
                                                {
                                                    // borderBottom: "1px solid #000000",
                                                    // borderLeft: "1px solid #000000",
                                                    // alignItems: "center",
                                                }
                                            }
                                        >
                                            <Grid
                                                item
                                                xs={6}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: "9px",
                                                        color: "#000000",
                                                        fontWeight: "bold",
                                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                                    }}
                                                >
                                                    _________________________
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: "9px",
                                                        color: "#000000",
                                                        fontWeight: "bold",
                                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                                    }}
                                                >
                                                    NRO. ACTA FINAL
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={6}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    // justifyContent: "center",
                                                    alignItems: "center",
                                                    // borderRight: "1px solid #000000",
                                                    // borderLeft: "1px solid #000000",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: "9px",
                                                        color: "#000000",
                                                        fontWeight: "bold",
                                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                                    }}
                                                >
                                                    _______________________
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: "9px",
                                                        color: "#000000",
                                                        fontWeight: "bold",
                                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                                    }}
                                                >
                                                    FECHA
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                        sx={{
                                            display: "flex",
                                            // flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            // borderRight: "1px solid #000000",
                                            // borderLeft: "1px solid #000000",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "9px",
                                                color: "#000000",
                                                fontWeight: "bold",
                                                whiteSpace: "nowrap", // Evita que el título se rompa
                                            }}
                                        >
                                            FIRMA:
                                        </Typography>
                                        <Grid
                                            item
                                            xs={6}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                // justifyContent: "center",
                                                alignItems: "center",
                                                // borderRight: "1px solid #000000",
                                                // borderLeft: "1px solid #000000",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "9px",
                                                    color: "#000000",

                                                    fontWeight: "bold",
                                                    whiteSpace: "nowrap", // Evita que el título se rompa
                                                }}
                                            >
                                                ____________________________
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "9px",
                                                    color: "#000000",

                                                    fontWeight: "bold",
                                                    whiteSpace: "nowrap", // Evita que el título se rompa
                                                }}
                                            >
                                                SERVIDOR PÚBLICO:
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            sx={{
                                display: "flex",
                                flexDirection: "row", // Mantiene los elementos en línea
                                padding: "2px 16px",
                                gap: 1, // Espacio entre los Typography
                                flexWrap: "wrap", // Permite que el contenido se ajuste en pantallas pequeñas
                                borderRight: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "9px",
                                    color: "#000000",
                                    fontWeight: "bold",
                                    whiteSpace: "nowrap", // Evita que el título se rompa
                                }}
                            >
                                RESPONSABLES DE APROBACIÓN
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            sx={{
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",

                                alignItems: "center",
                            }}
                        >
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    DIRECTOR (A) O RESPONSABLE DE TALENTO HUMANO
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRight: "1px solid #000000",
                                    borderLeft: "1px solid #000000",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    AUTORIDAD NOMINADORA O SU DELEGADO
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            sx={{
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                                alignItems: "center",
                            }}
                        >
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    minHeight: "90px",
                                    maxHeight: "200px",
                                    overflow: "auto",
                                    padding: "2px 16px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    FIRMA: _______________________________________________
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    NOMBRE:   : Dra: Rocío Montenegro A.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    PUESTO: Jefe de Talento Humano
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    minHeight: "90px",
                                    maxHeight: "200px",
                                    overflow: "auto",
                                    padding: "2px 16px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    FIRMA: _______________________________________________
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    NOMBRE: PhD. Jorge Mina Ortega
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    PUESTO: Rector/a
                                </Typography>

                                {/* firma rector sustituto */}
                                {/* <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    NOMBRE: PhD. Benavides Rosales Hernán
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    PUESTO: Rector(S)
                                </Typography> */}
                            </Grid>
                        </Grid>
                        <Grid
                            sx={{
                                display: "flex",
                                flexDirection: "row", // Mantiene los elementos en línea
                                padding: "2px 64px",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "6px",
                                    color: "#000000",
                                    // fontWeight: "bold",
                                    whiteSpace: "nowrap", // Evita que el título se rompa
                                }}
                            >
                                Elaborado por el Ministerio del Trabajo
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "6px",
                                    color: "#000000",
                                    // fontWeight: "bold",
                                    whiteSpace: "nowrap", // Evita que el título se rompa
                                }}
                            >
                                Fecha de actualización de formato: 2024-08-23 / Version:01.1 /
                                Página 1 de 2
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* HOJA DOS */}
                    <Grid
                        size="A4"
                        sx={{
                            flexDirection: "column",
                            width: "100%",
                            padding: "70px 55px",
                        }}
                    >
                        <Grid
                            sx={{
                                display: "flex",
                                flexDirection: "row", // Mantiene los elementos en línea
                                padding: "2px 16px",
                                gap: 1, // Espacio entre los Typography
                                flexWrap: "wrap", // Permite que el contenido se ajuste en pantallas pequeñas
                                border: "1px solid #000000",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "9px",
                                    color: "#000000",
                                    fontWeight: "bold",
                                    whiteSpace: "nowrap", // Evita que el título se rompa
                                }}
                            >
                                RESPONSABLES DE FIRMAS
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            sx={{
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",

                                alignItems: "center",
                            }}
                        >
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    ACEPTACIÓN Y/O RECEPCIÓN DEL SERVIDOR PÚBLICO{" "}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRight: "1px solid #000000",
                                    borderLeft: "1px solid #000000",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    EN CASO DE NEGATIVA DE LA RECEPCIÓN (TESTIGO){" "}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            sx={{
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                                alignItems: "center",
                            }}
                        >
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    minHeight: "90px",
                                    maxHeight: "200px",
                                    overflow: "auto",
                                    padding: "2px 16px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    FIRMA: _______________________________________________
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    NOMBRE: {data.apellido_paterno} {data.apellido_materno} {data.nombres}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    FECHA: {fechaSolo}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    FECHA: {horaSolo}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    minHeight: "170px",
                                    maxHeight: "400px",
                                    overflow: "auto",
                                    padding: "2px 16px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    FIRMA: _______________________________________________
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    NOMBRE:_____________________________________________
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    FECHA:_______________________________________________
                                </Typography>
                                <Grid
                                    item
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "9px",
                                            color: "#000000",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        RAZÓN:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "8px",
                                            color: "#000000",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        En presencia del testigo se deja constancia de que la o el
                                        servidor público tiene la negativa de recibir la comunicación de
                                        registro de esta accion de personal
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                sx={{
                                    borderBottom: "1px solid #000000",
                                    borderTop: "1px solid #000000",
                                    alignItems: "center",
                                }}
                            >
                                <Grid
                                    item
                                    xs={4}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "8px",
                                            color: "#000000",
                                            pading: "2px 16px",
                                            fontWeight: "bold",
                                            whiteSpace: "nowrap", // Evita que el título se rompa
                                        }}
                                    >
                                        RESPONSABLE DE ELABORACIÓN
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRight: "1px solid #000000",
                                        borderLeft: "1px solid #000000",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "8px",
                                            color: "#000000",
                                            fontWeight: "bold",
                                            whiteSpace: "nowrap", // Evita que el título se rompa
                                        }}
                                    >
                                        RESPONSABLE DE REVISIÓN
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "8px",
                                            color: "#000000",
                                            pading: "2px 16px",
                                            fontWeight: "bold",
                                            whiteSpace: "nowrap", // Evita que el título se rompa
                                        }}
                                    >
                                        RESPONSABLE DE REGISTRO Y CONTROL
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                sx={{
                                    alignItems: "center",
                                }}
                            >
                                <Grid
                                    item
                                    xs={4}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end",
                                        minHeight: "150px",
                                        maxHeight: "150px",
                                        overflow: "auto",
                                        padding: "1px 16px",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "9px",
                                            color: "#000000",
                                            fontWeight: "bold",
                                            whiteSpace: "nowrap", // Evita que el título se rompa
                                        }}
                                    >
                                        FIRMA: ___________________________
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "9px",
                                            color: "#000000",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        NOMBRE: Msc: Sully Gustinez C.
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "9px",
                                            color: "#000000",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        PUESTO: Analista de Talento Humano
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end",
                                        minHeight: "150px",
                                        maxHeight: "150px",
                                        overflow: "auto",
                                        padding: "1px 16px",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "9px",
                                            color: "#000000",
                                            fontWeight: "bold",
                                            whiteSpace: "nowrap", // Evita que el título se rompa
                                        }}
                                    >
                                        FIRMA: ___________________________
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "9px",
                                            color: "#000000",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        NOMBRE: : Dra: Rocío Montenegro A.
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "9px",
                                            color: "#000000",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        PUESTO: Jefe de Talento Humano
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end",
                                        minHeight: "150px",
                                        maxHeight: "150px",
                                        overflow: "auto",
                                        padding: "1px 16px",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "9px",
                                            color: "#000000",
                                            fontWeight: "bold",
                                            whiteSpace: "nowrap", // Evita que el título se rompa
                                        }}
                                    >
                                        FIRMA: ___________________________
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "9px",
                                            color: "#000000",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        NOMBRE: : Dra: Rocío Montenegro A.
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "9px",
                                            color: "#000000",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        PUESTO: Jefe de Talento Humano
                                    </Typography>
                                </Grid>{" "}
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            sx={{
                                paddingTop: "60px",
                                paddingBottom: "10px",
                                // borderBottom: "1px solid #000000",
                                alignItems: "center",
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: "2px ",
                                    overflow: "auto",
                                    // borderBottom: "1px solid #000000",
                                }}
                            >
                                <Typography
                                    sx={{
                                        borderTop: "1px dashed #000000",
                                        borderBottom: "1px dashed #000000",
                                        padding: "10px",
                                        fontSize: "12px",
                                        color: "#000000",
                                        maxWidth: "100%",
                                        textAlign: "left",
                                        fontWeight: "bold",
                                    }}
                                >
                                    **USO EXCLUSIVO PARA TALENTO HUMANO
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            sx={{
                                display: "flex",
                                flexDirection: "row", // Mantiene los elementos en línea
                                padding: "2px 16px",
                                // flexWrap: "wrap", // Permite que el contenido se ajuste en pantallas pequeñas
                                border: "1px solid #000000",
                                gap: 1,
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "9px",
                                    color: "#000000",
                                    fontWeight: "bold",
                                    whiteSpace: "nowrap", // Evita que el título se rompa
                                }}
                            >
                                REGISTRO DE NOTIFICACIÓN AL SERVIDOR PÚBLICO DE LA ACCIÓN DE
                                PERSONAL
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "6px",
                                    color: "#000000",
                                    whiteSpace: "nowrap", // Evita que el título se rompa
                                }}
                            >
                                (primer inciso del art. 22 RGLOSEP, art. 101 CDA, art 66 y 126
                                ERJAFE)
                            </Typography>
                        </Grid>

                        <Grid
                            container
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                                alignItems: "center",
                            }}
                        >
                            <Grid
                                xs={12}
                                sx={{
                                    display: "flex",
                                    flexDirection: "row", // Mantiene los elementos en línea
                                    // justifyContent: "center",
                                    // alignItems: "center",
                                    padding: "2px 64px",
                                    paddingTop: "30px",
                                    gap: 1, // Espacio entre los Typography
                                    flexWrap: "wrap", // Permite que el contenido se ajuste en pantallas pequeñas
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    COMUNICACIÓN ELECTRÓNICA:
                                </Typography>

                                <Checkbox
                                    //defaultChecked={check}
                                    sx={{
                                        "& .MuiSvgIcon-root": {
                                            fontSize: 11,
                                        },
                                        padding: "1px",
                                        marginLeft: 1, // Espacio entre el texto y el checkbox
                                    }}
                                />
                            </Grid>

                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    minHeight: "90px",
                                    maxHeight: "200px",
                                    overflow: "auto",
                                    padding: "2px 64px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    FECHA: {fechaSolo}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    **MEDIO: FISICO
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    minHeight: "90px",
                                    maxHeight: "200px",
                                    overflow: "auto",
                                    padding: "2px 16px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    HORA: {horaSolo}
                                </Typography>
                            </Grid>

                            <Grid
                                xs={12}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "2px 64px",
                                    paddingTop: "90px",
                                    flexWrap: "wrap", // Permite que el contenido se ajuste en pantallas pequeñas
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    ______________________________________________
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    FIRMA DEL RESPONSABLE QUE NOTIFICÓ
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                    }}
                                >
                                    NOMBRE: : Dra: Rocío Montenegro A.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "#000000",
                                        fontWeight: "bold",
                                    }}
                                >
                                    PUESTO: Jefe de Talento Humano
                                </Typography>
                                <Typography
                                    sx={{
                                        paddingTop: "20px",
                                        paddingBottom: "20px",
                                        fontSize: "7px",
                                        color: "#000000",
                                        whiteSpace: "nowrap", // Evita que el título se rompa
                                    }}
                                >
                                    **Si la comunicación fue electrónica se deberá colocar el medio
                                    por el cual se notificó al servidor, así como, el número del
                                    documento.{" "}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            sx={{
                                display: "flex",
                                flexDirection: "row", // Mantiene los elementos en línea
                                padding: "2px 64px",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "6px",
                                    color: "#000000",
                                    // fontWeight: "bold",
                                    whiteSpace: "nowrap", // Evita que el título se rompa
                                }}
                            >
                                Elaborado por el Ministerio del Trabajo
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "6px",
                                    color: "#000000",
                                    // fontWeight: "bold",
                                    whiteSpace: "nowrap", // Evita que el título se rompa
                                }}
                            >
                                Fecha de actualización de formato: 2024-08-23 / Version:01.1 /
                                Página 2 de 2
                            </Typography>
                        </Grid>
                    </Grid>

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