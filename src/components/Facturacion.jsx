import { alertaGeneral } from "../helpers/funciones";
import { useState } from "react";

function Facturacion() {
    const [articleIncoive, setArticleInvoice] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [costumer, setCostumer] = useState("");
    const [cashier, setCashier] = useState("");
    const [dateHourTime, setDateHourTime] = useState(new Date());

    const FormArticle = ({ onAddArticle }) => {
        const [cod, setCod] = useState("");
        const [quantity, setQuantity] = useState(1);
        // funcion para agregar articulo
        const handleAdd = async () => {
            const res = await fetch("api");
            const article = await res.json();
            if (!article) alertaGeneral("Error", "articulo no encontrado", "error");

            onAddArticle({ ...article, quantity: parseInt(quantity, 10) });
            setCod("");
            setQuantity(1);

        };
        return (
            <div className="invoiceForm">
                <input placeholder="Código" value={cod} onChange={e => setCod(e.target.value)} />
                <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
                <button type="button" className="btn" onClick={handleAdd}>Agregar</button>
            </div>
        );
    };
    // consolidar articulos  
    const onAddArticle = (nuevo) => {
        setArticleInvoice(prev => {
            const existing = prev.find(a => a.cod === nuevo.cod);
            if (existing) {
                return prev.map(a =>
                    a.cod === nuevo.cod
                    ? { ...a, quantity: a.quantity + nuevo.quantity }
                    : a
                );
            } else {
                return [...prev, nuevo];
            }
        })
    }

    //funcion para calcular totales 
    const calculateTotals = (article) => {
        let subTotal = 0, iba = 0, icui = 0, ibua = 0, discoint = 0;

        article.forEach(a => {
            const base = a.price * a.quantity;
            subTotal += base;

            if (a.iba) iba += base * 0.19;
            if (a.icui) icui += base * 0.20;
            if (a.ibua) ibua += ((a.ml || 0) / 100) * 55 * a.quantity;

            if (a.descuento) discoint += base * (a.descuento / 100);
        });

        const taxes = iva + icui + ibua;
        const total = subTotal + taxes - discoint

        return { subTotal, iva, icui, ibua, discoint, total };
    };
    //formas de pago y cambio 

    const calculateChange = (paymentMethod, total) => {
        const payment = paymentMethod.reduce((sum, p) => sum + p.monto, 0);
        return payment - total;
    }

    //Generar factura 
    const generateInvoice = () => {
        const totals = calculateTotals(articleIncoive);
        const invoice = {
            costumer,
            store,
            cashier,
            dateHourTime,
            article: articleIncoive,
            payment: paymentMethod,
            ...totals
        }
    }
    return (
    <div className="facturacion">
      <h2>Facturación</h2>
      <FormArticle onAddArticle={onAddArticle} />
      <ul>
        {articleIncoive.map((item, i) => (
          <li key={i}>
            {item.name} - {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>
      <button onClick={generateInvoice}>Generar factura</button>
    </div>
  );

}

export default Facturacion;


