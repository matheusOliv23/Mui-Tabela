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
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { theme } from "../../styles/theme";
import { api } from "../services/api";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// const funcionarios = axios
//   .get("https://nestjsmongo.herokuapp.com/users")
//   .then((response) => response.data.json());

// console.log(funcionarios);

interface IFuncionarios {
  id: string;
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

  useEffect(() => {
    setLoading(true);
    axios
      // .get(`${process.env.API_URL}/users`)
      .get("https://nestjsmongo.herokuapp.com/users")
      .then((response) => setFuncionarios(response.data))
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // if (loading) return <>{"carregando"}</>;
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

      <Grid item>
        <TableContainer
          component={Paper}
          style={{ marginTop: theme.spacing(3) }}
        >
          <Table aria-label="Clientes">
            <TableHead>
              <TableRow>
                <TableCell>Npme</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell width="140" align="center">
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {funcionarios.map((funcionario) => (
                <TableRow key={funcionario.id}>
                  <TableCell component="th" scope="row">
                    {funcionario.nome}
                  </TableCell>
                  <TableCell>{funcionario.email}</TableCell>
                  <TableCell>
                    <IconButton aria-label="delete">
                      <Delete />
                    </IconButton>
                    <Link
                      href={`/funcionarios/editarFuncionario/${funcionario.id}`}
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
      </Grid>
    </Grid>
  );
}
