import { useContext } from "react";
import AuthContext from "../context/AuthProvider"; // Contexto definido

// Forma de extraer los datos del context globalmente

const useAuth = () => {
    return useContext(AuthContext); // Se especifica el context
};

export default useAuth;