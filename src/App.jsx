import { useState, useEffect } from "react";
import { getGastos, getCategorias } from "./services/gastos";
import GastoForm from "./components/GastoForm";
import GastoList from "./components/GastoList";
import Resumen from "./components/Resumen";

function App() {
  const [gastos, setGastos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [respGastos, respCategorias] = await Promise.all([
          getGastos(),
          getCategorias(),
        ]);
        setGastos(respGastos.data);
        setCategorias(respCategorias.data);
      } catch (err) {
        setError("No se pudo conectar con el servidor.");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const handleGastoAgregado = (nuevoGasto) => {
    setGastos([...gastos, nuevoGasto]);
  };

  const handleGastoEliminado = (id) => {
    setGastos(gastos.filter((g) => g.id !== id));
  };

  if (cargando) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="app">
      <h1>Registro de Gastos</h1>

      <GastoForm
        categorias={categorias}
        onGastoAgregado={handleGastoAgregado}
      />

      <select
        value={categoriaFiltro}
        onChange={(e) => setCategoriaFiltro(e.target.value)}
      >
        <option value="">Todas las categorías</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.nombre}>
            {cat.nombre}
          </option>
        ))}
      </select>

      <Resumen gastos={gastos} categoriaFiltro={categoriaFiltro} />

      <GastoList
        gastos={gastos}
        categoriaFiltro={categoriaFiltro}
        onGastoEliminado={handleGastoEliminado}
      />
    </div>
  );
}

export default App;