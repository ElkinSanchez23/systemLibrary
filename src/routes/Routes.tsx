import { createBrowserRouter } from "react-router";
import { Header } from "../layout/Header";
import { BookPage } from "../Pages/BookPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Header />
    },
    {
        path:'/Gestion-libros',
        element: <BookPage />
    }
])