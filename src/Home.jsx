import "./Home.css";
import InvoiceComponent from "./components/InvoiceConponent";
import Contenido from "./components/contenido";
import Header from "./pages/Header"
import Admin from "./pages/UserAdmin";
let userIn = JSON.parse(localStorage.getItem("codigo_usuario"));

const Home = () => {
    return (
        <div className="aplicacion">
            <div className="header-home">
                <Header />
            </div>
            <div className="exec">
                <div className="facturacion">
                    <Contenido />
                </div>
                <div className="containerFunctions">
                    {userIn.tipo == 'admin' && <Admin />}
                </div>
            </div>

        </div>
    );
};
export default Home;