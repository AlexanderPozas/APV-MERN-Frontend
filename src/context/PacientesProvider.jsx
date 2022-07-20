import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {
    const { auth } = useAuth();
    const [pacientes, setPacientes] = useState([]);

    // state edicion paciente
    const [paciente, setPaciente] = useState({});

    // Obtener pacientes
    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const url = '/pacientes';
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios(url, config);
                setPacientes(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerPacientes();
    }, [auth]);

    // Registrar un paciente o ediatar
    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            // Editar Registro
            try {
                const url = `/pacientes/${paciente.id}`
                const { data } = await clienteAxios.put(url, paciente, config);
                // Actualizar state de pacientes
                const pacientesActualizados = pacientes.map(pacienteState => (pacienteState._id === data._id ? data : pacienteState));
                setPacientes(pacientesActualizados);
            } catch (error) {
                console.log(error);
            }

        } else {
            // Nuevo registro
            try {
                const url = '/pacientes';
                const { data } = await clienteAxios.post(url, paciente, config);
                const { createdAt, updatedAt, __v, ...pacientesFiltro } = data; // Filtra las primeras props del objeto
                setPacientes([pacientesFiltro, ...pacientes]);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    };

    // Editar un paciente 
    const setEdicion = paciente => {
        setPaciente(paciente);
    };

    // Eliminar un paciente
    const eliminarPaciente = async (paciente) => {
        const confirmarEliminar = confirm('¿Deseas Eliminar el Paciente?');
        if (confirmarEliminar) {
            try {

                const token = localStorage.getItem('token');
                if (!token) return;

                const url = `/pacientes/${paciente._id}`
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };
                await clienteAxios.delete(url, config);

                // Actualizar state
                const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id !== paciente._id);
                setPacientes(pacientesActualizados);
            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente,
            }}
        >
            {children}
        </PacientesContext.Provider>
    );
};

export { PacientesProvider }

export default PacientesContext;