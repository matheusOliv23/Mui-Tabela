import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";

const cadastroSchema = Yup.object().shape({
  nome: Yup.string()
    .min(3, "Nome precisa ter pelo menos 3 letras")
    .max(20, "Nome muito longo!")
    .required("Campo obrigatório"),
  email: Yup.string().email("Email inválido").required("Campo obrigatório"),
});

interface IFuncionarios {
  _id: string;
  nome: string;
  email: string;
}

interface IConfirmationDialogProps {
  handleSubmit: any;
  handleClose: any;
  handleEditCallback?: any;
  onClick: any;
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

interface ValoresCadastro {
  nome: string;
  email: string;
}

export default function EditarFuncionario(props: IConfirmationDialogProps) {
  const {
    children,
    open,
    title,
    cancelButtonText,
    confirmButtonText,
    onClose,
    handleSubmit,
    handleClose,
    handleEditCallback,
    onClick,
    ...other
  } = props;

  const handleCancel = () => {
    onClose("cancel");
  };

  const handleOk = () => {
    onClose("ok");
  };

  const initialValues: ValoresCadastro = {
    nome: "",
    email: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: cadastroSchema,
    onSubmit: (values) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        formik.setSubmitting(false);
      }, 3000);
    },
  });

  return (
    <Dialog
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <form noValidate onSubmit={formik.handleSubmit}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nome"
            name="nome"
            label="Nome"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.nome}
            onChange={formik.handleChange}
            error={formik.touched.nome && Boolean(formik.errors.nome)}
            helperText={formik.touched.nome && formik.errors.nome}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>
            {cancelButtonText || "Cancelar"}
          </Button>
          <Button
            onClick={handleOk}
            type="submit"
            disabled={formik.isSubmitting}
          >
            {confirmButtonText || "Editar funcionário"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
