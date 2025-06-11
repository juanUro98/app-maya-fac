import { useEffect, useState } from "react"

const ArticleList = () => {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let api = "http://localhost:3000/articulo"

     // Definir las columnas para la tabla
    const columns = [
        { key: 'Cod_Articulo', title: 'Código' },
        { key: 'Nombre', title: 'Nombre' },
        { key: 'ValorVentaNeto', title: 'Precio' },
        // Agrega más columnas según tu estructura de datos
    ];
    
    //obtener datos de la api

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(api);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                setRecords(data);
                setFilteredRecords(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData(() => {
        }, [api]);

        //Filtarra registros por busqueda

        useEffect(() => {
            if (searchTerm.trim() == '') {
                setFilteredRecords(records);
            } else {
                const filtered = records.filter(record =>
                    Object.values(record).some(
                        value =>
                            typeof value === 'string' && value.toLocaleLowerCase().includes(searchTerm.toLowerCase())
                    )
                );
                setFilteredRecords(filtered)
            }
        }, [searchTerm, records]);

        //manejador de errores de carga
        if (loading) return <div className="loading">Cargando...</div>;
        if (error) return <div className="error">Error: {error}</div>;

    })

    return (
        <div className="records-container">
            {/* Barra de búsqueda */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <span className="search-results">
                    {filteredRecords.length} resultados encontrados
                </span>
            </div>

            {/* Tabla de registros */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.key}>{column.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecords.length > 0 ? (
                            filteredRecords.map((record) => (
                                <tr key={record.id || record._id}>
                                    {columns.map((column) => (
                                        <td key={`${record.id}-${column.key}`}>
                                            {column.render
                                                ? column.render(record[column.key], record)
                                                : record[column.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="no-results">
                                    No se encontraron registros
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ArticleList;