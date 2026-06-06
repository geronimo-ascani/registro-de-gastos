function Resumen({ gastos, categoriaFiltro }) {
  const gastosFiltrados =
    categoriaFiltro === ""
      ? gastos
      : gastos.filter((g) => g.categoria === categoriaFiltro);

  const total = gastosFiltrados.reduce((acum, g) => acum + g.monto, 0);

  const gastoMasAlto =
    gastosFiltrados.length > 0
      ? gastosFiltrados.reduce((max, g) => (g.monto > max.monto ? g : max))
      : null;

  return (
    <div className="grid grid-cols-2 gap-3">

      <div className="bg-white rounded-xl border border-slate-200 p-5 flex justify-between items-center">
        <div>
          <p className="text-xs text-slate-400 mb-1">Total gastado</p>
          <p className="text-3xl font-medium text-slate-800">${total.toLocaleString()}</p>
          {categoriaFiltro && (
            <p className="text-xs text-blue-600 mt-1">{categoriaFiltro}</p>
          )}
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 flex justify-between items-center">
        <div>
          <p className="text-xs text-slate-400 mb-1">Gasto más alto</p>
          {gastoMasAlto ? (
            <>
              <p className="text-3xl font-medium text-slate-800">${gastoMasAlto.monto.toLocaleString()}</p>
              <p className="text-xs text-blue-600 mt-1">
                {gastoMasAlto.descripcion} · {gastoMasAlto.fecha}
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-400">Sin datos</p>
          )}
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>

    </div>
  );
}

export default Resumen;