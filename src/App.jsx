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

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-500 text-sm">Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-medium text-blue-600">Registro de Gastos</h1>
        </div>

        {/* Resumen arriba */}
        <Resumen gastos={gastos} categoriaFiltro={categoriaFiltro} />

        {/* Layout principal */}
        <div className="grid grid-cols-[300px_1fr] gap-6 mt-6">

          {/* Formulario */}
          <GastoForm
            categorias={categorias}
            onGastoAgregado={handleGastoAgregado}
          />

          {/* Lista con filtros */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-4">
              Transacciones
            </p>

            {/* Pills de filtro */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setCategoriaFiltro("")}
                className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                  categoriaFiltro === ""
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300"
                }`}
              >
                Todos
              </button>
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaFiltro(cat.nombre)}
                  className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                    categoriaFiltro === cat.nombre
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {cat.nombre.charAt(0).toUpperCase() + cat.nombre.slice(1)}
                </button>
              ))}
            </div>

            <GastoList
              gastos={gastos}
              categoriaFiltro={categoriaFiltro}
              onGastoEliminado={handleGastoEliminado}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;