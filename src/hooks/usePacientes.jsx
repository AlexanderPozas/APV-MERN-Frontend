import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider"; // Contexto definido

// Forma de extraer los datos del context globalmente

const usePacientes = () => {
    return useContext(PacientesContext); // Se especifica el context
};

export default usePacientes;