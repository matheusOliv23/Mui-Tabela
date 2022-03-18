import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IConfirmationDialogProps {
  id: string;
  title: string;
  children?: React.ReactNode;
  classes?: Record<"paper", string>;
  keepMounted: boolean;
  open: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onClose: (value?: string) => void;
}

export default function EditarFuncionario(props: IConfirmationDialogProps) {
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
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle>Editar</DialogTitle>
      <DialogContent>
        <DialogContentText>Edite os seus dados</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}
