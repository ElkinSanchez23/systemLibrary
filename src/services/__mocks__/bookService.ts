import { vi } from "vitest";

export const fetchLibros = vi.fn(async () => [
  { id: 1, titulo: "Cien años de soledad" },
  { id: 2, titulo: "Don Quijote" },
]);
