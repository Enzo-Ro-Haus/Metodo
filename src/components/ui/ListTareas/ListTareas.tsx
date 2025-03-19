import { useEffect } from "react";
import { tareaStore } from "../../../store/tareaStore";
import styles from "./ListTareas.module.css"; 
import { getAllTareas } from "../../../http/tarea";

export const ListTareas = () => {
   
    const tareas = tareaStore((state)=> state.tareas);
    const setArrayTareas = tareaStore((state)=> state.setArrayTareas);

    const getTareas = async()=>{
        const data = await getAllTareas();
        if (data) setArrayTareas(data);
    }
    
    useEffect(()=>{
        getTareas();
    }, [])

    return (
        <div className={styles.containerPrincipalListTareas}>
            <div className={styles.containerTitleAndButton}>
                <h2>Lista de tareas</h2>
                <button>Agregar tarea</button>
            </div>
            <div className={styles.containerList}>
                {tareas.length > 0 ?
                    (tareas.map((el) => (<p>{el.titulo}</p>)))
                    : (
                        <div>
                            <h3>No hay tareas</h3>
                        </div>
                    )

                }
            </div>
        </div>
    )
}