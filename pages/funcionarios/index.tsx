import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import MiniDrawer from "../../components/Layout/Menu";
import ListaFuncionarios from "../../components/ListaFuncionarios";
import FuncionariosService from "../../src/services/FuncionariosService";

interface FuncionariosPageProps {
  funcionariosProps: IFuncionarios[];
  funcionarioId?: IFuncionarios;
}

export const getServerSideProps: GetServerSideProps<FuncionariosPageProps> =
  async function ({ params }: any) {
    const service = new FuncionariosService();
    const funcionarios = await service.listar();

    return {
      props: { funcionariosProps: funcionarios },
    };
  };

// export async function getServerSideProps({ params }: any) {
//   const service = new FuncionariosService();
//   const funcionarioId = await service.buscar(params._id);

//   return {
//     props: { funcionarioId },
//   };
// }
export default function Funcionarios({
  funcionariosProps,
}: FuncionariosPageProps) {
  return (
    <div>
      <Head>
        <title>Funcionários</title>
        <meta name="description" content="Digite aqui uma breve descrição" />
        <meta
          property="og:image"
          content="https://og-image.vercel.app/Matheus%20Oliveira.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg"
        />
      </Head>

      <MiniDrawer>
        <ListaFuncionarios funcionariosProps={funcionariosProps} />
      </MiniDrawer>
    </div>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const { data } = await axios.get("https://nestjsmongo.herokuapp.com/users");
//   const funcionarios = data
//   return {
//     props: {
//       funcionarios,
//     },
//   };
// };
