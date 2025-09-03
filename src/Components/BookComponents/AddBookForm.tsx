import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./AddBookForm.css";

export interface BookFormData {
  titulo: string;
  autor: string;
  genero: string;
  disponible: boolean;
}

interface AddBookFormProps {
  onAddBook: (book: BookFormData) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onAddBook }) => {
  const [formData, setFormData] = useState<BookFormData>({
    titulo: "",
    autor: "",
    genero: "",
    disponible: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "select-one" ? value === "true" : value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es requerido";
    }
    
    if (!formData.autor.trim()) {
      newErrors.autor = "El autor es requerido";
    }

    if (!formData.genero.trim()) {
      newErrors.genero = "El género es requerido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    console.log("📚 Libro añadido:", formData);
    onAddBook(formData);
    
    // Limpiar formulario
    setFormData({
      titulo: "",
      autor: "",
      genero: "",
      disponible: true,
    });
    setErrors({});
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Añadir nuevo libro</h2>

      <div className="form-group">
        <label htmlFor="titulo">Título</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className={errors.titulo ? "error" : ""}
          required
        />
        {errors.titulo && <span className="error-message">{errors.titulo}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="autor">Autor</label>
        <input
          type="text"
          id="autor"
          name="autor"
          value={formData.autor}
          onChange={handleChange}
          className={errors.autor ? "error" : ""}
          required
        />
        {errors.autor && <span className="error-message">{errors.autor}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="genero">Género</label>
        <input
          type="text"
          id="genero"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          className={errors.genero ? "error" : ""}
          required
        />
        {errors.genero && <span className="error-message">{errors.genero}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="disponible">Estado</label>
        <select
          id="disponible"
          name="disponible"
          value={formData.disponible.toString()}
          onChange={handleChange}
        >
          <option value="true">Disponible</option>
          <option value="false">Prestado</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">
        Añadir libro
      </button>
    </form>
  );
};

export default AddBookForm;