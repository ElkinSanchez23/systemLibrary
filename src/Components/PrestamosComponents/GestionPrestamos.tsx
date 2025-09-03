import React, { useState, useEffect } from "react";
import { fetchLibros } from "../../services/bookService";
import { crearUsuario, registrarPrestamo, listarPrestamos, devolverPrestamo } from "../../services/prestamoService";

interface Libro {
  id: number;
  titulo: string;
}

interface Usuario {
  id?: number;
  nombre: string;
  email: string;
}

interface Prestamo {
  id: number;
  libro: Libro;
  usuario: Usuario;
  fechaPrestamo: string;
  fechaDevolucion: string;
  devuelto: boolean;
}

const GestionPrestamos: React.FC = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [usuario, setUsuario] = useState<Usuario>({ nombre: "", email: "" });
  const [selectedLibroId, setSelectedLibroId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadLibros = async () => {
      try {
        const librosData = await fetchLibros();
        setLibros(librosData);
      } catch {
        setError("Error al cargar los libros.");
      }
    };

    const loadPrestamos = async () => {
      try {
        const prestamosData = await listarPrestamos();
        setPrestamos(prestamosData);
      } catch {
        setError("Error al cargar los préstamos.");
      }
    };

    loadLibros();
    loadPrestamos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedLibroId || !usuario.nombre || !usuario.email) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const usuarioCreado = await crearUsuario(usuario);
      await registrarPrestamo(selectedLibroId, usuarioCreado.id);
      setSuccess("Préstamo registrado exitosamente");

      setUsuario({ nombre: "", email: "" });
      setSelectedLibroId(null);

      const prestamosData = await listarPrestamos();
      setPrestamos(prestamosData);
    } catch {
      setError("Error al registrar el préstamo. Intenta nuevamente.");
    }
  };

  const handleDevolver = async (prestamoId: number) => {
    try {
      await devolverPrestamo(prestamoId);
      const prestamosData = await listarPrestamos();
      setPrestamos(prestamosData);
    } catch {
      setError("Error al devolver el libro.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO"); // Formato dd/mm/yyyy
  };

  return (
    <div>
      <h2>Registrar Préstamo</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Usuario:</label>
          <input
            type="text"
            value={usuario.nombre}
            onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Email del Usuario:</label>
          <input
            type="email"
            value={usuario.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Libro:</label>
          <select
            value={selectedLibroId || ""}
            onChange={(e) => setSelectedLibroId(Number(e.target.value))}
            required
          >
            <option value="" disabled>
              Selecciona un libro
            </option>
            {libros.map((libro) => (
              <option key={libro.id} value={libro.id}>
                {libro.titulo}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Registrar Préstamo</button>
      </form>

      <h3>Préstamos Activos</h3>
      <ul>
        {prestamos.map((prestamo) => (
          <li key={prestamo.id}>
            <strong>{prestamo.usuario.nombre}</strong> tiene el libro "<em>{prestamo.libro.titulo}</em>"
            <br />
            Fecha de Préstamo: {formatDate(prestamo.fechaPrestamo)} <br />
            Fecha de Devolución: {formatDate(prestamo.fechaDevolucion)} <br />
            Devuelto: {prestamo.devuelto ? "Sí" : "No"} <br />
            {!prestamo.devuelto && (
              <button onClick={() => handleDevolver(prestamo.id)}>Devolver</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionPrestamos;
