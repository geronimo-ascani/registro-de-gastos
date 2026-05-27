import { useState } from "react";
import { agregarGasto } from "../services/gastos";

function GastoForm({ categorias, onGastoAgregado }) {
  const [form, setForm] = useState({
    descripcion: "",
    monto: "",
    categoria: "",
    fecha: "",
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

    const nuevoGasto = {
      ...form,
      monto: Number(form.monto),
    };

    try {
      const respuesta = await agregarGasto(nuevoGasto);
      onGastoAgregado(respuesta.data);
      setForm({ descripcion: "", monto: "", categoria: "", fecha: "" });
    } catch (error) {
      alert("Error al agregar el gasto");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
      />

      <input
        type="number"
        name="monto"
        placeholder="Monto"
        value={form.monto}
        onChange={handleChange}
      />

      <select name="categoria" value={form.categoria} onChange={handleChange}>
        <option value="">-- Seleccioná una categoría --</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.nombre}>
            {cat.nombre}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="fecha"
        value={form.fecha}
        onChange={handleChange}
      />

      <button type="submit">Agregar gasto</button>
    </form>
  );
}

export default GastoForm;