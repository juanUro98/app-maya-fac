function Graficas() {
    const datosVentas = [
  { id: 1001, venta: 119629.875 },
  { id: 1002, venta: 104394.65 },
  { id: 1003, venta: 122114.75 },
  { id: 1005, venta: 94759.2 },
];

// Formato de número a moneda (puedes adaptar el locale o moneda)
const formatoMoneda = (valor) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
  }).format(valor);

function TablaVentas() {
  return (
    <table className="table table-bordered">
      <thead className="table-light">
        <tr>
          <th>id_vendedor (1001)</th>
          <th className="text-end">venta neto</th>
        </tr>
      </thead>
      <tbody>
        {datosVentas.map((fila) => (
          <tr key={fila.id}>
            <td>{fila.id}</td>
            <td className="text-end">{formatoMoneda(fila.venta)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  
}
const datosPagos = [
  { metodo: "Efectivo", monto: 3291374 },
  { metodo: "Mastercard", monto: 1484281 + 1637442 }, // sumados
  { metodo: "Rappi", monto: 1652450 },
  { metodo: "Transferencia", monto: 1505375 },
  { metodo: "Visa", monto: 1639645 },
];

// Formatear a moneda
const formatoMonedan = (valor) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
  }).format(valor);

function TablaPagos() {
  return (
    <table className="table table-striped table-bordered">
      <thead className="table-light">
        <tr>
          <th>Método de Pago</th>
          <th className="text-end">Venta Neto</th>
        </tr>
      </thead>
      <tbody>
        {datosPagos.map((pago, index) => (
          <tr key={index}>
            <td>{pago.metodo}</td>
            <td className="text-end">{formatoMoneda(pago.monto)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
    return (
        <div className="container_graficas">
            <div className="grafica1">
                <div className="tabla">
                    <h2>Facturas por medio de pago</h2>
                    <table className="table table-bordered">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Método de Pago</th>
                                <th className="border border-gray-300 px-4 py-2 text-right">Número de Facturas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Efectivo</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">28</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Mastercard</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">29</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Rappi</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">15</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Transferencia</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">14</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Visa</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">14</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="grafica">
                    <img src="../facturas_mediosdepago.png" alt="" />
                </div>
            </div>
            <div className="grafica2">
                
                <div className="tabla">
                    <h2>Cantidad de clientes por dia</h2>
                </div>
                <div className="grafica">
                    <img src="../cantidadClientes por dia.png" alt="" />
                </div>
            </div>
            <div className="grafica2">
                
                <div className="tabla">
                    <h2>promedio ventas por vendedor</h2>
                    <TablaVentas />
                </div>
                <div className="grafica">
                    <img src="../datos_promedio_neto_usuario.png" alt="" />
                </div>
            </div>
            <div className="grafica2">
                
                <div className="tabla">
                    <h2>Promedio ventas brutas por dia</h2>
                    
                </div>
                <div className="grafica">
                    <img src="../ventas_diarias.png" alt="" />
                </div>
            </div>
            <div className="grafica2">
                
                <div className="tabla">
                    <h2>Total venta neta mes mayo</h2>
                    <TablaPagos />
                </div>
                <div className="grafica">
                    <img src="../ventas_totales_forma_pago.png" alt="" />
                </div>
            </div>
        </div>

    )
}
export default Graficas;