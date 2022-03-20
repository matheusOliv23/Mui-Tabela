import axios from "axios";
import FuncionariosService from "./FuncionariosService";

export const api = axios.create({
  // baseURL: process.env.API_URL,
  // baseURL: `${process.env.API_URL || "http://localhost:8080"}`,
  baseURL: "https://nestjsmongo.herokuapp.com",
  headers: { "Content-Type": "application/json" },
});

// export const getFuncionariosById = (_id: string ): Promise<{ _id: string ; nome: string; email: string }> => {

//   return new Promise((resolve) => {
//     const service = new FuncionariosService();
//     const funcionarios = service.buscar(_id)
//     const result = funcionarios
//     resolve(result)
//   })
// }

export const getFuncionarioById = (
  _id: string
): Promise<{ _id: string; nome: string; email: string }> => {
  return new Promise((resolve) => {
    const funcionarios = api.patch(`/users/${_id}`);
    const result = funcionarios;
    return result;
  });
};

   

