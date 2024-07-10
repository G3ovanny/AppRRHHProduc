import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { usePermisoTrabStore } from '../../../../hooks';

// Estilos para la tabla
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    tableRow: {
        flexDirection: 'row'
    },
    tableCell: {
        border: '1px solid black',
        padding: 5
    },
    subtitulos: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: "15px",
        display: "flex",
    },
});


const TAX_RATE = 0.07;

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}
const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
];
const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

// Componente de la tabla
export const TablePermisos = ({ trabajador }) => {
    const { startLoadingPermisoTrab, listPermisoTrab } = usePermisoTrabStore();
    if (trabajador) {
        startLoadingPermisoTrab(trabajador)
    }
    //const listaPermisos = listPermisoTrab.filter(permiso => permiso.id_trabajador === trabajador);
    console.log(listPermisoTrab)
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="Tabla permisos">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={12} >
                            <Typography variant="body1" fontWeight="bold">
                                PERMISOS POR HORAS/DÍAS
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                                AÑO
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="body2" fontWeight="bold">
                                TOTAL DE PERMISOS
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="body2" fontWeight="bold">
                                MINUTOS ACUMULADOS
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="body2" fontWeight="bold">
                                HORAS ACUMULADAS
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="body2" fontWeight="bold">
                                DÍAS ACUMULADOS
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listPermisoTrab.map((permiso) => (
                        <TableRow key={permiso.anio}>
                            <TableCell>{permiso.anio}</TableCell>
                            <TableCell align="right">{permiso.total_permisos}</TableCell>
                            <TableCell align="right">{permiso.total_minutos}</TableCell>
                            <TableCell align="right">{permiso.total_horas}</TableCell>
                            <TableCell align="right">{permiso.total_dias}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        {/* <TableCell rowSpan={4} /> */}
                        {/* <TableCell colSpan={2}>TOTAL DE DIAS</TableCell> */}
                        <TableCell >TOTAL DE DIAS</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    )
}