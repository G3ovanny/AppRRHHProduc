import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { DeleteOutline, Edit, ForwardToInboxOutlined, Download, LocalPrintshop } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useAlertDialogStore, useModalStore, useTrabStore } from '../../../../hooks';
import { AlertDialog } from '../../../../ui';
import { DiasVacacionesPdf } from '../documentosPdf/DiasVacacionesPdf';
import { DocExcel } from '../documentoExcel';

export const TableButtons = () => {
  const { activeTrab, startDeletingTrab, startSendEmailTrab } = useTrabStore();
  const { openModal } = useModalStore();
  const numActivos = activeTrab.length;
  const { openAlertDialog, closeAlertDialog } = useAlertDialogStore();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false); // Estado para controlar la apertura de la alerta
  const content = '¿Está seguro que quiere eliminar el registro?';
  const componentRef = useRef();

  const handleSendEmail = () => {
    startSendEmailTrab();
  };

  const handleEdit = (event) => {
    event.preventDefault();
    openModal('Editando datos');
  };

  const handleDelete = () => {
    openAlertDialog(content);
    //startDeletingTrab()
  };

  const handleConfirmation = () => {
    startDeletingTrab();
    closeAlertDialog();
    setDeleteConfirmation(false); // Reinicia el estado de confirmación de eliminación
  };

  const handlePrint = () => {
    DocExcel(activeTrab);
  };

  //TODO: IMPIME EN PDF LOS DIAS DE VACACIONES DE CADA UNO DE LOS FUNCIONARIOS
  // const handlePrintpdf = () => {
  //   printPdf();
  // };

  const printPdf = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {numActivos !== 1 ? (
        <>
          <Tooltip title="Exportar a excel" color="secondary">
            <IconButton component="div" disabled={!numActivos} onClick={handlePrint}>
              <Download />
            </IconButton>
          </Tooltip>
          <Tooltip title="Enviar correo" color="secondary">
            <IconButton component="div" disabled={!numActivos} onClick={handleSendEmail}>
              <ForwardToInboxOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar" color="error">
            <IconButton component="div" disabled={!numActivos} onClick={handleDelete}>
              <DeleteOutline />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
        
          {/* 
          -------------------------> IMPRIMIR LOS PERMISOS TOTALES POR AÑO <------------------------------------------
          <Tooltip title="Imprimir dias de vacaciones" color="secondary">
            <IconButton component="div" disabled={!numActivos} onClick={handlePrintpdf}>
              <LocalPrintshop />
            </IconButton>
          </Tooltip> */}
          <Tooltip title="Exportar a excel" color="secondary">
            <IconButton component="div" disabled={!numActivos} onClick={handlePrint}>
              <Download />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar" color="secondary">
            <IconButton onClick={handleEdit}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Enviar correo" color="secondary">
            <IconButton component="div" disabled={!numActivos} onClick={handleSendEmail}>
              <ForwardToInboxOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar" color="error">
            <IconButton onClick={handleDelete}>
              <DeleteOutline />
            </IconButton>
          </Tooltip>
        </>
      )}
      <AlertDialog
        open={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
        onConfirm={handleConfirmation}
        title="Confirmar Eliminación"
        content={content}
      />
      {/* 
      ----------------------------> PDF DE LOS DIAS DE VACACIONES<----------------------------------
      <div style={{ display: "none" }} >
        <DiasVacacionesPdf 
        ref={componentRef} 
        //activeTrab={activeTrab} 
        />
      </div> */}
    </>
  );
};