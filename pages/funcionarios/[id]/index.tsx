import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { api } from "../../../src/services/api";
import FuncionariosService from "../../../src/services/FuncionariosService";

interface IFuncionarios {
  _id: string;
  nome: string;
  email: string;
}

interface EditarPageProps {
  funcionarioId: IFuncionarios;
}

export default function editar({ funcionarioId }: any) {
  return <div>{funcionarioId.nome}</div>;
}

export async function getStaticPaths() {
  const service = new FuncionariosService();
  const funcionarioId = await service.listar();

  const paths = funcionarioId.map((item) => ({
    params: {
      id: item._id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  // const service = new FuncionariosService();
  // const funcionario = await service.buscar(params._id);
  const funcionarioId = await api
    .get(`/users/${params._id}`)
    .then((response) => response.data);
  return {
    props: {
      funcionarioId,
    },
  };
}

// export async function getStaticPaths({params}: any) {
//   const service = new FuncionariosService();
//   const funcionariosProps = await service.buscar(params._id)

//   const paths = funcionariosProps.map((item) => ({
//     params: {
//       _id: item.id.toString(),
//     },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticPaths() {
//   const request =  await fetch("https://nestjsmongo.herokuapp.com/users");
//   const funcionarioId = await request.json();
//   const paths = funcionarioId.map(item => ({
//     params: {
//       _id: item.id.toString()
//     }
//   }))
//   return {
//     paths,
//     fallback: true
//   };
// }
