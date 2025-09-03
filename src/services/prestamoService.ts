import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

export const crearUsuario = async (usuario: { nombre: string; email: string }) => {
  const response = await api.post("/usuarios", usuario);
  return response.data;
};

export const registrarPrestamo = async (libroId: number, usuarioEmail: string) => {
  const response = await api.post(`/prestamos/prestar/${libroId}/${usuarioEmail}`);
  return response.data;
};

export const listarPrestamos = async () => {
  const response = await api.get("/prestamos");
  return response.data;
};

export const devolverPrestamo = async (prestamoId: number) => {
  const response = await api.post(`/prestamos/devolver/${prestamoId}`);
  return response.data;
};
