import React, { useState, useEffect } from "react";
import {
  fetchLibros,
  deleteLibro,
  updateLibro,
} from "../../services/bookService";
import EditBookModal from "./EditBookModal";
import "./BookManagementTable.css";

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  disponible: boolean;
}

interface BookManagementTableProps {
  onRefresh?: () => void;
}

const BookManagementTable: React.FC<BookManagementTableProps> = ({
  onRefresh,
}) => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [editingBook, setEditingBook] = useState<Libro | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const loadLibros = async () => {
    try {
      setLoading(true);
      const librosData = await fetchLibros();
      setLibros(librosData);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLibros();
  }, []);

  useEffect(() => {
    if (onRefresh) {
      loadLibros();
    }
  }, [onRefresh]);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este libro?")) {
      try {
        await deleteLibro(id);
        setLibros(libros.filter((libro) => libro.id !== id));
        if (onRefresh) onRefresh();
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const toggleDisponibilidad = async (libro: Libro) => {
    try {
      const libroActualizado = {
        ...libro,
        disponible: !libro.disponible,
      };
      await updateLibro(libroActualizado);
      setLibros(
        libros.map((l) =>
          l.id === libro.id ? { ...l, disponible: !l.disponible } : l
        )
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (libro: Libro) => {
    setEditingBook(libro);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingBook(null);
  };

  const handleBookUpdated = () => {
    loadLibros();
    if (onRefresh) onRefresh();
  };

  const librosFiltrados = libros.filter(
    (libro) =>
      libro.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      libro.autor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      libro.genero?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="main-content">Cargando libros...</div>;
  }

  return (
    <div className="main-content">
      {error && <div className="error-message">Error: {error}</div>}
      <div className="content-header">
        <h1 className="page-title">Gestión de libros</h1>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Buscar por título, autor o género"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="table-wrapper">
<table className="books-table">
  <thead>
    <tr>
      <th>TÍTULO</th>
      <th>AUTOR</th>
      <th>GÉNERO</th>
      <th>ESTADO</th>
      <th>ACCIONES</th>
    </tr>
  </thead>
  <tbody>
    {librosFiltrados.length === 0 ? (
      <tr>
        <td colSpan={5} className="empty-message">
          No se encontraron libros
        </td>
      </tr>
    ) : (
      librosFiltrados.map((libro) => (
        <tr key={libro.id}>
          <td>{libro.titulo}</td>
          <td>{libro.autor}</td>
          <td>{libro.genero}</td>
          <td>
            <button
              className={`status-btn ${
                libro.disponible ? "available" : "unavailable"
              }`}
              onClick={() => toggleDisponibilidad(libro)}
            >
              {libro.disponible ? "Disponible" : "Prestado"}
            </button>
          </td>
          <td>
            <button
              className="action-btn edit"
              onClick={() => handleEdit(libro)}
            >
              Editar
            </button>
            <button
              className="action-btn delete"
              onClick={() => handleDelete(libro.id)}
            >
              Eliminar
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>
      </div>
      <div className="table-footer">
        Total de libros: {libros.length} 
      </div>
      <EditBookModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        book={editingBook}
        onBookUpdated={handleBookUpdated}
      />
    </div>
  );
};

export default BookManagementTable;