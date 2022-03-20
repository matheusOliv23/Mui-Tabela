import BaseService from "./BaseService";

export default class FuncionariosService extends BaseService {
  endpoint: string = "users";

  constructor() {
    super();
  }

  async listar(
    nome?: string,
    email?: string,
    _id?: string
  ): Promise<Array<IFuncionarios>> {
    const response = await this.httpClient.get<Array<IFuncionarios>>(
      this.endpoint,
      {
        params: { _id: _id, nome: nome, email: email },
      }
    );

    return response.data;
  }

  async buscar(_id: string): Promise<IFuncionarios> {
    const response = await this.httpClient.get<IFuncionarios>(
      `${this.endpoint}/${_id}`
    );
    return response.data;
  }

  async inserir(funcionario: IFuncionarios): Promise<IFuncionarios> {
    const response = await this.httpClient.post(this.endpoint, funcionario);
    return response.data;
  }

  async atualizar(funcionario: IFuncionarios) {
    await this.httpClient.put(
      `${this.endpoint}/${funcionario._id}`,
      funcionario
    );
  }

  // async excluir(_id: string) {
  //   await this.httpClient.delete(`${this.endpoint}/${_id}`);
  // }
}
