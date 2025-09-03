import { createBrowserRouter } from "react-router";
import { BookPage } from "../Pages/BookPage";
import { LoanPage } from "../Pages/LoanPage";
import { StatsPage } from "../Pages/StatsPage";


export const router = createBrowserRouter([
    {
        path: '/Panel',
        element: <StatsPage />
    },
    {
        path:'/',
        element: <BookPage />
    },
    {
        path:'/Prestamos',
        element:<LoanPage/>
    }
])