import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GestionPrestamos from "../PrestamosComponents/GestionPrestamos";


vi.mock("../../services/bookService", () => ({
  fetchLibros: vi.fn(async () => [
    { id: 1, titulo: "Cien años de soledad" },
    { id: 2, titulo: "Don Quijote" },
  ]),
}));

vi.mock("../../services/prestamoService", () => ({
  listarPrestamos: vi.fn(async () => []),
  crearUsuario: vi.fn(async (usuario) => ({ ...usuario, id: 1 })),
  registrarPrestamo: vi.fn(async () => {}),
  devolverPrestamo: vi.fn(async () => {}),
}));

describe("GestionPrestamos", () => {
  it("carga libros y los muestra en el select", async () => {
    render(<GestionPrestamos />);
    expect(await screen.findByText("Cien años de soledad")).toBeInTheDocument();
    expect(await screen.findByText("Don Quijote")).toBeInTheDocument();
  });

  it('muestra "No hay préstamos registrados" cuando la lista está vacía', async () => {
    render(<GestionPrestamos />);
    expect(
      await screen.findByText("No hay préstamos registrados")
    ).toBeInTheDocument();
  });
});
