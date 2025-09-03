import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { updateLibro } from "../../services/bookService";
import "./EditBookModal.css";

export interface BookFormData {
  titulo: string;
  autor: string;
  genero: string;
  disponible: boolean;
}

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: BookFormData & { id: number } | null;
  onBookUpdated: () => void;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ 
  isOpen, 
  onClose, 
  book, 
  onBookUpdated 
}) => {
  const [formData, setFormData] = useState<BookFormData>({
    titulo: "",
    autor: "",
    genero: "",
    disponible: true,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (book) {
      setFormData(book);
      setSubmitError(null);
    }
  }, [book, isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "select-one" ? value === "true" : value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.titulo.trim()) newErrors.titulo = "El título es requerido";
    if (!formData.autor.trim()) newErrors.autor = "El autor es requerido";
    if (!formData.genero.trim()) newErrors.genero = "El género es requerido";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !book) return;

    setLoading(true);
    setSubmitError(null);
    
    try {
      await updateLibro({ ...formData, id: book.id });
      onBookUpdated();
      onClose();
    } catch (error) {
      console.error('Error al actualizar libro:', error);
      setSubmitError(error instanceof Error ? error.message : 'Error al actualizar el libro');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !book) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Editar Libro</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {submitError && (
          <div className="error-message submit-error">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-titulo">Título</label>
            <input
              type="text"
              id="edit-titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className={errors.titulo ? "error" : ""}
              required
            />
            {errors.titulo && <span className="error-message">{errors.titulo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="edit-autor">Autor</label>
            <input
              type="text"
              id="edit-autor"
              name="autor"
              value={formData.autor}
              onChange={handleChange}
              className={errors.autor ? "error" : ""}
              required
            />
            {errors.autor && <span className="error-message">{errors.autor}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="edit-genero">Género</label>
            <input
              type="text"
              id="edit-genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className={errors.genero ? "error" : ""}
              required
            />
            {errors.genero && <span className="error-message">{errors.genero}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="edit-disponible">Estado</label>
            <select
              id="edit-disponible"
              name="disponible"
              value={formData.disponible.toString()}
              onChange={handleChange}
            >
              <option value="true">Disponible</option>
              <option value="false">Prestado</option>
            </select>
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;