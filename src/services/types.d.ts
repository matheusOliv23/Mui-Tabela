interface IFuncionarios {
  _id: string;
  nome: string;
  email: string;
}

interface Funcionarios {
  funcionario: IFuncionarios;
}

interface FuncionariosPageProps {
  funcionariosProps: IFuncionarios[];
}

interface EditarPageProps {
  funcionarioId: IFuncionarios;
}
