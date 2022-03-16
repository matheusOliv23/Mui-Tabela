import Head from "next/head";
import React from "react";
import MiniDrawer from "../../src/components/Layout/Menu";
import ListaFuncionarios from "../../src/components/ListaFuncionarios";

export default function Usuarios() {
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
        <ListaFuncionarios />
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
