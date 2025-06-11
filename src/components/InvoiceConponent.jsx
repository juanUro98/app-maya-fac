import { useEffect, useState } from "react";
import { alertaGeneral } from "../helpers/funciones";


function InvoiceComponent() {
    const [articleIncoive, setArticleInvoice] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [costumer, setCostumer] = useState([]);
    const [idCostumer, setIdCostumer] = useState("")
    const [selectedCostumer, setSelectedCostumer] = useState("")
    const [cod, setCod] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedArticles, setSelectadArticles] = useState([]);
    let userIn = JSON.parse(localStorage.getItem("codigo_usuario"));
    let apiArticle = "http://localhost:3000/articulo";
    let apiCostumer = "http://localhost:3000/cliente";


    //funcion para buscar articulo y agregarlos a la lista

    const articleFound = async () => {
        if (!cod) return;
        try {
            const res = await fetch(`${apiArticle}?Cod_Articulo=${cod}`);
            const data = await res.json();

            if (data.length == 0) {
                alertaGeneral("error", "articulo no encontrado", "error");
                return;
            }
            const article = data[0];
            const exist = selectedArticles.find(a => a.Cod_Articulo === article.Cod_Articulo);

            if (exist) {
                setSelectadArticles(prev =>
                    prev.map(item =>
                        item.Cod_Articulo === article.Cod_Articulo
                            ? { ...item, cantidad: item.cantidad + parseInt(quantity) }
                            : item
                    )
                );
            } else {
                setSelectadArticles(prev => [
                    ...prev,
                    { ...article, cantidad: parseInt(quantity) }
                ]);
            }
            setCod("");
            setQuantity(1);
        } catch (error) {
            console.error("Error al buscar el articulo", error)
        }
    };

    // calcular totales 
    const totalGeneral = selectedArticles.reduce(
        (total, item) => total + item.precio * item.quantity, 0
    );

    // eliminar articulo de la lista
    const removeArticle = (Cod_Articulo) => {
        setSelectadArticles(prev =>
            prev.filter(item => item.Cod_Articulo !== Cod_Articulo)
        );
    };

    //buscar cliente 
    useEffect(() => {
        fetch(apiCostumer)
            .then((res) => res.json())
            .then((data) => setCostumer(data))
    }, []);
    function searchCostumer() {
        if (!idCostumer) {
            alertaGeneral("error", "por favor ingrese un id de un cliente", "error");
            return;
        }

        const costumerFound = costumer.find(
            (item) => item.idCliente == idCostumer
        );

        if (costumerFound) {
            setSelectedCostumer(costumerFound);
            alertaGeneral("success", "Cliente encontrado", "success");
        } else {
            setSelectedCostumer(null);
            alertaGeneral("error", "Cliente no se encuentra registrado", "error")
        }
    }
    //render informacion cliente
    const renderSelectedCostumer = () => {
        if (!selectedCostumer) return null;

        return (
            <div className="customer-info">
                <h4>Cliente seleccionado:</h4>
                <p><strong>Nombre:</strong> {selectedCostumer.Nombre}</p>
                <p><strong>ID:</strong> {selectedCostumer.idCliente}</p>
                <p><strong>Email:</strong> {selectedCostumer.Mail}</p>
            </div>
        );
    };
    //calculo de impuestos

    const totals = selectedArticles.reduce(
        (acc, item) => {
            const subtotal = item.ValorVentaNeto * item.cantidad;
            const iba = subtotal * 0.19;
            const icui = subtotal * 0.20;
            const ibua = item.medida ? (item.medida / 100) * 55 : 0;

            acc.subtotal += subtotal;
            acc.iba += iba;
            acc.icui += icui;
            acc.ibua += ibua;
            return acc;
        },
        { subtotal: 0, iba: 0, icui: 0, ibua: 0 }
    );

    //enviar Factura a la base de datos 
    const postInvoice = async () => {
        if (!selectedCostumer || selectedArticles === 0) {
            alertaGeneral("error", "Debe agregar articulos y seleccionar un cliente", "error");
            return;
        }
        const now = new Date();
        const date = now.toISOString().split("T")[0]; // "YYYY-MM-DD"
        const hourTime = now.toTimeString().split(" ")[0]; // "HH:MM:SS"

        const factura = {
            prefijo: "FK1-",
            Fecha: date,
            Hora: hourTime,
            Impuesto_Ibua: totals.ibua.toFixed(2),
            Impuesto_Icui: totals.icui.toFixed(2),
            impuesto_iba: totals.iba.toFixed(2),
            Valor_Bruto: totals.subtotal.toFixed(2),
            Valor_Neto: totalFinal.toFixed(2),
            Id_Cliente: selectedCostumer.idCliente,
            Cod_Usuario: userIn.identificacion,
            Descuento: 0

        };
        try {
            const response = await fetch("http://localhost:3000/factura", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(factura),
            });
            if (response.ok) {
                const data = await response.json();
                alertaGeneral("success", `Factura #${data.id} registrada con éxito`, "success");
                // limpiar formulario 
                window.location.reload();
            } else {
                throw new Error("Error al registrar la factura");
            }
        } catch (error) {
            console.error(error);
            alertaGeneral("error", "No se pudo registrar la factura", "error");
        }
    };


    const totalFinal = totals.subtotal + totals.iba + totals.icui + totals.ibua;

    return (

        <div className="invoice_container">

            <div className="invoicearticle">
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Descripción</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedArticles.map((item, index) => (
                            <tr key={index}>
                                <td>{item.Cod_Articulo}</td>
                                <td>{item.Nombre}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.ValorVentaNeto}</td>
                                <td>{(item.ValorVentaNeto * item.cantidad).toFixed(2)}</td>
                                <td>
                                    <button className="submit-btn" type="button" onClick={() => removeArticle(item.Cod_Articulo)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/*total*/}
            <div className="totales">
                Total: L.{" "}
                {selectedArticles
                    .reduce((total, item) => total + item.ValorVentaNeto * item.cantidad, 0)
                    .toFixed(2)}
            </div>
            <div className="impuestos">

                <p>IBA: (19%):  {totals.iba.toFixed(2)}</p>
                <p>ICUI: (20%):  {totals.icui.toFixed(2)}</p>
                <p>IBUA:  {totals.ibua.toFixed(2)}</p>
                <hr />
                <p>Total General: {totalFinal.toFixed(2)}</p>
            </div>

            {/*buscador*/}
            <div className="code-container">
                <label htmlFor="">Articulo: </label>
                <input className="input" value={cod} onChange={(e) => setCod(e.target.value)} />
                <label htmlFor="">Cantidad </label>
                <input className="input" type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <button className="submit-btn" type="button" onClick={articleFound}>Agregar</button>
            </div>
            <br />
            <div className="costumer">
                <label>Cliente: </label>
                <input className="input" value={idCostumer} onChange={(e) => setIdCostumer(e.target.value)} placeholder="Id Clinete" />
                <button className="submit-btn" onClick={searchCostumer}>Buscar Cliente </button>
                {renderSelectedCostumer()}
            </div>
            <br />
            <div className="boton-fact">
                <button onClick={postInvoice} className="submit-btn">
                    Registrar Factura
                </button>
            </div>

        </div >
    );
}
export default InvoiceComponent;