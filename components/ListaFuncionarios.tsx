import { Delete, Edit } from "@mui/icons-material";
import {
  Grid,
  Button,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  styled,
  IconButton,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  Table,
  TableRow,
  TableBody,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { theme } from "../styles/theme";
import { api } from "../src/services/api";
import DialogoConfirma from "./DialogoConfirma";
import EditarFuncionario from "./Edit";
import * as Yup from "yup";
import { Form, Formik } from "formik";

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

interface Projeto {
  funcionarios: IFuncionarios[];
}

interface ValoresCadastro {
  nome: string;
  email: string;
}

export default function ListaFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<IFuncionarios[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [editOptions, setEditOptions] = useState<{
    show: boolean;
    itemId?: string | null;
    itemDescription?: string | null;
  }>({ show: false });

  const [deleteOptions, setDeleteOptions] = useState<{
    show: boolean;
    itemId?: string | null;
    itemDescription?: string | null;
  }>({ show: false });

  const [messageInfo, setMessageInfo] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

  const handleDeleteCallBack = (value: any) => {
    const { itemId } = deleteOptions;

    setDeleteOptions({ show: false, itemId: null, itemDescription: null });

    if (value === "ok") {
      const deletarId = funcionarios.filter(
        (conteudo) => conteudo._id !== itemId
      );
      setFuncionarios(deletarId);
      setMessageInfo({ show: true, message: "Item excluído com sucesso" });
    }
  };

  const handleEditCallback = (value: any) => {
    const { itemId } = editOptions;

    setEditOptions({ show: false, itemId: null });

    if (value === "ok") {
      setMessageInfo({ show: true, message: "Item editado com sucesso" });
    }
  };

  const handleCloseMessage = (
    event: React.SyntheticEvent | React.MouseEvent | any,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setMessageInfo({ show: false, message: "" });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    api
      .get("/users?_order=asc&_sort=nome")
      .then((response) => setFuncionarios(response.data))
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // if (loading) return <>{"carregando"}</>;

  function handleDelete({ _id, nome }: IFuncionarios) {
    api.delete(`/users/${_id}`).then(() => {
      setDeleteOptions({
        show: true,
        itemId: _id,
        itemDescription: nome,
      });
    });
  }

  function handlEdit({ _id, nome }: IFuncionarios) {
    api.patch(`/users/${_id}`).then(() => {
      setEditOptions({
        show: true,
        itemId: _id,
        itemDescription: nome,
      });
    });
  }

  const initialValues: ValoresCadastro = {
    nome: "",
    email: "",
  };

  const handleSubmit = (values: ValoresCadastro) => {
    api
      .post("/users", values)
      .then(() => {
        setOpen(false);
      })
      .then(() => {
        setMessageInfo({ show: true, message: "Funcionário cadastrado" });
      });
  };

  console.log(initialValues);

  return (
    <Grid container direction="column">
      <Grid
        item
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        <Typography component="h1" variant="h5">
          Lista de Funcionários
        </Typography>
        <div>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Novo Funcionário
          </Button>
          <Dialog open={open}>
            <Formik
              initialValues={initialValues}
              validationSchema={cadastroSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <DialogTitle>Cadastro</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Favor preencher todas as informações para efetuar o
                      cadastro.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="nome"
                      name="nome"
                      label="Nome"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={values.nome}
                      onChange={handleChange}
                      error={touched.nome && Boolean(errors.nome)}
                      helperText={touched.nome && errors.nome}
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
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" disabled={isSubmitting}>
                      Cadastrar funcionário
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </Dialog>
        </div>
      </Grid>

      <TableContainer
        component={Paper}
        style={{
          marginTop: theme.spacing(5),
        }}
      >
        <Table aria-label="Clientes">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell align="center" width="140">
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {funcionarios.map((funcionario) => (
              <TableRow key={funcionario._id} hover={true}>
                <TableCell component="th" scope="row">
                  {funcionario.nome}
                </TableCell>
                <TableCell>{funcionario.email}</TableCell>

                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(funcionario)}
                  >
                    <Delete />
                  </IconButton>
                  {/* <Link
                    href={`/funcionarios/editarFuncionario/${funcionario._id}`}
                    passHref
                  ></Link> */}
                  <IconButton
                    aria-label="edit"
                    onClick={() => handlEdit(funcionario)}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DialogoConfirma
        id={`delete-${deleteOptions.itemId}`}
        title="Excluir"
        confirmButtonText="Excluir"
        keepMounted
        open={deleteOptions.show}
        onClose={handleDeleteCallBack}
      >
        Deseja excluir esse funcionário?{" "}
        <strong>{deleteOptions.itemDescription}</strong>
      </DialogoConfirma>

      <EditarFuncionario
        id={`editar-${editOptions.itemId}`}
        title="Editar"
        confirmButtonText="Editar"
        keepMounted
        open={editOptions.show}
        onClose={handleEditCallback}
      >
        Deseja editar esse funcionário?{" "}
        <strong>{editOptions.itemDescription}</strong>
      </EditarFuncionario>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        open={messageInfo.show}
        message={messageInfo.message}
        key={messageInfo.message}
        onClose={handleCloseMessage}
      />
    </Grid>
  );
}
