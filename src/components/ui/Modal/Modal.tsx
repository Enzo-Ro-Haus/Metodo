import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { tareaStore } from "../../../store/tareaStore";
import style from "./Modal.module.css";
import { ITarea } from "../../../types/iTarea";
import { useTareas } from "../../../hooks/useTareas";

type IModal = {
  handleCloseModal: () => void;
};

const initialState: ITarea = {
  titulo: "",
  descripcion: "",
  fechaLimite: "",
};

export const Modal: FC<IModal> = ({ handleCloseModal }) => {
  const tareaActiva = tareaStore((state) => state.tareaActiva);
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  const [formValues, setFormValues] = useState<ITarea>(initialState);
  const { crearTarea, putTareaEditar } = useTareas();

  useEffect(() => {
    if (tareaActiva) setFormValues(tareaActiva);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (tareaActiva) {
      putTareaEditar(formValues);
    } else {
      crearTarea({ ...formValues, id: new Date().toDateString() });
    }

    setTareaActiva(null);
    handleCloseModal();
  };

  return (
    <div className={style.containerPrincipalModal}>
      <div className={style.contentPopUp}>
        <div>
          <h3>{tareaActiva ? "Editar tarea" : "Crear tarea"}</h3>
        </div>
        <form onSubmit={handleSubmit} className={style.formContent}>
          <input
            placeholder="Ingrese un titulo"
            type="text"
            value={formValues.titulo}
            required
            onChange={handleChange}
            autoComplete="off"
            name="titulo"
          ></input>
          <textarea
            placeholder="Ingrese una descripcion"
            value={formValues.descripcion}
            required
            onChange={handleChange}
            name="descripcion"
          />
          <input
            type="date"
            value={formValues.fechaLimite}
            onChange={handleChange}
            required
            autoComplete="off"
            name="fechaLimite"
          ></input>
          <div className={style.buttonCard}>
            <button onClick={handleCloseModal}>Cancelar</button>
            <button type="submit">
              {tareaActiva ? "Editar tarea" : "Crear tarea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
