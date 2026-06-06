import GastoItem from "./GastoItem";

function GastoList({ gastos, categoriaFiltro, onGastoEliminado }) {
  const gastosFiltrados =
    categoriaFiltro === ""
      ? gastos
      : gastos.filter((g) => g.categoria === categoriaFiltro);

  if (gastosFiltrados.length === 0) {
    return (
      <p className="text-sm text-slate-400 text-center py-8">
        No hay gastos para mostrar.
      </p>
    );
  }

  return (
    <div>
      {gastosFiltrados.map((gasto) => (
        <GastoItem
          key={gasto.id}
          gasto={gasto}
          onGastoEliminado={onGastoEliminado}
        />
      ))}
    </div>
  );
}

export default GastoList;