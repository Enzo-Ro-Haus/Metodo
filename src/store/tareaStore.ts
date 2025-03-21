import { create } from "zustand";
import { ITarea } from "../types/iTarea";

interface ITareaStore {
  tareas: ITarea[];
  tareaActiva: ITarea | null;
  setTareaActiva: (tareaActiva: ITarea | null) => void;
  setArrayTareas: (arrayDeTareas: ITarea[]) => void;
  agregarNuevaTarea: (nuevaTarea: ITarea) => void;
  editarUnaTarea: (tareaActualizada: ITarea) => void;
  eliminarUnaTareaPorId: (idTarea: string) => void;
}

export const tareaStore = create<ITareaStore>((set) => ({
  tareas: [],
  tareaActiva: null,

  //Funciones para el array

  //Agregar array de tareas
  setArrayTareas: (arrayDeTareas) => set(() => ({ tareas: arrayDeTareas })),

  //Agregar una tarea al array
  agregarNuevaTarea: (nuevaTarea) =>
    set((state) => ({ tareas: [...state.tareas, nuevaTarea] })),

  //Editar una tarea del array
  editarUnaTarea: (tareaActualizada) =>
    set((state) => {
      const arregloTareas = state.tareas.map((tarea) =>
        tarea.id === tareaActualizada.id
          ? { ...tarea, ...tareaActualizada }
          : tarea
      );
      return { tareas: arregloTareas };
    }),

  //Eliminar una tarea del array
  eliminarUnaTareaPorId: (idTarea) =>
    set((state) => {
      const arregloTareas = state.tareas.filter(
        (tarea) => tarea.id === idTarea
      );
      return { tareas: arregloTareas };
    }),

  //Settear la tarea activa
  setTareaActiva: (tareaActivaIn) =>
    set(() => ({ tareaActiva: tareaActivaIn })),
}));
