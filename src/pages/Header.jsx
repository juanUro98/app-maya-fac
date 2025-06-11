import { useNavigate } from "react-router-dom";
import "./header.css"
import { alertaRedireccion } from "../helpers/funciones";
function Header() {
    let redireccion = useNavigate();
    let userIn = JSON.parse(localStorage.getItem("codigo_usuario"));
    function closedSesion() {
        localStorage.removeItem("token");
        localStorage.removeItem("codigo_usuario");
        alertaRedireccion(redireccion, "Saliendo", "/");
    }
    return (
        <div className="header">
            <div className="info">
                <div className="logo">
                    <button type="button" className="logo"></button>
                </div>
                <div className="ifoUser">
                    <h1>Maya</h1>
                    <h3 id="nombre">Usuario: {userIn.primer_nombre + " " + userIn.apellidos}</h3>
                    <h3>Identificación: {userIn.identificacion}</h3>
                    <h4>{userIn.tipo}</h4>
                </div>
            </div>
            <div className="close">
                <button className="btnimg" onClick={closedSesion} type="button">
                </button>
                Salir
            </div>
        </div>
    )
}
export default Header