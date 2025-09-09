import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'https://systemlibraryback.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchLibros = async () => {
  try {
    const response = await api.get('/libros');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Error al cargar los libros');
    }
    throw new Error('Error desconocido');
  }
};

export const deleteLibro = async (id: number) => {
  try {
    await api.delete(`/libros/${id}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Error al eliminar el libro');
    }
    throw new Error('Error desconocido');
  }
};

export const updateLibro = async (libro: any) => {
  try {
    await api.patch(`/libros/${libro.id}`, libro);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Error al actualizar el libro');
    }
    throw new Error('Error desconocido');
  }
};