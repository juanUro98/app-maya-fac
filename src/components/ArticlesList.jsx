import { useEffect, useState } from "react";

const ArticleList = () => {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const api = "https://api-maya-fake-1.onrender.com/articulo";

    const columns = [
        { key: "Cod_Articulo", title: "Código" },
        { key: "Nombre", title: "Nombre" },
        { key: "ValorVentaNeto", title: "Precio" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(api);
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
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
        fetchData();
    }, [api]);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredRecords(records);
        } else {
            const filtered = records.filter((record) =>
                Object.values(record).some(
                    (value) =>
                        typeof value === "string" &&
                        value.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            setFilteredRecords(filtered);
        }
    }, [searchTerm, records]);

    if (loading) return <div className="loading">Cargando...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="records-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input"
                />
                <span className="search-results">
                    {filteredRecords.length} resultados encontrados
                </span>
            </div>

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
    );
};

export default ArticleList;


