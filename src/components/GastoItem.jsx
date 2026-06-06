import { eliminarGasto } from "../services/gastos";

function GastoItem({ gasto, onGastoEliminado }) {
  const handleEliminar = async () => {
    const confirmar = window.confirm(`¿Eliminar "${gasto.descripcion}"?`);
    if (!confirmar) return;
    try {
      await eliminarGasto(gasto.id);
      onGastoEliminado(gasto.id);
    } catch (error) {
      alert("Error al eliminar el gasto");
    }
  };

  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-none">
      <div className="bg-blue-50 p-2.5 rounded-full flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 truncate">{gasto.descripcion}</p>
        <p className="text-xs text-slate-400 mt-0.5">
          <span className="text-blue-600 font-medium">{gasto.categoria}</span>
          {" · "}{gasto.fecha}
        </p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-sm font-medium text-slate-800">${gasto.monto.toLocaleString()}</p>
        <button
          onClick={handleEliminar}
          className="text-xs text-slate-300 hover:text-red-400 transition-colors mt-0.5"
        >
          eliminar
        </button>
      </div>
    </div>
  );
}

export default GastoItem;