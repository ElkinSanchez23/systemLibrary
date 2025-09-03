import { createBrowserRouter } from "react-router";
import { Header } from "../layout/Header";
import { BookPage } from "../Pages/BookPage";
import GestionPrestamos from "../Components/PrestamosComponents/GestionPrestamos";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Header />
    },
    {
        path:'/Gestion-libros',
        element: <BookPage />
    },
    {
        path:'/Prestamos',
        element:<GestionPrestamos />
    }
])