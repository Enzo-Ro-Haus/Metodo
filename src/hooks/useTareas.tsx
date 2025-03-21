import { useShallow } from "zustand/shallow";
import { tareaStore } from "../store/tareaStore";
import {
  editarTarea,
  eliminarTareaPorID,
  getAllTareas,
  postNuevaTarea,
} from "../http/tarea";
import { ITarea } from "../types/iTarea";
import Swal from "sweetalert2";

export const useTareas = () => {
  const {
    tareas,
    setArrayTareas,
    agregarNuevaTarea,
    eliminarUnaTareaPorId,
    editarUnaTarea,
  } = tareaStore(
    useShallow((state) => ({
      tareas: state.tareas,
      setArrayTareas: state.setArrayTareas,
      agregarNuevaTarea: state.agregarNuevaTarea,
      eliminarUnaTareaPorId: state.eliminarUnaTareaPorId,
      editarUnaTarea: state.editarUnaTarea,
    }))
  );

  const getTareas = async () => {
    const data = await getAllTareas();
    if (data) setArrayTareas(data);
  };

  const crearTarea = async (nuevaTarea: ITarea) => {
    agregarNuevaTarea(nuevaTarea);
    try {
      await postNuevaTarea(nuevaTarea);
      Swal.fire("Éxito", "Tarea creada correctamente", "success");
    } catch (err) {
      if (nuevaTarea.id) eliminarUnaTareaPorId(nuevaTarea.id);
      throw new Error("Error al crear tarea");
    }
  };

  const putTareaEditar = async (tareaEditada: ITarea) => {
    const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id);
    editarUnaTarea(tareaEditada);
    try {
      await editarTarea(tareaEditada);
      Swal.fire("Éxito", "Tarea actualizada correctamente", "success");
    } catch (err) {
      if (estadoPrevio) editarUnaTarea(estadoPrevio);
      console.log("Algo salió mal al editar");
    }
  };

  const eliminarTarea = async (idTarea: string) => {
    const estadoPrevio = tareas.find((el) => el.id === idTarea);
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar.",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;
    eliminarUnaTareaPorId(idTarea);
    try {
      await eliminarTareaPorID(idTarea);
      Swal.fire("Eliminada", "Tarea eliminada correctamente", "success");
    } catch (err) {
      if (estadoPrevio) agregarNuevaTarea(estadoPrevio);
      console.log("Algo salió mal al editar");
    }
  };

  return {
    tareas,
    getTareas,
    crearTarea,
    putTareaEditar,
    eliminarTarea,
  };
};
