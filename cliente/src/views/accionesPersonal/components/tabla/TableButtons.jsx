import React, { useRef } from 'react'
import { TableCells } from './TableCells'
import { useAccionPersonalStore, useModalStore } from '../../../../hooks'
import { IconButton, Tooltip } from '@mui/material';
import { DeleteOutline, Edit, LocalPrintshopOutlined } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print'
import { DocPdf } from '../documentoPDF';
import ReactPDF, { PDFViewer } from '@react-pdf/renderer';

export const TableButtons = () => {
  const componentRef = useRef();

  const { activeAccion, startDeletingAccion } = useAccionPersonalStore();
  const { openModal } = useModalStore();
  const numActivos = activeAccion.length;

  const handleEdit = (event) => {
    event.preventDefault();
    openModal('Editando datos')
  }

  const handleDelete = () => {
    startDeletingAccion()
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })


  return (
    <>
      {
        numActivos !== 1 ? (
          <>
            <Tooltip title="Imprimir" color='secondary'>
              <IconButton
                onClick={handlePrint}
              >
                <LocalPrintshopOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Eliminar"
              color="error"
            >
              <IconButton
                component='div'
                disabled={!numActivos}
                onClick={handleDelete}
              >
                <DeleteOutline />
              </IconButton>
            </Tooltip>

            <div style={{ display: "none" }}>
              <DocPdf ref={componentRef} />
            </div>

          </>
        ) : (
          <>
            <Tooltip title="Imprimir" color='secondary'>
              <IconButton
                onClick={handlePrint}
              >
                <LocalPrintshopOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="ELiminar" color="error">
              <IconButton
                onClick={handleDelete}
              >
                <DeleteOutline />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar" color='secondary'>
              <IconButton
                onClick={handleEdit}
              >
                <Edit />
              </IconButton>
            </Tooltip>

            <div style={{ display: "none" }}>
              <DocPdf ref={componentRef} />
            </div>
          </>
        )}
    </>
  )
}
