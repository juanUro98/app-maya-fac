import "./User.css"
import { Link } from "react-router-dom";
function Admin() {
    return (
        <div className="admin-container">
            <div class="card">
                <div class="first-content">
                    <span>
                        <img src="/cuenta.png" alt="" />
                        Gestión Facturas
                    </span>
                </div>
                <div class="second-content">
                    <span>
                        <Link className="app_Record_Gestion" to="Factura">
                            Facturacion 
                        </Link>
                    </span>
                </div>
            </div>
            <div class="card">
                <div class="first-content">
                    <span>
                        <img src="/vendedor.png" alt="" />
                        Gestión usuarios
                    </span>
                </div>
                <div class="second-content">
                    <span>
                        <button type="button">Ingresar</button>
                    </span>
                </div>
            </div>
            <div class="card">
                <div class="first-content">
                    <span>
                        <img src="/bolsa-de-la-compra.png" alt="" />
                        Gestión Articulos
                    </span>
                </div>
                <div class="second-content">
                    <span>
                        <nav className="Gestio_record">
                            <Link className="app_Record_Gestion" to="articulo">
                                Articulos
                            </Link>
                        </nav>
                    </span>
                </div>
            </div>
            <div class="card">
                <div class="first-content">
                    <span>
                        <img src="/bandeja-de-salida.png" alt="" />
                        Gestión salidas
                    </span>
                </div>
                <div class="second-content">
                    <span>
                        <button type="button">Ingresar</button>
                    </span>
                </div>
            </div>
            <div class="card">
                <div class="first-content">
                    <span>
                        <img src="/inventario.png" alt="" />
                        Analisis
                    </span>
                </div>
                <div class="second-content">
                    <span>
                        <Link className="app_Record_Gestion" to="graficas">
                                Articulos
                        </Link>
                    </span>
                </div>
            </div>
            <div class="card">
                <div class="first-content">
                    <span>
                        <img src="/agregar-usuario.png" alt="" />
                        Gestión Clientes
                    </span>
                </div>
                <div class="second-content">
                    <span>
                        <button type="button">Ingresar</button>
                    </span>
                </div>
            </div>
            <div class="card">
                <div class="first-content">
                    <span>
                        <img src="/compras.png" alt="" />
                        Gestión Departamentos
                    </span>
                </div>
                <div class="second-content">
                    <span>
                        <button type="button">Ingresar</button>
                    </span>

                </div>
            </div>
            <div class="card">
                <div class="first-content">
                    <span>
                        <img src="/proveedor.png" alt="" />
                        Gestión Proveedores
                    </span>
                </div>
                <div class="second-content">
                    <span>
                        <button type="button">Ingresar</button>
                    </span>
                </div>
            </div>

        </div>

    );
}
export default Admin;