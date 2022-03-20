import axios, { AxiosInstance } from "axios";

export default class BaseService {
  protected httpClient: AxiosInstance;
  constructor() {
    this.httpClient = axios.create({
      baseURL: `${process.env.API_URL || "http://localhost:8080"}/`,
    });
  }
}
