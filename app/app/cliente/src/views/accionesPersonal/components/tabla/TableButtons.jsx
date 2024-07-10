import React, { useRef, useState } from 'react'
import { TableCells } from './TableCells'
import { useAccionPersonalStore, useAlertDialogStore, useModalStore } from '../../../../hooks'
import { IconButton, Tooltip } from '@mui/material';
import { DeleteOutline, Download, Edit, LocalPrintshopOutlined } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print'
import { DocPdf } from '../documentoPDF';
import { DocExcel } from '../documentoExcel/DocExcel';
import { AlertDialog } from '../../../../ui';

export const TableButtons = () => {
  const componentRef = useRef();

  const { activeAccion, startDeletingAccion } = useAccionPersonalStore();
  const { openModal } = useModalStore();
  const numActivos = activeAccion.length;
  const { openAlertDialog, closeAlertDialog } = useAlertDialogStore();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const content = '¿Está seguro que quiere eliminar el registro?'

  const handleEdit = (event) => {
    event.preventDefault();
    openModal('Editando datos')
  }

  const handleDelete = () => {
    openAlertDialog(content)
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const handleUpload = () => {
    DocExcel(activeAccion)
  }

  const handleConfirmation = () => {
    startDeletingAccion()
    closeAlertDialog();
    setDeleteConfirmation(false); // Reinicia el estado de confirmación de eliminación
  };

  return (
    <>
      {
        numActivos !== 1 ? (
          <>
            <Tooltip title="Exportar a excel" color='secondary'>
              <IconButton
                component='div'
                disabled={!numActivos}
                onClick={handleUpload}
              >
                <Download />
              </IconButton>
            </Tooltip>

            <Tooltip title="Imprimir" color='secondary'>
              <IconButton
                component='div'
                disabled={!numActivos}
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
            <Tooltip title="Exportar a excel" color='secondary'>
              <IconButton
                component='div'
                disabled={!numActivos}
                onClick={handleUpload}
              >
                <Download />
              </IconButton>
            </Tooltip>

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

      <AlertDialog
        open={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
        onConfirm={handleConfirmation}
        title="Confirmar Eliminación"
        content={content}
      />
    </>
  )
}
