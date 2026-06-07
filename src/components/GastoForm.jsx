import { useState } from "react";
import { agregarGasto } from "../services/gastos";

function GastoForm({ categorias, onGastoAgregado }) {
  const [form, setForm] = useState({
    categoria: "",
    monto: "",
    fecha: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.descripcion || !form.monto || !form.categoria || !form.fecha) {
      alert("Completá todos los campos");
      return;
    }
    const nuevoGasto = { ...form, monto: Number(form.monto) };
    try {
      const respuesta = await agregarGasto(nuevoGasto);
      onGastoAgregado(respuesta.data);
      setForm({ categoria: "", monto: "", fecha: "", descripcion: "" });
    } catch (error) {
      alert("Error al agregar el gasto");
    }
  };

  const inputClass = "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-colors";

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 h-fit">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-4">
        Nuevo gasto
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Categoría</label>
          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">-- Seleccioná --</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.nombre}>
                {cat.nombre.charAt(0).toUpperCase() + cat.nombre.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-400 mb-1 block">Monto</label>
          <input
            type="number"
            name="monto"
            placeholder="0.00"
            value={form.monto}
            onChange={handleChange}
            className={inputClass}
          />
        </div>


        <div>
          <label className="text-xs text-slate-400 mb-1 block">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-xs text-slate-400 mb-1 block">Descripción</label>
          <input
            type="text"
            name="descripcion"
            placeholder="Ej: Almuerzo"
            value={form.descripcion}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Agregar gasto
        </button>
      </form>
    </div>
  );
}

export default GastoForm;


