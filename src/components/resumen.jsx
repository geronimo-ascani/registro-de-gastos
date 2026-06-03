function Resumen ({gastos, categoriaFiltro}){
    const gastosFiltrados =
    categoriaFiltro === ""
      ? gastos
      : gastos.filter((g) => g.categoria === categoriaFiltro);

    const totalGastos = gastosFiltrados.reduce((acc, gasto) => acc + gasto.cantidad, 0);

    const gastoMasAlto =
         gastosFiltrados.length > 0
         ? gastosFiltrados.reduce((max, g) => (g.monto > max.monto ? g : max))
         : null;

    return(
         <div className="resumen">
      <h2>Resumen</h2>

      {categoriaFiltro && (
        <p>Categoría seleccionada: <strong>{categoriaFiltro}</strong></p>
      )}

      <p>
        Total gastado: <strong>${total}</strong>
      </p>

      {gastoMasAlto ? (
        <p>
          Gasto más alto:{" "}
          <strong>
            {gastoMasAlto.descripcion} (${gastoMasAlto.monto})
          </strong>
        </p>
      ) : (
        <p>No hay gastos registrados.</p>
      )}
    </div>
  );
    
}

export default Resumen;