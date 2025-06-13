import Login from "../pages/Login";
import Home from "../Home";
import RutaProtegida from "../components/RutaProtegida";
import ArticleList from "../components/ArticlesList";
import InvoiceComponent from "../components/InvoiceConponent";
import path from "path";
import Graficas from "../components/AnalisisPy";


export let enrutador = [
    {
        path: "/home/",
        element: <RutaProtegida componente={<Home />} />,
        children: [
            {
                path: "articulo",
                element: <ArticleList />
            },
            {
                path: "Factura",
                element: <InvoiceComponent />
            },
            {
                path: "graficas",
                element: <Graficas />
            }
        ],
    },
    {
        path: "/",
        element: <Login />,
    },
];