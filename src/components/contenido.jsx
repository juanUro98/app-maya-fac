import { Outlet } from "react-router-dom"

const Contenido = () => {
    return(
        <section className="contenido">
            <Outlet />
        </section>
    )
}
export default Contenido;