import { createBrowserRouter } from "react-router";
import { Header } from "../layout/Header";
import { BookPage } from "../Pages/BookPage";
import { LoanPage } from "../Pages/LoanPage";


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
        element:<LoanPage/>
    }
])