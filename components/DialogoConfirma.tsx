import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { forwardRef, ReactNode } from "react";

interface IConfirma {
  id: string;
  title: string;
  children: ReactNode;
  classes?: Record<"paper", string>;
  keepMounted: boolean;
  open: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onClose: any;
  // onClose: (value?: string) => void;
}

export default function DialogoConfirma(props: IConfirma) {
  const {
    children,
    open,
    title,
    cancelButtonText,
    confirmButtonText,
    onClose,
    ...other
  } = props;

  const handleCancel = () => {
    onClose("cancel");
  };

  const handleOk = () => {
    onClose("ok");
  };
  return (
    <Dialog
      // disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          {cancelButtonText || "Cancelar"}
        </Button>
        <Button onClick={handleOk} color="primary">
          {confirmButtonText || "Ok"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
