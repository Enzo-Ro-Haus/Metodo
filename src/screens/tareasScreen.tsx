import { useEffect } from "react";
import { getAllTareas } from "../http/tarea";
import { Header } from "../components/ui/Header/Header";
import { ListTareas } from "../components/ui/ListTareas/ListTareas";

export const TareasScreen = () => {
  const getTareas = async () => {
    const result = await getAllTareas();
    console.log(result);
    return result;
  };

  useEffect(() => {
    getTareas();
  }, []);

  return (
    <div>
      <Header />
      <ListTareas />
    </div>
  );
};
