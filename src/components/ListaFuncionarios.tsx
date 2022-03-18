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
} from "@mui/material";
import axios from "axios";
import { AnyCnameRecord } from "dns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { theme } from "../../styles/theme";
import { api } from "../services/api";
import DialogoConfirma from "./DialogoConfirma";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface IFuncionarios {
  _id: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  estado: string;
}

interface Projeto {
  funcionarios: IFuncionarios[];
}

export default function ListaFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<IFuncionarios[]>([]);
  const [loading, setLoading] = useState(false);

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
    const deletarId = funcionarios.filter(
      (conteudo) => conteudo._id !== itemId
    );
    const idDeletado = deletarId;

    setDeleteOptions({ show: false, itemId: null, itemDescription: null });

    if (value === "ok") {
      // deleta
      setFuncionarios(deletarId);
      setMessageInfo({ show: true, message: "Item excluído com sucesso" });
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
  useEffect(() => {
    setLoading(true);
    api
      .get("/users")
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
      })
    });
  }
  return (
    <Grid container direction="column">
      {/* <MiniDrawer /> */}
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
        <Link href="/funcionarios/novoFuncionario" passHref>
          <Button variant="contained" color="primary">
            Novo Funcionário
          </Button>
        </Link>
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
                  <Link
                    href={`/funcionarios/editarFuncionario/${funcionario._id}`}
                    passHref
                  >
                    <IconButton aria-label="edit">
                      <Edit />
                    </IconButton>
                  </Link>
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
