import {
  Grid,
  Button,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  styled,
} from "@mui/material";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function ListaFuncionarios() {
  return (
    <div>
      {/* <MiniDrawer /> */}
      <Grid item style={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <Typography component="h1" variant="h5">
          Lista de Funcionários
        </Typography>
        <Button variant="contained" color="primary">
          Novo Funcionário
        </Button>
      </Grid>

      <Grid item></Grid>
    </div>
  );
}
