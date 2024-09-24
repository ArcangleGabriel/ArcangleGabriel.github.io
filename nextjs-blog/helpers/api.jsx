import axios from "axios";

export const url = "http://localhost:5000/api/v1/";

export const api = axios.create({
  baseURL: url,
  timeout: 5000,
});

export const api_llm = axios.create({
  baseURL: url,
  timeout: 20000,
});
