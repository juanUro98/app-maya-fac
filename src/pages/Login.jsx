import { useEffect, useState } from "react";
import "./login.css"
import { useNavigate } from "react-router-dom";
import { alertaGeneral, alertaRedireccion, generarToken } from "../helpers/funciones";
let apiUsers = "https://api-maya-fake-1.onrender.com/users";

function Login() {
    const [getCodUser, setCodUser] = useState("");
    const [users, setUsers] = useState([])
    let redireccion = useNavigate();

    function getUsers() {
        fetch(apiUsers)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.log(error));
    }
    useEffect(() => {
        getUsers();
    }, []);

    function searchUser() {
         let userFound = users.find(
            (item) => getCodUser == item.codigo_usuario
        );
        return userFound;
    }

    function signIn() {
        if (searchUser()) {
            let token = generarToken();
            localStorage.setItem("token", token);
            localStorage.setItem("codigo_usuario", JSON.stringify(searchUser()));
            alertaRedireccion(redireccion, "Bienvenido al sistema", "/home");
        }else{
            alertaGeneral("Error","no esta registrado", "error")
        }
    }
    return (

        <div className="form-container">
            <div className="logo-container">Bienvenido</div>
            <form className="form">
                <div className="form-group">
                    <label for="password">Ingrese su codígo</label>
                    <input
                        onChange={(e) => setCodUser(e.target.value)}
                        placeholder="Codígo de acceso"
                        name="password"
                        id="password"
                        type="password"
                    />
                </div>

                <button onClick={signIn} type="button" className="form-submit-btn">Entrar</button>
            </form>
        </div>

    )
}
export default Login;