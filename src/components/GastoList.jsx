import GastoItem from "./GastoItem";

function GastoList({gastos, categoriaFiltro, onGastoEliminado}) {
    const gastosFiltrados = categoriaFiltro === "" ? gastos :
        gastos.filter((g) => g.categoria === categoriaFiltro);

    if (gastosFiltrados.length === 0){
        return <p>No hay gastos para mostrar.</p>;
    }

    return(
         <ul>
      {gastosFiltrados.map((gasto) => (
        <GastoItem
          key={gasto.id}
          gasto={gasto}
          onGastoEliminado={onGastoEliminado}
        />
      ))}
    </ul>
  );

}
    export default GastoList;
