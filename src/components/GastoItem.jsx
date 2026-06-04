import { eliminarGasto } from '../services/gastos';

function GastoItem({gasto, onGastoEliminado}){
    const handleEliminar = async () => {
        const confirmar = window.confirm('Eliminar "${gasto.descripcion}"?');

        if (!confirmar) return;

        try{
            await eliminarGasto(gasto.id);
            onGastoEliminado(gasto.id);
        } catch (error){
            alert('Error al eliminar el gasto');
        }
    };


    return(
         <div className="gasto-item">
      <div className="gasto-info">
        <span className="gasto-descripcion">{gasto.descripcion}</span>
        <span className="gasto-categoria">{gasto.categoria}</span>
        <span className="gasto-fecha">{gasto.fecha}</span>
      </div>
      <div className="gasto-acciones">
        <span className="gasto-monto">${gasto.monto}</span>
        <button onClick={handleEliminar}>Eliminar</button>
      </div>
    </div>
    );
}

export default GastoItem;