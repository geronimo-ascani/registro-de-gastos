import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const getGastos = () => axios.get(`${BASE_URL}/gastos`);

export const getCategorias = () => axios.get(`${BASE_URL}/categorias`);

export const agregarGasto = (nuevoGasto) =>
  axios.post(`${BASE_URL}/gastos`, nuevoGasto);

export const eliminarGasto = (id) =>
  axios.delete(`${BASE_URL}/gastos/${id}`);