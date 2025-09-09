import { useState, useCallback } from 'react';
import axios from 'axios';
import { Header } from '../layout/Header';
import AddBookForm, { type BookFormData } from '../Components/BookComponents/AddBookForm';
import BookManagementTable from '../Components/BookComponents/BookManagementTable';


export const BookPage = () => {
  const [loading, setLoading] = useState(false);
  const [refreshTable, setRefreshTable] = useState(0);

  const handleRefreshTable = useCallback(() => {
    setRefreshTable(prev => prev + 1);
  }, []);

  const handleAddBook = async (newBook: BookFormData) => {
    setLoading(true);
    try {
        
      await axios.post('http://localhost:8080/libros', newBook, {
        headers: {
          'Content-Type': 'application/json',
        },
      });


      alert('Libro agregado exitosamente');

      handleRefreshTable();
      
    } catch (error) {
      console.error('❌ Error al agregar libro:', error);
      if (axios.isAxiosError(error)) {
        alert(`Error: ${error.response?.data?.message || error.message}`);
      } else {
        alert('Error al agregar el libro');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-page-container">
      <Header />
      <div className="book-content">
        <AddBookForm onAddBook={handleAddBook} />
        {loading && <div className="loading">Enviando datos...</div>}
        <main className="table-container">
          <BookManagementTable key={refreshTable} onRefresh={handleRefreshTable} />
        </main>
      </div>
    </div>
  );
};