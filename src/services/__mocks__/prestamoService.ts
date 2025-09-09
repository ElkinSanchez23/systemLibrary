import { vi } from "vitest";

export const crearUsuario = vi.fn(async (usuario) => ({
  id: 1,
  ...usuario,
}));

export const registrarPrestamo = vi.fn(async (libroId, email) => ({
  id: 99,
  libro: { id: libroId, titulo: "Libro Mock" },
  usuario: { id: 1, nombre: "Test User", email },
  fechaPrestamo: "2025-09-01",
  fechaDevolucion: "2025-09-10",
  devuelto: false,
}));

export const listarPrestamos = vi.fn(async () => [
  {
    id: 1,
    libro: { id: 1, titulo: "Cien años de soledad" },
    usuario: { id: 1, nombre: "Juan Pérez", email: "juan@test.com" },
    fechaPrestamo: "2025-09-01",
    fechaDevolucion: "2025-09-10",
    devuelto: false,
  },
]);

export const devolverPrestamo = vi.fn(async (id) => ({
  success: true,
}));
