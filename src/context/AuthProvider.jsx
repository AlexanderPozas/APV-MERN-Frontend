import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

import usePacientes from "../hooks/usePacientes";

// Context nos permite definir estados globales
// La forma de compartir estos estados es por medio de un provider

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Estados globales
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);


    // Tambien se puede utilizar funciones o consulta con useEffect

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setCargando(false);
                return;
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const url = '/veterinarios/perfil';
                const { data } = await clienteAxios(url, config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }
            setCargando(false);
        };
        autenticarUsuario();
    }, [auth]);

    // Funcion para cerrar sesion
    const cerrarSesion = () => {
        // Eliminar token del localStorage
        localStorage.removeItem('token');
        setAuth({});
    }

    // Funcion para actualizar datos veterinario
    const editarUsuario = async (datos) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const url = `/veterinarios/perfil/${datos._id}`;
            const { data } = await clienteAxios.put(url, datos, config);
            setAuth(data);
            return {
                msg: 'Perfil Actualizado Correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    // función para actualizar contraseña
    const nuevoPassword = async (datos) => {

        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const url = '/veterinarios/actualizar-password';
            const { data } = await clienteAxios.put(url, datos, config);
            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }


    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                editarUsuario,
                nuevoPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };

export default AuthContext;